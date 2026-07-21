import { buildSchema } from "drizzle-graphql";
import {
  type GraphQLFieldConfigMap,
  type GraphQLFieldResolver,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import { db } from "../../../../packages/db";
import { cartMutations, cartQueries } from "./resolvers/cart";
import { deliveryQueries } from "./resolvers/delivery";
import { orderMutations, orderQueries } from "./resolvers/orders";
import { userMutations } from "./resolvers/users";

// biome-ignore lint/suspicious/noExplicitAny: no other way
const { entities } = buildSchema(db as any);

/** Cap unbounded catalog list queries at 100. */
const withLimitCap = <TSource, TContext>(
  field: {
    type: unknown;
    args?: Record<string, unknown>;
    resolve?: GraphQLFieldResolver<TSource, TContext>;
  },
  max = 100,
) => {
  const originalResolve = field.resolve;
  return {
    ...field,
    resolve: async (
      source: TSource,
      args: Record<string, unknown>,
      context: TContext,
      info: unknown,
    ) => {
      const nextArgs = { ...args };
      if (typeof nextArgs.limit === "number" && nextArgs.limit > max) {
        nextArgs.limit = max;
      }
      if (nextArgs.limit === undefined || nextArgs.limit === null) {
        nextArgs.limit = Math.min(20, max);
      }
      if (!originalResolve) return null;
      return originalResolve(source, nextArgs, context, info as never);
    },
  };
};

const catalogQueryKeys = [
  "products",
  "productsSingle",
  "categories",
  "categoriesSingle",
  "stores",
  "storesSingle",
] as const;

const safeCatalogQueries: GraphQLFieldConfigMap<unknown, unknown> = {};

for (const key of catalogQueryKeys) {
  const field = entities.queries[key as keyof typeof entities.queries];
  if (field) {
    const isList = key === "products" || key === "categories" || key === "stores";
    safeCatalogQueries[key] = isList ? (withLimitCap(field as never) as never) : (field as never);
  }
}

export const graphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...safeCatalogQueries,
      ...cartQueries,
      ...orderQueries,
      ...deliveryQueries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      // Intentionally omit auto-generated mutations for orders, cart, inventory, etc.
      ...cartMutations,
      ...orderMutations,
      ...userMutations,
    },
  }),
  types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});
