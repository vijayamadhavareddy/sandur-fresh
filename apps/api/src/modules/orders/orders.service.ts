import type { Db } from "@sf/db";
import {
  conflict,
  type DomainError,
  forbidden,
  notFound,
  outOfStock,
  validationError,
} from "../../shared/errors";
import { summarizeCart } from "../../shared/pricing";
import { err, ok, type Result } from "../../shared/result";
import type { CartRepo } from "../cart/cart.repo";
import type { NotificationsService } from "../notifications/notifications.service";
import type { ProductsRepo } from "../products/products.repo";
import type { UsersRepo } from "../users/users.repo";
import { canTransition, type OrderStatus } from "./order-status";
import type { OrderRow, OrdersRepo } from "./orders.repo";
import type { CheckoutInput, ListOrdersQuery } from "./orders.schemas";

export type OrdersServiceDeps = {
  db: Db;
  ordersRepo: OrdersRepo;
  cartRepo: CartRepo;
  productsRepo: ProductsRepo;
  usersRepo: UsersRepo;
  notifications: NotificationsService;
};

export type OrderView = OrderRow & {
  items: Array<{
    id: string;
    productId: string;
    name: string;
    unit: string;
    unitPrice: number;
    mrp: number;
    quantity: number;
  }>;
};

const toOrderView = async (deps: OrdersServiceDeps, order: OrderRow): Promise<OrderView> => {
  const items = await deps.ordersRepo.listOrderItems(deps.db, order.id);
  return {
    ...order,
    items: items.map((i) => ({
      id: i.id,
      productId: i.productId,
      name: i.name,
      unit: i.unit,
      unitPrice: i.unitPrice,
      mrp: i.mrp,
      quantity: i.quantity,
    })),
  };
};

