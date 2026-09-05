import type { Db } from "@sf/db";
import { buildSchema, type GeneratedEntities } from "drizzle-graphql";
import {
  type GraphQLFieldConfigMap,
  type GraphQLFieldResolver,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import type { GraphQLContext } from "./context";
import { adminMutations, adminQueries } from "./resolvers/admin";
import { cartMutations, cartQueries } from "./resolvers/cart";
import { catalogQueries, TimeBoundSectionIdType } from "./resolvers/catalog";
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
      safeCatalogQueries[key] = (isList ? withLimitCap(field as never) : field) as never;
    }
  }

  return safeCatalogQueries;
};

const schemaCache = new WeakMap<object, GraphQLSchema>();

export const getGraphqlSchema = (db: Db) => {
  const cached = schemaCache.get(db as object);
  if (cached) return cached;

  const { entities } = buildSchema(db);

  for (const type of Object.values(entities.types)) {
    if (type instanceof GraphQLObjectType) {
      const fields = type.getFields();
      if (fields.timeBoundSections) {
        fields.timeBoundSections.type = new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(TimeBoundSectionIdType)),
        );
        fields.timeBoundSections.resolve = (source: { timeBoundSections?: unknown }) => {
          if (Array.isArray(source.timeBoundSections)) return source.timeBoundSections;
          if (
            typeof source.timeBoundSections === "string" &&
            source.timeBoundSections.trim() !== ""
          ) {
            try {
              const parsed = JSON.parse(source.timeBoundSections);
              if (Array.isArray(parsed)) return parsed;
              return [parsed];
            } catch {
              return [source.timeBoundSections];
            }
          }
          return [];
        };
      }
    }
  }

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
