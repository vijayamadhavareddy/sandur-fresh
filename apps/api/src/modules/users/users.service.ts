import type { Db } from "@sf/db";
import { env, isProduction } from "../../config/env";
import {
  type DomainError,
  forbidden,
  notFound,
  unauthorized,
  validationError,
} from "../../shared/errors";
import { err, ok, type Result } from "../../shared/result";
import type { AddressRow, UserRow, UsersRepo } from "./users.repo";
import type {
  AddressInput,
  RequestOtpInput,
  UpdateAddressInput,
  UpdateProfileInput,
  VerifyOtpInput,
} from "./users.schemas";

const OTP_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const publicUser = (user: UserRow) => ({
  id: user.id,
  phone: user.phone,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

export type UsersServiceDeps = {
  db: Db;
  usersRepo: UsersRepo;
};

const generateOtpCode = (): string => {
  if (!isProduction) return env.DEV_OTP;
  return String(Math.floor(100000 + Math.random() * 900000));
};

export const createUsersService = (deps: UsersServiceDeps) => {
  const requestOtp = async (
    input: RequestOtpInput,
  ): Promise<Result<{ message: string }, DomainError>> => {
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);
    await deps.usersRepo.createOtpChallenge(deps.db, {
      phone: input.phone,
      code,
      expiresAt,
    });
    if (!isProduction) {
      console.log(JSON.stringify({ level: "info", msg: "dev_otp", phone: input.phone, code }));
    }
    return ok({ message: "OTP sent" });
  };

  const verifyOtp = async (
    input: VerifyOtpInput,
  ): Promise<Result<{ token: string; user: ReturnType<typeof publicUser> }, DomainError>> => {
    const now = new Date();
    const challenge = await deps.usersRepo.findValidOtp(deps.db, input.phone, input.code, now);
    const devBypass = !isProduction && input.code === env.DEV_OTP;
    if (!challenge && !devBypass) {
      return err(unauthorized("Invalid or expired OTP"));
    }
    if (challenge) {
      await deps.usersRepo.consumeOtp(deps.db, challenge.id, now);
    }

    let user = await deps.usersRepo.findUserByPhone(deps.db, input.phone);
    if (!user) {
      user = await deps.usersRepo.createUser(deps.db, { phone: input.phone });
    }
    if (user.role === "admin") {
      return err(unauthorized("Administrators must use the admin login"));
    }

    const token = crypto.randomUUID() + crypto.randomUUID().replaceAll("-", "");
    await deps.usersRepo.createSession(deps.db, {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    });

    return ok({ token, user: publicUser(user) });
  };

  const getProfile = async (
    userId: string,
  ): Promise<Result<ReturnType<typeof publicUser>, DomainError>> => {
    const user = await deps.usersRepo.findUserById(deps.db, userId);
    if (!user) return err(notFound("User not found"));
    return ok(publicUser(user));
  };

  const updateProfile = async (
    userId: string,
    input: UpdateProfileInput,
  ): Promise<Result<ReturnType<typeof publicUser>, DomainError>> => {
    if (input.name === undefined && input.email === undefined) {
      return err(validationError("No fields to update"));
    }
    const user = await deps.usersRepo.updateUser(deps.db, userId, input);
    if (!user) return err(notFound("User not found"));
    return ok(publicUser(user));
  };

  const listAddresses = async (userId: string): Promise<Result<AddressRow[], DomainError>> => {
    const rows = await deps.usersRepo.listAddressesByUser(deps.db, userId);
    return ok(rows);
  };

  const addAddress = async (
    userId: string,
    input: AddressInput,
  ): Promise<Result<AddressRow, DomainError>> => {
    const isDefault = input.isDefault ?? false;
    const address = await deps.db.transaction(async (tx) => {
      if (isDefault) {
        await deps.usersRepo.clearDefaultAddresses(tx, userId);
      }
      return deps.usersRepo.createAddress(tx, {
        userId,
        label: input.label,
        line1: input.line1,
        line2: input.line2 ?? null,
        city: input.city,
        pincode: input.pincode,
        phone: input.phone,
        lat: input.lat,
        lng: input.lng,
        isDefault,
      });
    });
    return ok(address);
  };

  const updateAddress = async (
    userId: string,
    addressId: string,
    input: UpdateAddressInput,
  ): Promise<Result<AddressRow, DomainError>> => {
    const existing = await deps.usersRepo.findAddressForUser(deps.db, addressId, userId);
    if (!existing) return err(notFound("Address not found"));

    const address = await deps.db.transaction(async (tx) => {
      if (input.isDefault === true) {
        await deps.usersRepo.clearDefaultAddresses(tx, userId);
      }
      return deps.usersRepo.updateAddress(tx, addressId, {
        ...input,
        line2: input.line2 === undefined ? undefined : input.line2,
      });
    });

    if (!address) return err(notFound("Address not found"));
    return ok(address);
  };

  const removeAddress = async (
    userId: string,
    addressId: string,
  ): Promise<Result<{ id: string }, DomainError>> => {
    const existing = await deps.usersRepo.findAddressForUser(deps.db, addressId, userId);
    if (!existing) return err(notFound("Address not found"));
    await deps.usersRepo.deleteAddress(deps.db, addressId);
    return ok({ id: addressId });
  };

  const resolveUserFromToken = async (token: string) => {
    const row = await deps.usersRepo.findSessionByToken(deps.db, token, new Date());
    if (!row) return null;
    return {
      id: row.user.id,
      phone: row.user.phone,
      name: row.user.name,
      email: row.user.email,
      role: row.user.role,
    };
  };

  const requireAdmin = (role: string): Result<true, DomainError> => {
    if (role !== "admin") return err(forbidden("Admin access required"));
    return ok(true);
  };

  const ensureAddressOwner = async (
    userId: string,
    addressId: string,
  ): Promise<Result<AddressRow, DomainError>> => {
    const address = await deps.usersRepo.findAddressForUser(deps.db, addressId, userId);
    if (!address) return err(notFound("Address not found"));
    return ok(address);
  };

  return {
    requestOtp,
    verifyOtp,
    getProfile,
    updateProfile,
    listAddresses,
    addAddress,
    updateAddress,
    removeAddress,
    resolveUserFromToken,
    requireAdmin,
    ensureAddressOwner,
  };
};

export type UsersService = ReturnType<typeof createUsersService>;
