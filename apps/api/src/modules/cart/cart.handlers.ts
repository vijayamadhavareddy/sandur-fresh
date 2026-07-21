import type { Context } from "hono";
import { unauthorized } from "../../shared/errors";
import { fromResult, valid } from "../../shared/http";
import type { AppEnv } from "../../types/hono";
import type { AddCartItemInput, UpdateCartItemInput } from "./cart.schemas";
import type { CartService } from "./cart.service";

export const createCartHandlers = (cartService: CartService) => {
  const requireUser = (c: Context<AppEnv>) => c.get("user");

  const getCart = async (c: Context<AppEnv>) => {
    const user = requireUser(c);
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    return fromResult(c, await cartService.getCart(user.id));
  };

  const addItem = async (c: Context<AppEnv>) => {
    const user = requireUser(c);
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const body = valid<AddCartItemInput>(c, "json");
    return fromResult(c, await cartService.addItem(user.id, body));
  };

  const updateItem = async (c: Context<AppEnv>) => {
    const user = requireUser(c);
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const { id } = valid<{ id: string }>(c, "param");
    const body = valid<UpdateCartItemInput>(c, "json");
    return fromResult(c, await cartService.updateItem(user.id, id, body));
  };

  const removeItem = async (c: Context<AppEnv>) => {
    const user = requireUser(c);
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const { id } = valid<{ id: string }>(c, "param");
    return fromResult(c, await cartService.removeItem(user.id, id));
  };

  const clearCart = async (c: Context<AppEnv>) => {
    const user = requireUser(c);
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    return fromResult(c, await cartService.clearCart(user.id));
  };

  return { getCart, addItem, updateItem, removeItem, clearCart };
};

export type CartHandlers = ReturnType<typeof createCartHandlers>;
