/**
 * Time-bound shelves: curated product shelves that surface at a given time of day.
 * A product may be tagged to at most one section (or none, via a null tag).
 *
 * This is the single source of truth for the section ids, titles and windows —
 * admin (tagging UI) and the customer app (shelf rendering) both read it through
 * the `timeBoundSections` GraphQL query.
 */

export type TimeBoundSectionId = "BREAKFAST" | "LUNCH" | "DINNER";

export type TimeBoundSection = {
  id: TimeBoundSectionId;
  title: string;
  /** Human-readable window label, e.g. "5 – 11 AM". */
  window: string;
  /** Inclusive start hour, 0-23, local time. */
  startHour: number;
  /** Exclusive end hour, 0-23, local time. */
  endHour: number;
};

export const TIME_BOUND_SECTIONS: readonly TimeBoundSection[] = [
  {
    id: "BREAKFAST",
    title: "Breakfast essentials",
    window: "5 – 11 AM",
    startHour: 5,
    endHour: 11,
  },
  {
    id: "LUNCH",
    title: "Lunch thali picks",
    window: "11 AM – 4 PM",
    startHour: 11,
    endHour: 16,
  },
  {
    id: "DINNER",
    title: "Dinner staples",
    window: "4 – 9 PM",
    startHour: 16,
    endHour: 21,
  },
] as const;

export const TIME_BOUND_SECTION_IDS = TIME_BOUND_SECTIONS.map((s) => s.id) as [
  TimeBoundSectionId,
  ...TimeBoundSectionId[],
];

/** True when `hour` (0-23) falls inside the section's window. */
export const isSectionActiveAt = (section: TimeBoundSection, hour: number) =>
  hour >= section.startHour && hour < section.endHour;
