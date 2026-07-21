const EARTH_RADIUS_M = 6_371_000;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/** Great-circle distance between two WGS84 points, in meters. */
export const haversineMeters = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(a)));
};

export const isWithinRadius = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  radiusM: number,
): boolean => haversineMeters(lat1, lng1, lat2, lng2) <= radiusM;

/** Rough ETA minutes from distance (assuming ~20 km/h last-mile). */
export const etaMinutesFromDistance = (distanceM: number): number => {
  const minutes = Math.ceil((distanceM / 1000 / 20) * 60);
  return Math.max(10, Math.min(60, minutes + 5));
};
