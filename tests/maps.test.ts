import { describe, expect, it } from "vitest";
import { store } from "@/data/store";
import { formatCoordinates, getDirectionsUrl, getMapEmbedUrl, getMapViewUrl } from "@/lib/maps";

describe("shop location", () => {
  it("uses the verified coordinates", () => {
    expect(store.coordinates).toEqual({ latitude: 30.817865, longitude: 73.468005 });
  });

  it("embeds a map pinned to the exact coordinates", () => {
    expect(getMapEmbedUrl()).toBe("https://maps.google.com/maps?q=30.817865,73.468005&z=16&output=embed");
  });

  it("opens Google Maps directions to the exact coordinates", () => {
    expect(getDirectionsUrl()).toBe("https://www.google.com/maps/dir/?api=1&destination=30.817865%2C73.468005");
  });

  it("links to the location on Google Maps", () => {
    expect(getMapViewUrl()).toBe("https://www.google.com/maps/search/?api=1&query=30.817865%2C73.468005");
  });

  it("formats coordinates for display", () => {
    expect(formatCoordinates()).toBe("30.817865° N, 73.468005° E");
  });
});
