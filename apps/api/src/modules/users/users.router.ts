import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { requireAuth } from "../../shared/middleware/auth";
import type { AppEnv } from "../../types/hono";
import type { UsersHandlers } from "./users.handlers";
import {
  addressBodySchema,
  addressIdParamSchema,
  requestOtpBodySchema,
  updateAddressBodySchema,
  updateProfileBodySchema,
  verifyOtpBodySchema,
} from "./users.schemas";

export const createUsersRouter = (handlers: UsersHandlers) => {
  const authRouter = new Hono<AppEnv>();
  authRouter.post("/otp/request", zValidator("json", requestOtpBodySchema), handlers.requestOtp);
  authRouter.post("/otp/verify", zValidator("json", verifyOtpBodySchema), handlers.verifyOtp);

  const meRouter = new Hono<AppEnv>();
  meRouter.use("*", requireAuth);
  meRouter.get("/", handlers.getMe);
  meRouter.patch("/", zValidator("json", updateProfileBodySchema), handlers.updateMe);
  meRouter.get("/addresses", handlers.listAddresses);
  meRouter.post("/addresses", zValidator("json", addressBodySchema), handlers.addAddress);
  meRouter.patch(
    "/addresses/:id",
    zValidator("param", addressIdParamSchema),
    zValidator("json", updateAddressBodySchema),
    handlers.updateAddress,
  );
  meRouter.delete(
    "/addresses/:id",
    zValidator("param", addressIdParamSchema),
    handlers.deleteAddress,
  );

  return { authRouter, meRouter };
};
