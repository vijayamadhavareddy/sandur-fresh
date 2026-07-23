import type { Db } from "@sf/db";
import { type DomainError, notFound, validationError } from "../../shared/errors";
import { etaMinutesFromDistance, haversineMeters, isWithinRadius } from "../../shared/geo";
import { err, ok, type Result } from "../../shared/result";
import type { ProductsRepo } from "../products/products.repo";
import type { UsersRepo } from "../users/users.repo";
import type { DeliveryRepo } from "./delivery.repo";
import type { ServiceabilityQuery, SlotsQuery } from "./delivery.schemas";
import { type DeliverySlot, generateSlots } from "./slots";

export type DeliveryServiceDeps = {
  db: Db;
  deliveryRepo: DeliveryRepo;
  productsRepo: ProductsRepo;
  usersRepo: UsersRepo;
};

export type ServiceabilityResult = {
  serviceable: boolean;
  storeId: string | null;
  storeName: string | null;
  distanceM: number | null;
  etaMinutes: number | null;
};

export const createDeliveryService = (deps: DeliveryServiceDeps) => {
  const resolveCoords = async (
    query: ServiceabilityQuery,
    userId?: string,
  ): Promise<Result<{ lat: number; lng: number }, DomainError>> => {
    if (query.addressId) {
      if (!userId) return err(validationError("Authentication required for addressId"));
      const address = await deps.usersRepo.findAddressForUser(deps.db, query.addressId, userId);
      if (!address) return err(notFound("Address not found"));
      return ok({ lat: address.lat, lng: address.lng });
    }
    if (query.lat === undefined || query.lng === undefined) {
      return err(validationError("Provide addressId or both lat and lng"));
    }
    return ok({ lat: query.lat, lng: query.lng });
  };

  const checkServiceability = async (
    query: ServiceabilityQuery,
    userId?: string,
  ): Promise<Result<ServiceabilityResult, DomainError>> => {
    const coords = await resolveCoords(query, userId);
    if (!coords.ok) return coords;

    const stores = await deps.productsRepo.listActiveStores(deps.db);
    let best: ServiceabilityResult = {
      serviceable: false,
      storeId: null,
      storeName: null,
      distanceM: null,
      etaMinutes: null,
    };

    for (const store of stores) {
      const distanceM = haversineMeters(coords.value.lat, coords.value.lng, store.lat, store.lng);
      if (
        !isWithinRadius(
          coords.value.lat,
          coords.value.lng,
          store.lat,
          store.lng,
          store.serviceRadiusM,
        )
      ) {
        continue;
      }
      if (best.distanceM === null || distanceM < best.distanceM) {
        best = {
          serviceable: true,
          storeId: store.id,
          storeName: store.name,
          distanceM: Math.round(distanceM),
          etaMinutes: etaMinutesFromDistance(distanceM),
        };
      }
    }

    return ok(best);
  };

  const availableSlots = async (
    query: SlotsQuery,
    userId: string,
  ): Promise<Result<{ storeId: string; slots: DeliverySlot[] }, DomainError>> => {
    const serviceability = await checkServiceability({ addressId: query.addressId }, userId);
    if (!serviceability.ok) return serviceability;
    if (!serviceability.value.serviceable || !serviceability.value.storeId) {
      return err(validationError("Address is not serviceable"));
    }

    const storeId = serviceability.value.storeId;
    let config = await deps.deliveryRepo.findSlotConfigByStore(deps.db, storeId);
    if (!config) {
      config = {
        id: "default",
        storeId,
        slotDurationMinutes: 30,
        dayStartMinutes: 480,
        dayEndMinutes: 1320,
        capacityPerSlot: 20,
        createdAt: new Date(),
      };
    }

    const slots = generateSlots(config, new Date(), 2);
    return ok({ storeId, slots });
  };

  return {
    checkServiceability,
    availableSlots,
  };
};

export type DeliveryService = ReturnType<typeof createDeliveryService>;
