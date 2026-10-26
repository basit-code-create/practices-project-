import { store } from "@/data/store";

type Coordinates = { latitude: number; longitude: number };

const shopCoordinates: Coordinates = store.coordinates;

function toPair({ latitude, longitude }: Coordinates): string {
  return `${latitude},${longitude}`;
}

/** URL for the embedded Google Map, pinned to the exact coordinates. */
export function getMapEmbedUrl(
  coordinates: Coordinates = shopCoordinates,
  zoom: number = store.map.zoom,
): string {
  return `https://maps.google.com/maps?q=${toPair(coordinates)}&z=${zoom}&output=embed`;
}

/** Opens Google Maps with turn-by-turn directions to the shop. */
export function getDirectionsUrl(coordinates: Coordinates = shopCoordinates): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(toPair(coordinates))}`;
}

/** Opens Google Maps centred on the shop's location. */
export function getMapViewUrl(coordinates: Coordinates = shopCoordinates): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(toPair(coordinates))}`;
}

/** Human-readable coordinates, e.g. "30.817865° N, 73.468005° E". */
export function formatCoordinates({ latitude, longitude }: Coordinates = shopCoordinates): string {
  const lat = `${Math.abs(latitude)}° ${latitude >= 0 ? "N" : "S"}`;
  const lng = `${Math.abs(longitude)}° ${longitude >= 0 ? "E" : "W"}`;
  return `${lat}, ${lng}`;
}
