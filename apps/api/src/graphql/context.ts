import type { services } from "../container";
import type { AuthUser } from "../types/hono";

export type GraphQLContext = {
  user: AuthUser | null;
  requestId: string;
  services: typeof services;
};

export type YogaInitialContext = {
  request: Request;
};
