import type { Context } from "hono";
import { unauthorized, validationError } from "../../shared/errors";
import { fromResult, jsonList, valid } from "../../shared/http";
import type { AppEnv } from "../../types/hono";
import type { CheckoutInput, ListOrdersQuery, UpdateOrderStatusInput } from "./orders.schemas";
import type { OrdersService } from "./orders.service";

export const createOrdersHandlers = (ordersService: OrdersService) => {
  const checkout = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const body = valid<CheckoutInput>(c, "json");
    const idempotencyKey = c.req.header("idempotency-key") ?? "";
    if (!idempotencyKey) {
      return fromResult(c, {
        ok: false as const,
        error: validationError("Idempotency-Key header is required"),
      });
    }
    const result = await ordersService.checkout(user.id, body, idempotencyKey);
    return fromResult(c, result, 201);
  };

  const listOrders = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const query = valid<ListOrdersQuery>(c, "query");
    const result = await ordersService.listMyOrders(user.id, query);
    if (!result.ok) return fromResult(c, result);
    return jsonList(c, result.value.items, result.value.meta);
  };

  const getOrder = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const { id } = valid<{ id: string }>(c, "param");
    const result = await ordersService.getOrder(user.id, id, user.role === "admin");
    return fromResult(c, result);
  };

  const cancelOrder = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const { id } = valid<{ id: string }>(c, "param");
    const result = await ordersService.cancelOrder(user.id, id, user.role === "admin");
    return fromResult(c, result);
  };

  const updateStatus = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const { id } = valid<{ id: string }>(c, "param");
    const body = valid<UpdateOrderStatusInput>(c, "json");
    const result = await ordersService.updateStatus(id, body.status);
    return fromResult(c, result);
  };

  return { checkout, listOrders, getOrder, cancelOrder, updateStatus };
};

export type OrdersHandlers = ReturnType<typeof createOrdersHandlers>;
