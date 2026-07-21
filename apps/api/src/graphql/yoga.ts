import { createYoga } from "graphql-yoga";
import { env, isProduction } from "../config/env";
import { services } from "../container";
import type { AuthUser } from "../types/hono";
import type { GraphQLContext } from "./context";
import { graphqlSchema } from "./schema";

const introspectionEnabled = env.GRAPHQL_INTROSPECTION || !isProduction;

export const createAppYoga = (getUser: (token: string) => Promise<AuthUser | null>) =>
  createYoga<Record<string, never>, GraphQLContext>({
    schema: graphqlSchema,
    graphqlEndpoint: "/graphql",
    graphiql: introspectionEnabled,
    landingPage: false,
    maskedErrors: isProduction,
    context: async ({ request }) => {
      let user: AuthUser | null = null;
      const header = request.headers.get("authorization");
      if (header?.startsWith("Bearer ")) {
        const token = header.slice("Bearer ".length).trim();
        if (token) user = await getUser(token);
      }
      return {
        user,
        requestId: request.headers.get("x-request-id") ?? crypto.randomUUID(),
        services,
      };
    },
  });
