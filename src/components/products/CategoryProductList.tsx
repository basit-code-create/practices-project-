"use client";

import { useState } from "react";
import type { Category, Product } from "@/types/catalog";
import { filterProducts } from "@/lib/search";
import { pluralize } from "@/lib/utils";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProductGrid } from "./ProductGrid";
import { ProductSearch } from "./ProductSearch";

/** Products of a single category with a search box limited to that category. */
export function CategoryProductList({ category, products }: { category: Category; products: Product[] }) {
  const [query, setQuery] = useState("");
  const results = filterProducts(products, { query, category: category.slug });
  const trimmedQuery = query.trim();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ProductSearch
          value={query}
          onChange={setQuery}
          label={`Search ${category.name}`}
          placeholder={`Search in ${category.name}…`}
          className="sm:w-96"
        />
        <p role="status" className="text-sm text-slate-600">
          {trimmedQuery ? (
            <>
              <span className="font-semibold text-navy-900">{results.length}</span> of{" "}
              {pluralize(products.length, "product")} matching{" "}
              <span className="font-semibold text-navy-900">“{trimmedQuery}”</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-navy-900">{products.length}</span>{" "}
              {products.length === 1 ? "product" : "products"} in this category
            </>
          )}
        </p>
      </div>

      <div className="mt-8">
        {results.length === 0 ? (
          <EmptyState
            title="No matching products"
            description={`Nothing in ${category.name} matches “${trimmedQuery}”. Try another word or ask at the shop — not every item is listed online.`}
          >
            <button type="button" onClick={() => setQuery("")} className={buttonStyles({ variant: "primary" })}>
              Clear search
            </button>
          </EmptyState>
        ) : (
          <ProductGrid products={results} showCategory={false} linkToCategory={false} />
        )}
      </div>
    </div>
  );
}
