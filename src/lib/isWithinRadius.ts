import calculateDistance from "./calculateDistance";

export default function isWithinRadius(
  lat: number,
  lon: number,
  officeLat: number,
  officeLon: number,
  radius: number
): boolean {
  const distance = calculateDistance(lat, lon, officeLat, officeLon);
  return distance <= radius;
}
