import type { SlotConfigRow } from "./delivery.repo";

export type DeliverySlot = {
  id: string;
  startAt: string;
  endAt: string;
  capacity: number;
  remaining: number;
};

const startOfDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

/** Generate upcoming delivery slots for the next `days` calendar days. */
export const generateSlots = (config: SlotConfigRow, from: Date, days = 2): DeliverySlot[] => {
  const slots: DeliverySlot[] = [];
  const base = startOfDay(from);

  for (let day = 0; day < days; day += 1) {
    const dayStart = new Date(base);
    dayStart.setDate(base.getDate() + day);

    for (
      let minute = config.dayStartMinutes;
      minute + config.slotDurationMinutes <= config.dayEndMinutes;
      minute += config.slotDurationMinutes
    ) {
      const startAt = new Date(dayStart.getTime() + minute * 60_000);
      const endAt = new Date(startAt.getTime() + config.slotDurationMinutes * 60_000);
      if (endAt <= from) continue;

      slots.push({
        id: `${config.storeId}-${startAt.toISOString()}`,
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        capacity: config.capacityPerSlot,
        remaining: config.capacityPerSlot,
      });
    }
  }

  return slots;
};
