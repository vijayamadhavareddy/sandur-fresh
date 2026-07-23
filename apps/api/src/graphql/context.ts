import type { services } from "../container";
import type { AuthUser } from "../types/hono";

export type GraphQLContext = {
  user: AuthUser | null;
  requestId: string;
  services: typeof services;
  sessionToken: string | null;
  responseHeaders: Headers;
};

export type YogaInitialContext = {
  request: Request;
  responseHeaders: Headers;
};
