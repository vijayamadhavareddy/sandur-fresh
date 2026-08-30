import type { Db } from "@sf/db";
import { buildSchema, type GeneratedEntities } from "drizzle-graphql";
import {
  type GraphQLFieldConfigMap,
  type GraphQLFieldResolver,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import type { GraphQLContext } from "./context";
import { adminMutations, adminQueries } from "./resolvers/admin";
import { cartMutations, cartQueries } from "./resolvers/cart";
import { catalogQueries } from "./resolvers/catalog";
import { deliveryQueries } from "./resolvers/delivery";
import { orderMutations, orderQueries } from "./resolvers/orders";
import { userMutations, userQueries } from "./resolvers/users";

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


const getSafeCatalogQueries = (entities: GeneratedEntities<Db>) => {

  const safeCatalogQueries: GraphQLFieldConfigMap<unknown, GraphQLContext> = {};

  for (const key of catalogQueryKeys) {
    const field = entities.queries[key as keyof typeof entities.queries];
    if (field) {
      const isList = key === "products" || key === "categories" || key === "stores";
      const baseField = isList ? withLimitCap(field as never) : field;
      const origResolve = baseField.resolve;
      safeCatalogQueries[key] = {
        ...baseField,
        resolve: async (
          source: unknown,
          args: Record<string, unknown>,
          context: GraphQLContext,
          info: unknown,
        ) => {
          if (context?.services?.products) {
            if (key === "categories") {
              const res = await context.services.products.listCategories();
              return res.ok ? res.value : [];
            }
            if (key === "products") {
              const limit = typeof args.limit === "number" ? args.limit : 20;
              const page = typeof args.offset === "number" ? Math.floor(args.offset / limit) + 1 : 1;
              const res = await context.services.products.listProducts({ page, limit });
              return res.ok ? res.value.items : [];
            }
            if (key === "stores") {
              const res = await context.services.products.listStores();
              return res.ok ? res.value : [];
            }
          }
          if (!origResolve) return null;
          return origResolve(source, args, context, info as never);
        },
      } as never;
    }
  }

  return safeCatalogQueries;
};

const schemaCache = new WeakMap<object, GraphQLSchema>();

export const getGraphqlSchema = (db: Db) => {
  const cached = schemaCache.get(db as object);
  if (cached) return cached;

  const { entities } = buildSchema(db);
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        ...getSafeCatalogQueries(entities),
        ...catalogQueries,
        ...adminQueries,
        ...cartQueries,
        ...orderQueries,
        ...deliveryQueries,
        ...userQueries,
      },
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: {
        // Intentionally omit auto-generated mutations for orders, cart, inventory, etc.
        ...cartMutations,
        ...adminMutations,
        ...orderMutations,
        ...userMutations,
      },
    }),
    types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
  });

  schemaCache.set(db as object, schema);
  return schema;
};
