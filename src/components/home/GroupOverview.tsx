import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CategoryGroup } from "@/types/catalog";
import { categoryGroups, getCategoriesByGroup, getCategoryPath } from "@/data/categories";
import { countProductsByCategory } from "@/data/products";
import { cn, pluralize } from "@/lib/utils";
import { ProductIcon } from "@/components/products/ProductIcon";

/**
 * Overview of one side of the business (stationery or electrical) with links
 * to each of its category pages.
 */
export function GroupOverview({ group }: { group: CategoryGroup }) {
  const meta = categoryGroups[group];
  const groupCategories = getCategoriesByGroup(group);
  const dark = group === "electrical";
  const [primary, ...rest] = groupCategories;
  const headingId = `${group}-overview-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("py-16 sm:py-24", dark ? "on-dark bg-navy-900" : "bg-cream-100")}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className={cn(dark && "lg:order-2")}>
          <p
            className={cn(
              "text-sm font-semibold tracking-[0.14em] uppercase",
              dark ? "text-amber-300" : "text-amber-800",
            )}
          >
            {meta.label}
          </p>
          <h2
            id={headingId}
            className={cn(
              "mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl",
              dark ? "text-white" : "text-navy-900",
            )}
          >
            {meta.title}
          </h2>
          <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-navy-100" : "text-slate-600")}>
            {meta.description}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {groupCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={getCategoryPath(category.slug)}
                  className={cn(
                    "group flex h-full items-center gap-3 rounded-2xl p-3 pr-4 transition-colors",
                    dark
                      ? "bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                      : "bg-white shadow-sm ring-1 ring-navy-100 hover:ring-navy-200",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl",
                      dark ? "bg-amber-400 text-navy-950" : "bg-amber-100 text-amber-800",
                    )}
                  >
                    <ProductIcon name={category.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block font-semibold", dark ? "text-white" : "text-navy-900")}>
                      {category.name}
                    </span>
                    <span className={cn("block text-sm", dark ? "text-navy-200" : "text-slate-600")}>
                      {pluralize(countProductsByCategory(category.slug), "product")}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      "size-4 shrink-0 transition-transform group-hover:translate-x-0.5",
                      dark ? "text-amber-300" : "text-navy-600",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("relative", dark && "lg:order-1")} aria-hidden="true">
          <div
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl",
              dark ? "shadow-black/30 ring-1 ring-white/10" : "shadow-navy-900/10 ring-1 ring-navy-100",
            )}
          >
            <Image src={primary.image} alt="" fill sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {rest.slice(0, 3).map((category) => (
              <div
                key={category.slug}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-2xl",
                  dark ? "ring-1 ring-white/10" : "ring-1 ring-navy-100",
                )}
              >
                <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 11rem, 30vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
