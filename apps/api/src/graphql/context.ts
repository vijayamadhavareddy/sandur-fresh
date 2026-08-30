import type { Db } from "@sf/db";
import type { Services } from "../container";
import type { AuthUser } from "../types/hono";

export type GraphQLContext = {
  user: AuthUser | null;
  requestId: string;
  services: Services;
  db?: Db;
  sessionToken: string | null;
  responseHeaders: Headers;
};

export type YogaInitialContext = {
  request: Request;
  responseHeaders: Headers;
};
