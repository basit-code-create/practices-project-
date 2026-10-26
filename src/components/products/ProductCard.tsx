import Link from "next/link";
import type { Category, Product } from "@/types/catalog";
import { getCategoryPath } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import { ProductEnquiry } from "./ProductEnquiry";
import { ProductVisual } from "./ProductVisual";

interface ProductCardProps {
  product: Product;
  category: Category;
  /** Show the category name above the product name. */
  showCategory?: boolean;
  /** Link the product name to its place on the category page. */
  linkToCategory?: boolean;
}

export function ProductCard({ product, category, showCategory = true, linkToCategory = true }: ProductCardProps) {
  const categoryPath = getCategoryPath(category.slug);

  return (
    <article
      id={`product-${product.slug}`}
      className="flex h-full scroll-mt-28 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-shadow hover:shadow-md target:ring-2 target:ring-amber-400 sm:flex-col"
    >
      <ProductVisual
        image={product.image}
        imageAlt={product.name}
        icon={product.icon ?? category.icon}
        category={category}
      />
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {showCategory && (
          <Link
            href={categoryPath}
            className="self-start text-xs font-semibold tracking-wide text-amber-800 uppercase hover:underline"
          >
            {category.name}
          </Link>
        )}
        <h3 className="mt-1 font-display text-base font-semibold text-navy-900 sm:text-lg">
          {linkToCategory ? (
            <Link href={`${categoryPath}#product-${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{product.description}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-navy-50 pt-3 sm:mt-4">
          {typeof product.price === "number" ? (
            <p className="font-display text-lg font-bold text-navy-900">
              <span className="sr-only">Price: </span>
              {formatPrice(product.price)}
            </p>
          ) : (
            <p className="text-sm font-semibold text-slate-700">Contact for Price</p>
          )}
          <ProductEnquiry product={product} category={category} />
        </div>
      </div>
    </article>
  );
}
