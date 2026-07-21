import type { Context } from "hono";
import { unauthorized } from "../../shared/errors";
import { fromResult, valid } from "../../shared/http";
import type { AppEnv } from "../../types/hono";
import type { ServiceabilityQuery, SlotsQuery } from "./delivery.schemas";
import type { DeliveryService } from "./delivery.service";

export const createDeliveryHandlers = (deliveryService: DeliveryService) => {
  const serviceability = async (c: Context<AppEnv>) => {
    const query = valid<ServiceabilityQuery>(c, "query");
    const user = c.get("user");
    const result = await deliveryService.checkServiceability(query, user?.id);
    return fromResult(c, result);
  };

  const slots = async (c: Context<AppEnv>) => {
    const user = c.get("user");
    if (!user) return fromResult(c, { ok: false as const, error: unauthorized() });
    const query = valid<SlotsQuery>(c, "query");
    const result = await deliveryService.availableSlots(query, user.id);
    return fromResult(c, result);
  };

  return { serviceability, slots };
};

export type DeliveryHandlers = ReturnType<typeof createDeliveryHandlers>;
