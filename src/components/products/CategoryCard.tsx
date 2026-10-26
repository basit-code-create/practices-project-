import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/catalog";
import { categoryGroups, getCategoryPath } from "@/data/categories";
import { countProductsByCategory } from "@/data/products";
import { cn, pluralize } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { IconTile } from "./ProductVisual";

/**
 * Category card. The "View Products" link stretches over the whole card, so
 * the entire card is clickable without nesting interactive elements.
 */
export function CategoryCard({ category, headingLevel = "h3" }: { category: Category; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const count = countProductsByCategory(category.slug);
  const electrical = category.group === "electrical";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-navy-600">
      <div className="relative aspect-[4/3] overflow-hidden">
        <FallbackImage
          src={category.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          fallback={<IconTile icon={category.icon} group={category.group} />}
        />
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
            electrical ? "bg-navy-800 text-white" : "bg-amber-400 text-navy-950",
          )}
        >
          {categoryGroups[category.group].label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-display text-lg font-semibold text-navy-900">{category.name}</Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{category.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy-50 pt-4">
          <span className="text-sm text-slate-600">{pluralize(count, "product")}</span>
          <Link
            href={getCategoryPath(category.slug)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-navy-900"
          >
            View Products
            <span className="sr-only"> in {category.name}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
