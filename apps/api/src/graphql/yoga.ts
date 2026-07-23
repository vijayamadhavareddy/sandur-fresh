import { createYoga } from "graphql-yoga";
import { env, isProduction } from "../config/env";
import { services } from "../container";
import type { AuthUser } from "../types/hono";
import type { GraphQLContext, YogaInitialContext } from "./context";
import { graphqlSchema } from "./schema";

const introspectionEnabled = env.GRAPHQL_INTROSPECTION || !isProduction;

export const createAppYoga = (getUser: (token: string) => Promise<AuthUser | null>) =>
  createYoga<Pick<YogaInitialContext, "responseHeaders">, GraphQLContext>({
    schema: graphqlSchema,
    graphqlEndpoint: "/graphql",
    graphiql: introspectionEnabled,
    landingPage: false,
    maskedErrors: isProduction,
    context: async ({ request, responseHeaders }) => {
      let user: AuthUser | null = null;
      let sessionToken: string | null = null;
      const header = request.headers.get("authorization");
      if (header?.startsWith("Bearer ")) {
        const token = header.slice("Bearer ".length).trim();
        if (token) {
          sessionToken = token;
          user = await getUser(token);
        }
      }
      if (!user) {
        const cookie = request.headers.get("cookie");
        const token = cookie
          ?.split(";")
          .map((part) => part.trim().split("="))
          .find(([name]) => name === env.ADMIN_SESSION_COOKIE)?.[1];
        if (token) {
          try {
            sessionToken = decodeURIComponent(token);
            user = await getUser(sessionToken);
          } catch {
            sessionToken = null;
          }
        }
      }
      return {
        user,
        sessionToken,
        responseHeaders,
        requestId: request.headers.get("x-request-id") ?? crypto.randomUUID(),
        services,
      };
    },
  });
