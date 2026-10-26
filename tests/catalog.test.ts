import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { categories, getCategoryBySlug, getCategoryPath } from "@/data/categories";
import { imageCredits } from "@/data/imageCredits";
import { getFeaturedProducts, getProductsByCategory, products } from "@/data/products";

const requiredCategories = {
  "copies-notebooks": "Copies & Notebooks",
  registers: "Registers",
  "writing-supplies": "Writing Supplies",
  "school-supplies": "School Supplies",
  "office-stationery": "Office Stationery & Paper",
  "electrical-lighting": "Electrical Bulbs & Lighting",
  "switches-accessories": "Switches & Electrical Accessories",
  "wires-cables": "Wires & Cables",
  "electrical-accessories": "Other Electrical Items",
};

const publicFileExists = (src: string) => existsSync(join(process.cwd(), "public", src));

describe("categories", () => {
  it("contains every required category with its exact slug and name", () => {
    for (const [slug, name] of Object.entries(requiredCategories)) {
      expect(getCategoryBySlug(slug)?.name).toBe(name);
    }
  });

  it("uses unique slugs", () => {
    const slugs = categories.map((category) => category.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives each category its own URL under /categories", () => {
    for (const category of categories) {
      expect(getCategoryPath(category.slug)).toBe(`/categories/${category.slug}`);
    }
  });

  it("points every category at an image that exists in /public", () => {
    for (const category of categories) {
      expect(publicFileExists(category.image), category.image).toBe(true);
    }
  });

  it("returns undefined for unknown slugs", () => {
    expect(getCategoryBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("products", () => {
  it("uses unique ids and slugs", () => {
    const ids = products.map((product) => product.id);
    const slugs = products.map((product) => product.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("assigns every product to an existing category", () => {
    for (const product of products) {
      expect(getCategoryBySlug(product.categorySlug), product.name).toBeDefined();
    }
  });

  it("lists at least one product in every category", () => {
    for (const category of categories) {
      expect(getProductsByCategory(category.slug).length, category.name).toBeGreaterThan(0);
    }
  });

  it("filters a category to that category's products only", () => {
    for (const category of categories) {
      const items = getProductsByCategory(category.slug);
      expect(items.every((product) => product.categorySlug === category.slug)).toBe(true);
      expect(items.length).toBe(products.filter((product) => product.categorySlug === category.slug).length);
    }
  });

  it("features between 4 and 8 real catalog products", () => {
    const featured = getFeaturedProducts();
    expect(featured.length).toBeGreaterThanOrEqual(4);
    expect(featured.length).toBeLessThanOrEqual(8);
    for (const product of featured) {
      expect(products).toContain(product);
    }
  });

  it("only uses positive PKR amounts for prices that have been added", () => {
    for (const product of products) {
      if (product.price === undefined) continue;
      expect(Number.isFinite(product.price) && product.price > 0, product.name).toBe(true);
      expect(product.currency ?? "PKR").toBe("PKR");
    }
  });

  it("points product photos at files that exist in /public", () => {
    for (const product of products) {
      if (product.image) expect(publicFileExists(product.image), product.image).toBe(true);
    }
  });
});

describe("image credits", () => {
  it("point at images that exist in /public", () => {
    for (const credit of imageCredits) {
      expect(publicFileExists(credit.image), credit.image).toBe(true);
    }
  });

  it("list each image once", () => {
    const images = imageCredits.map((credit) => credit.image);
    expect(new Set(images).size).toBe(images.length);
  });

  it("credit every stock photo used by a category", () => {
    for (const category of categories) {
      if (!category.image.endsWith(".jpg")) continue;
      expect(imageCredits.some((credit) => credit.image === category.image), category.image).toBe(true);
    }
  });
});
