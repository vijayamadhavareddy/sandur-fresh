import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { addCartItemBodySchema, updateCartItemBodySchema } from "../../modules/cart/cart.schemas";
import type { GraphQLContext } from "../context";
import { fromServiceResult, parseInput, requireUser } from "../helpers";

const CartItemType = new GraphQLObjectType({
  name: "AppCartItem",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    productId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    unit: { type: new GraphQLNonNull(GraphQLString) },
    emoji: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    mrp: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    lineTotal: { type: new GraphQLNonNull(GraphQLInt) },
    lineSavings: { type: new GraphQLNonNull(GraphQLInt) },
    stockQty: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const CartType = new GraphQLObjectType({
  name: "AppCart",
  fields: {
    id: { type: GraphQLString },
    storeId: { type: GraphQLString },
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CartItemType))) },
    subtotal: { type: new GraphQLNonNull(GraphQLInt) },
    savings: { type: new GraphQLNonNull(GraphQLInt) },
    deliveryFee: { type: new GraphQLNonNull(GraphQLInt) },
    discount: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const cartQueries = {
  myCart: {
    type: new GraphQLNonNull(CartType),
    resolve: async (_src: unknown, _args: unknown, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      return fromServiceResult(await ctx.services.cart.getCart(user.id));
    },
  },
};

export const cartMutations = {
  addToCart: {
    type: new GraphQLNonNull(CartType),
    args: {
      productId: { type: new GraphQLNonNull(GraphQLString) },
      quantity: { type: new GraphQLNonNull(GraphQLInt) },
      storeId: { type: GraphQLString },
    },
    resolve: async (
      _src: unknown,
      args: { productId: string; quantity: number; storeId?: string },
      ctx: GraphQLContext,
    ) => {
      const user = requireUser(ctx);
      const input = parseInput(addCartItemBodySchema, args);
      return fromServiceResult(await ctx.services.cart.addItem(user.id, input));
    },
  },
  updateCartItem: {
    type: new GraphQLNonNull(CartType),
    args: {
      itemId: { type: new GraphQLNonNull(GraphQLString) },
      quantity: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (
      _src: unknown,
      args: { itemId: string; quantity: number },
      ctx: GraphQLContext,
    ) => {
      const user = requireUser(ctx);
      const input = parseInput(updateCartItemBodySchema, { quantity: args.quantity });
      return fromServiceResult(await ctx.services.cart.updateItem(user.id, args.itemId, input));
    },
  },
  removeCartItem: {
    type: new GraphQLNonNull(CartType),
    args: {
      itemId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_src: unknown, args: { itemId: string }, ctx: GraphQLContext) => {
      const user = requireUser(ctx);
      return fromServiceResult(await ctx.services.cart.removeItem(user.id, args.itemId));
    },
  },
};