export const createOrdersService = (deps: OrdersServiceDeps) => {
  const checkout = async (
    userId: string,
    input: CheckoutInput,
    idempotencyKey: string,
  ): Promise<Result<OrderView, DomainError>> => {
    console.log("createOrdersService - checkout");
    if (!idempotencyKey || idempotencyKey.trim().length === 0) {
      return err(validationError("Idempotency-Key header is required"));
    }

    const existing = await deps.ordersRepo.findOrderByIdempotencyKey(deps.db, idempotencyKey);
    if (existing) {
      if (existing.userId !== userId) {
        return err(conflict("Idempotency key already used"));
      }
      return ok(await toOrderView(deps, existing));
    }

    const address = await deps.usersRepo.findAddressForUser(deps.db, input.addressId, userId);
    if (!address) return err(notFound("Address not found"));

    try {
      const order = await deps.db.transaction(async (tx) => {
        const cart = await deps.cartRepo.findCartByUser(tx, userId);
        if (!cart) throw Object.assign(new Error("EMPTY_CART"), { code: "EMPTY_CART" });

        const cartRows = await deps.cartRepo.listCartItemsWithProducts(tx, cart.id);
        if (cartRows.length === 0) {
          throw Object.assign(new Error("EMPTY_CART"), { code: "EMPTY_CART" });
        }

        const lines = cartRows.map((r) => ({
          productId: r.product.id,
          name: r.product.name,
          unit: r.product.unit,
          unitPrice: r.product.price,
          mrp: r.product.mrp,
          quantity: r.item.quantity,
          trackInventory: r.product.trackInventory,
        }));

        for (const line of lines) {
          if (line.trackInventory) {
            const updated = await deps.productsRepo.decrementStock(
              tx,
              cart.storeId,
              line.productId,
              line.quantity,
            );
            if (!updated) {
              throw Object.assign(new Error("OUT_OF_STOCK"), {
                code: "OUT_OF_STOCK",
                productId: line.productId,
              });
            }
          }
        }

        const summary = summarizeCart(
          lines.map((l) => ({ price: l.unitPrice, mrp: l.mrp, quantity: l.quantity })),
        );

        const created = await deps.ordersRepo.createOrder(tx, {
          userId,
          storeId: cart.storeId,
          addressId: input.addressId,
          status: "PLACED",
          subtotal: summary.subtotal,
          deliveryFee: summary.deliveryFee,
          discount: summary.discount,
          total: summary.total,
          paymentMethod: input.paymentMethod,
          idempotencyKey,
        });

        await deps.ordersRepo.createOrderStatusHistory(tx, {
          orderId: created.id,
          fromStatus: null,
          toStatus: "PLACED",
          changedBy: userId,
        });

        await deps.ordersRepo.createOrderItems(
          tx,
          lines.map((l) => ({
            orderId: created.id,
            productId: l.productId,
            name: l.name,
            unit: l.unit,
            unitPrice: l.unitPrice,
            mrp: l.mrp,
            quantity: l.quantity,
          })),
        );

        await deps.cartRepo.clearCartItems(tx, cart.id);
        return created;
      });

      // Fire-and-forget: the order is already committed, so a push failure must
      // not change what checkout returns. notifyOrderPlaced never throws, but
      // the catch guards against a rejected promise going unhandled.
      void deps.notifications
        .notifyOrderPlaced({ id: order.id, total: order.total })
        .catch((cause) => console.error("[push] order notification failed:", cause));

      return ok(await toOrderView(deps, order));
    } catch (e) {
      const code =
        e && typeof e === "object" && "code" in e
          ? String((e as { code: string }).code)
          : undefined;
      if (code === "EMPTY_CART") {
        return err(validationError("Cart is empty"));
      }
      if (code === "OUT_OF_STOCK") {
        return err(
          outOfStock("One or more items are out of stock", {
            productId:
              e && typeof e === "object" && "productId" in e
                ? (e as { productId: string }).productId
                : undefined,
          }),
        );
      }
      // Unique violation on idempotency key (race)
      if (
        e &&
        typeof e === "object" &&
        "message" in e &&
        String((e as { message: unknown }).message).includes("idempotency")
      ) {
        const again = await deps.ordersRepo.findOrderByIdempotencyKey(deps.db, idempotencyKey);
        if (again) return ok(await toOrderView(deps, again));
      }
      throw e;
    }
  };

  const listMyOrders = async (userId: string, query: ListOrdersQuery) => {
    const result = await deps.ordersRepo.listOrdersByUser(deps.db, userId, query.page, query.limit);
    const views = await Promise.all(result.items.map((o) => toOrderView(deps, o)));
    return ok({
      items: views,
      meta: { page: query.page, limit: query.limit, total: result.total },
    });
  };

  const getOrder = async (
    userId: string,
    orderId: string,
    isAdmin: boolean,
  ): Promise<Result<OrderView, DomainError>> => {
    const order = await deps.ordersRepo.findOrderById(deps.db, orderId);
    if (!order) return err(notFound("Order not found"));
    if (!isAdmin && order.userId !== userId) return err(forbidden("Not your order"));
    return ok(await toOrderView(deps, order));
  };

  const cancelOrder = async (
    userId: string,
    orderId: string,
    isAdmin: boolean,
    reason?: string | null,
  ): Promise<Result<OrderView, DomainError>> => {
    const order = await deps.ordersRepo.findOrderById(deps.db, orderId);
    if (!order) return err(notFound("Order not found"));
    if (!isAdmin && order.userId !== userId) return err(forbidden("Not your order"));

    if (!canTransition(order.status, "CANCELLED")) {
      return err(conflict(`Cannot cancel order in status ${order.status}`));
    }

    const updated = await deps.db.transaction(async (tx) => {
      const result = await deps.ordersRepo.updateOrderStatus(
        tx,
        order.id,
        order.status,
        "CANCELLED",
      );
      if (!result) return null;
      const items = await deps.ordersRepo.listOrderItems(tx, order.id);
      for (const item of items) {
        await deps.productsRepo.incrementStock(tx, order.storeId, item.productId, item.quantity);
      }
      await deps.ordersRepo.createOrderStatusHistory(tx, {
        orderId: order.id,
        fromStatus: order.status,
        toStatus: "CANCELLED",
        changedBy: userId,
        reason,
      });
      return result;
    });

    if (!updated) return err(conflict("Order status changed; refresh and try again"));

    void deps.notifications
      .notifyOrderStatusChanged({ id: order.id, userId: order.userId, status: "CANCELLED" })
      .catch((cause) => console.error("[push] status notification failed:", cause));

    return ok(await toOrderView(deps, updated));
  };

  const updateStatus = async (
    orderId: string,
    status: OrderStatus,
    changedBy?: string | null,
    reason?: string | null,
  ): Promise<Result<OrderView, DomainError>> => {
    const order = await deps.ordersRepo.findOrderById(deps.db, orderId);
    if (!order) return err(notFound("Order not found"));

    if (!canTransition(order.status, status)) {
      return err(
        conflict(`Invalid transition from ${order.status} to ${status}`, {
          from: order.status,
          to: status,
        }),
      );
    }

    if (status === "CANCELLED") {
      return cancelOrder(changedBy ?? order.userId, orderId, true, reason);
    }

    const updated = await deps.db.transaction(async (tx) => {
      const result = await deps.ordersRepo.updateOrderStatus(tx, orderId, order.status, status);
      if (result) {
        await deps.ordersRepo.createOrderStatusHistory(tx, {
          orderId,
          fromStatus: order.status,
          toStatus: status,
          changedBy,
          reason,
        });
      }
      return result;
    });
    if (!updated) return err(conflict("Order status changed; refresh and try again"));

    // Tell the customer their order moved along. Fire-and-forget, as with checkout.
    void deps.notifications
      .notifyOrderStatusChanged({ id: order.id, userId: order.userId, status })
      .catch((cause) => console.error("[push] status notification failed:", cause));

    return ok(await toOrderView(deps, updated));
  };

  return {
    checkout,
    listMyOrders,
    getOrder,
    cancelOrder,
    updateStatus,
  };
};

export type OrdersService = ReturnType<typeof createOrdersService>;
