"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { CategorySlug, Product } from "@/types/catalog";
import { categories, getCategoryBySlug, getCategoryPath } from "@/data/categories";
import { filterProducts } from "@/lib/search";
import { pluralize } from "@/lib/utils";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { EmptyState } from "@/components/shared/EmptyState";
import { CategoryFilter, type CategoryFilterValue } from "./CategoryFilter";
import { ProductGrid } from "./ProductGrid";
import { ProductSearch } from "./ProductSearch";

/** Full catalog with search and category filter. Both filters apply together. */
export function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilterValue>("all");

  const counts = Object.fromEntries(
    categories.map((item) => [item.slug, products.filter((p) => p.categorySlug === item.slug).length]),
  ) as Record<CategorySlug, number>;

  const results = filterProducts(products, { query, category });
  const trimmedQuery = query.trim();
  const filtersActive = trimmedQuery !== "" || category !== "all";
  const selectedCategory = category === "all" ? undefined : getCategoryBySlug(category);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
          <CategoryFilter
            variant="list"
            value={category}
            onChange={setCategory}
            counts={counts}
            total={products.length}
          />
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ProductSearch
            value={query}
            onChange={setQuery}
            placeholder="Search by product, category or keyword…"
            className="flex-1"
          />
          <CategoryFilter
            variant="select"
            value={category}
            onChange={setCategory}
            counts={counts}
            total={products.length}
            className="sm:w-72 lg:hidden"
          />
        </div>

        <div className="mt-5 flex min-h-10 flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-slate-600">
            Showing <span className="font-semibold text-navy-900">{results.length}</span> of{" "}
            {pluralize(products.length, "product")}
            {selectedCategory && (
              <>
                {" "}
                in <span className="font-semibold text-navy-900">{selectedCategory.name}</span>
              </>
            )}
            {trimmedQuery && (
              <>
                {" "}
                matching <span className="font-semibold text-navy-900">“{trimmedQuery}”</span>
              </>
            )}
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 text-sm font-semibold text-navy-800 hover:bg-navy-50"
            >
              <X className="size-4" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>

        {selectedCategory && (
          <p className="mt-3 text-sm">
            <Link
              href={getCategoryPath(selectedCategory.slug)}
              className="inline-flex items-center gap-1 font-semibold text-navy-700 hover:text-navy-900 hover:underline"
            >
              Open the {selectedCategory.name} page
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        )}

        <div className="mt-6">
          {results.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try a different word, check the spelling, or choose another category. You can also ask at the shop — not every item is listed online."
            >
              <button type="button" onClick={clearFilters} className={buttonStyles({ variant: "primary" })}>
                Clear filters
              </button>
            </EmptyState>
          ) : filtersActive ? (
            <ProductGrid products={results} layout="narrow" />
          ) : (
            <div className="space-y-14">
              {categories.map((item) => {
                const items = results.filter((product) => product.categorySlug === item.slug);
                if (items.length === 0) return null;
                return (
                  <section key={item.slug} aria-labelledby={`catalog-${item.slug}`}>
                    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-navy-100 pb-3">
                      <h2 id={`catalog-${item.slug}`} className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                        <Link href={getCategoryPath(item.slug)} className="hover:underline">
                          {item.name}
                        </Link>
                      </h2>
                      <Link
                        href={getCategoryPath(item.slug)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-navy-900 hover:underline"
                      >
                        View category ({items.length})
                        <span className="sr-only">: {item.name}</span>
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                    <ProductGrid products={items} showCategory={false} layout="narrow" />
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
