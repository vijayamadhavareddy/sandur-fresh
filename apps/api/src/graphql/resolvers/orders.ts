import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import {
  checkoutBodySchema,
  listOrdersQuerySchema,
  updateOrderStatusBodySchema,
} from "../../modules/orders/orders.schemas";
import type { GraphQLContext } from "../context";
import { fromServiceResult, parseInput, requireUser } from "../helpers";

const OrderItemType = new GraphQLObjectType({
  name: "AppOrderItem",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    productId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    unit: { type: new GraphQLNonNull(GraphQLString) },
    unitPrice: { type: new GraphQLNonNull(GraphQLInt) },
    mrp: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const OrderType = new GraphQLObjectType({
  name: "AppOrder",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    storeId: { type: new GraphQLNonNull(GraphQLString) },
    addressId: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    subtotal: { type: new GraphQLNonNull(GraphQLInt) },
    deliveryFee: { type: new GraphQLNonNull(GraphQLInt) },
    discount: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
    paymentMethod: { type: new GraphQLNonNull(GraphQLString) },
    idempotencyKey: { type: new GraphQLNonNull(GraphQLString) },
    placedAt: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrderItemType))) },
  },
});

const OrdersPageType = new GraphQLObjectType({
  name: "AppOrdersPage",
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrderType))) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const orderQueries = {
  myOrders: {
    type: new GraphQLNonNull(OrdersPageType),
    args: {
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
    },
    resolve: async (
      _src: unknown,
      args: { page?: number; limit?: number },
      ctx: GraphQLContext,
    ) => {
      const user = requireUser(ctx);
      const query = parseInput(listOrdersQuerySchema, {
        page: args.page ?? 1,
        limit: args.limit ?? 20,
      });
      const result = fromServiceResult(await ctx.services.orders.listMyOrders(user.id, query));
      return {
        items: result.items.map((o) => ({
          ...o,
          placedAt: o.placedAt.toISOString(),
        })),
        page: result.meta.page,
        limit: result.meta.limit,
        total: result.meta.total,
      };
    },
  },
};

export const orderMutations = {
  checkout: {
    type: new GraphQLNonNull(OrderType),
    args: {
      addressId: { type: new GraphQLNonNull(GraphQLString) },
      paymentMethod: { type: GraphQLString },
      idempotencyKey: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      _src: unknown,
      args: { addressId: string; paymentMethod?: string; idempotencyKey: string },
      ctx: GraphQLContext,
    ) => {
      const user = requireUser(ctx);
      const input = parseInput(checkoutBodySchema, {
        addressId: args.addressId,
        paymentMethod: args.paymentMethod ?? "COD",
      });
      const order = fromServiceResult(
        await ctx.services.orders.checkout(user.id, input, args.idempotencyKey),
      );
      return { ...order, placedAt: order.placedAt.toISOString() };
    },
  },
  cancelOrder: {
    type: new GraphQLNonNull(OrderType),
    args: {
      orderId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: { orderId: string }, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      const order = fromServiceResult(
        await ctx.services.orders.cancelOrder(user.id, args.orderId, user.role === "admin"),
      );
      return { ...order, placedAt: order.placedAt.toISOString() };
    },
  },
  updateOrderStatus: {
    type: new GraphQLNonNull(OrderType),
    args: {
      orderId: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      _src: unknown,
      args: { orderId: string; status: string },
      ctx: GraphQLContext,
    ) => {
      const user = requireUser(ctx);
      if (user.role !== "admin") {
        const { toGraphQLError } = await import("../../shared/errors");
        throw toGraphQLError({ code: "FORBIDDEN", message: "Admin access required" });
      }
      const input = parseInput(updateOrderStatusBodySchema, { status: args.status });
      const order = fromServiceResult(
        await ctx.services.orders.updateStatus(args.orderId, input.status, user.id),
      );
      return { ...order, placedAt: order.placedAt.toISOString() };
    },
  },
};
