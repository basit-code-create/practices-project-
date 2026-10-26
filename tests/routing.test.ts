import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { categories } from "@/data/categories";
import { isActivePath } from "@/data/navigation";
import { proxy } from "@/proxy";

describe("category proxy", () => {
  it("lets every real category page through", () => {
    for (const category of categories) {
      const response = proxy(new NextRequest(`http://localhost/categories/${category.slug}`));
      expect(response.headers.get("x-middleware-next"), category.slug).toBe("1");
      expect(response.headers.get("x-middleware-rewrite")).toBeNull();
    }
  });

  it("rewrites unknown categories to the 404 page", () => {
    for (const slug of ["not-a-category", "NOTEBOOKS", "registers-2"]) {
      const response = proxy(new NextRequest(`http://localhost/categories/${slug}`));
      expect(response.headers.get("x-middleware-rewrite"), slug).toBe("http://localhost/404");
    }
  });
});

describe("navigation highlighting", () => {
  it("highlights Products on the catalog and real category pages", () => {
    expect(isActivePath("/products", "/products")).toBe(true);
    expect(isActivePath("/products", "/categories/registers")).toBe(true);
    expect(isActivePath("/products", "/categories/unknown")).toBe(false);
  });

  it("highlights Home only on the homepage", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/", "/about")).toBe(false);
  });

  it("highlights other pages by path", () => {
    expect(isActivePath("/services", "/services")).toBe(true);
    expect(isActivePath("/contact", "/about")).toBe(false);
  });
});
