import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { filterProducts, matchesQuery } from "@/lib/search";
import { formatPrice } from "@/lib/utils";

const names = (items: typeof products) => items.map((product) => product.name);

describe("product search and filters", () => {
  it("returns every product with no query and no category", () => {
    expect(filterProducts(products, {})).toHaveLength(products.length);
  });

  it("is case-insensitive", () => {
    expect(names(filterProducts(products, { query: "NOTEBOOK" }))).toEqual(
      names(filterProducts(products, { query: "notebook" })),
    );
  });

  it("searches product names", () => {
    expect(names(filterProducts(products, { query: "geometry" }))).toContain("Geometry Boxes");
  });

  it("searches category names", () => {
    const results = filterProducts(products, { query: "wires & cables" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((product) => product.categorySlug === "wires-cables")).toBe(true);
  });

  it("searches keywords", () => {
    expect(names(filterProducts(products, { query: "taar" }))).toContain("Electrical Wires");
    expect(names(filterProducts(products, { query: "khata" }))).toContain("Ledger Registers");
  });

  it("matches simple plurals", () => {
    expect(names(filterProducts(products, { query: "switches" }))).toContain("Light Switches");
    expect(names(filterProducts(products, { query: "boxes" }))).toContain("Geometry Boxes");
  });

  it("requires every word to match", () => {
    expect(names(filterProducts(products, { query: "attendance register" }))).toEqual(["Attendance Registers"]);
    expect(filterProducts(products, { query: "attendance cable" })).toEqual([]);
  });

  it("applies search and category together", () => {
    const notebookInRegisters = filterProducts(products, { query: "notebook", category: "registers" });
    const expected = products.filter(
      (product) => product.categorySlug === "registers" && matchesQuery(product, "notebook"),
    );
    expect(notebookInRegisters).toEqual(expected);
    expect(notebookInRegisters.every((product) => product.categorySlug === "registers")).toBe(true);

    const attendance = filterProducts(products, { query: "attendance", category: "registers" });
    expect(names(attendance)).toEqual(["Attendance Registers"]);
    expect(filterProducts(products, { query: "attendance", category: "wires-cables" })).toEqual([]);
  });

  it("filters by category only", () => {
    const lighting = filterProducts(products, { category: "electrical-lighting" });
    expect(lighting.length).toBeGreaterThan(0);
    expect(lighting.every((product) => product.categorySlug === "electrical-lighting")).toBe(true);
  });
});

describe("formatPrice", () => {
  it("formats verified PKR prices", () => {
    expect(formatPrice(250)).toBe("Rs. 250");
    expect(formatPrice(1250)).toBe("Rs. 1,250");
    expect(formatPrice(125000)).toBe("Rs. 125,000");
  });
});
