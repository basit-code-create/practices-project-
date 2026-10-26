import type { Product } from "@/types/catalog";
import { getCategoryBySlug } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  showCategory?: boolean;
  linkToCategory?: boolean;
  /** "wide" fits four cards per row on large screens; "narrow" fits three (beside a sidebar). */
  layout?: "wide" | "narrow";
}

export function ProductGrid({ products, showCategory, linkToCategory, layout = "wide" }: ProductGridProps) {
  return (
    <ul
      role="list"
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        layout === "wide" ? "lg:grid-cols-3 xl:grid-cols-4" : "xl:grid-cols-3",
      )}
    >
      {products.map((product) => {
        const category = getCategoryBySlug(product.categorySlug);
        if (!category) return null;
        return (
          <li key={product.id}>
            <ProductCard
              product={product}
              category={category}
              showCategory={showCategory}
              linkToCategory={linkToCategory}
            />
          </li>
        );
      })}
    </ul>
  );
}
