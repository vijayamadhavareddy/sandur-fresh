import { createYoga } from "graphql-yoga";
import { env, isProduction } from "../config/env";
import { services as defaultServices, type Services } from "../container";
import type { AuthUser, CloudflareBindings } from "../types/hono";
import type { GraphQLContext, YogaInitialContext } from "./context";
import { graphqlSchema } from "./schema";

const introspectionEnabled = env.GRAPHQL_INTROSPECTION || !isProduction;

export type YogaServerContext = Pick<YogaInitialContext, "responseHeaders"> & {
  services?: Services;
  env?: CloudflareBindings;
};

export const createAppYoga = (
  getUser: (token: string, services?: Services) => Promise<AuthUser | null>,
) =>
  createYoga<YogaServerContext, GraphQLContext>({
    schema: graphqlSchema,
    graphqlEndpoint: "/graphql",
    graphiql: introspectionEnabled,
    landingPage: false,
    maskedErrors: isProduction,
    context: async (initialContext) => {
      const { request, responseHeaders } = initialContext;
      const extra = initialContext as unknown as YogaServerContext;
      const activeServices = extra.services ?? defaultServices;
      const cookieName = extra.env?.ADMIN_SESSION_COOKIE ?? env.ADMIN_SESSION_COOKIE;

      let user: AuthUser | null = null;
      let sessionToken: string | null = null;
      const header = request.headers.get("authorization");
      if (header?.startsWith("Bearer ")) {
        const token = header.slice("Bearer ".length).trim();
        if (token) {
          sessionToken = token;
          user = await getUser(token, activeServices);
        }
      }
      if (!user) {
        const cookie = request.headers.get("cookie");
        const token = cookie
          ?.split(";")
          .map((part) => part.trim().split("="))
          .find(([name]) => name === cookieName)?.[1];
        if (token) {
          try {
            sessionToken = decodeURIComponent(token);
            user = await getUser(sessionToken, activeServices);
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
        services: activeServices,
      };
    },
  });
