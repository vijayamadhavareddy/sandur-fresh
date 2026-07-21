import type { Context } from "hono";
import { unauthorized } from "../../shared/errors";
import { fromResult, valid } from "../../shared/http";
import type { AppEnv } from "../../types/hono";
import type {
  AddressInput,
  RequestOtpInput,
  UpdateAddressInput,
  UpdateProfileInput,
  VerifyOtpInput,
} from "./users.schemas";
import type { UsersService } from "./users.service";

export const createUsersHandlers = (usersService: UsersService) => {
  const requestOtp = async (c: Context<AppEnv>) => {
    const body = valid<RequestOtpInput>(c, "json");
    const result = await usersService.requestOtp(body);
    return fromResult(c, result);
  };

  const verifyOtp = async (c: Context<AppEnv>) => {
    const body = valid<VerifyOtpInput>(c, "json");
    const result = await usersService.verifyOtp(body);
    return fromResult(c, result);
  };

  const getMe = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const result = await usersService.getProfile(user.id);
    return fromResult(c, result);
  };

  const updateMe = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const body = valid<UpdateProfileInput>(c, "json");
    const result = await usersService.updateProfile(user.id, body);
    return fromResult(c, result);
  };

  const listAddresses = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const result = await usersService.listAddresses(user.id);
    return fromResult(c, result);
  };

  const addAddress = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const body = valid<AddressInput>(c, "json");
    const result = await usersService.addAddress(user.id, body);
    return fromResult(c, result, 201);
  };

  const updateAddress = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const { id } = valid<{ id: string }>(c, "param");
    const body = valid<UpdateAddressInput>(c, "json");
    const result = await usersService.updateAddress(user.id, id, body);
    return fromResult(c, result);
  };

  const deleteAddress = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const { id } = valid<{ id: string }>(c, "param");
    const result = await usersService.removeAddress(user.id, id);
    return fromResult(c, result);
  };

  return {
    requestOtp,
    verifyOtp,
    getMe,
    updateMe,
    listAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};

export type UsersHandlers = ReturnType<typeof createUsersHandlers>;
