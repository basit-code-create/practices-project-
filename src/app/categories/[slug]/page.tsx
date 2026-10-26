import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { categories, categoryGroups, getCategoryBySlug, getCategoryPath } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { store } from "@/data/store";
import { pageMetadata } from "@/lib/metadata";
import { cn, pluralize } from "@/lib/utils";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CatalogNotice } from "@/components/shared/CatalogNotice";
import { EmptyState } from "@/components/shared/EmptyState";
import { CategoryProductList } from "@/components/products/CategoryProductList";
import { ProductIcon } from "@/components/products/ProductIcon";

// Every category page is prerendered from generateStaticParams. Unknown slugs
// are rewritten to a 404 by src/proxy.ts; notFound() below is a fallback.
// The slug is read before rendering, so navigation waits for the (static) page.
export const instant = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return pageMetadata({
    title: `${category.name} in Okara`,
    description: `${category.description} Browse ${category.name.toLowerCase()} at ${store.name}, Okara, Punjab.`,
    path: getCategoryPath(category.slug),
  });
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);
  const related = categories.filter((item) => item.group === category.group && item.slug !== category.slug);
  const otherGroup = categories.filter((item) => item.group !== category.group);
  const electrical = category.group === "electrical";

  return (
    <>
      <div className={cn("border-b", electrical ? "border-navy-100 bg-navy-50" : "border-cream-200 bg-cream-100")}>
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[3fr_2fr] lg:gap-12 lg:px-8">
          <div>
            <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: category.name }]} />
            <p
              className={cn(
                "mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                electrical ? "bg-navy-800 text-white" : "bg-amber-400 text-navy-950",
              )}
            >
              <ProductIcon name={category.icon} className="size-3.5" />
              {categoryGroups[category.group].label}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-slate-600 sm:text-lg">
              {category.longDescription}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="text-sm font-semibold text-navy-900">{pluralize(categoryProducts.length, "product")} listed</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900 hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to all products
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-72 overflow-hidden rounded-3xl border-4 border-white shadow-xl shadow-navy-900/10 sm:max-w-md lg:max-w-none">
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <section aria-label={`${category.name} products`} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <CatalogNotice className="mb-8" />
        {categoryProducts.length === 0 ? (
          <EmptyState
            title="No products listed yet"
            description={`We haven't added ${category.name.toLowerCase()} to the online catalog yet. Please ask at the shop or browse other categories.`}
          >
            <Link href="/products" className={buttonStyles({ variant: "primary" })}>
              Browse all products
            </Link>
            <Link href="/contact" className={buttonStyles({ variant: "outline" })}>
              Contact &amp; location
            </Link>
          </EmptyState>
        ) : (
          <CategoryProductList category={category} products={categoryProducts} />
        )}
      </section>

      <section aria-labelledby="more-categories" className="border-t border-navy-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 id="more-categories" className="font-display text-2xl font-bold text-navy-900">
            More {categoryGroups[category.group].label.toLowerCase()} categories
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={getCategoryPath(item.slug)}
                  className="group flex h-full items-center gap-3 rounded-2xl bg-cream-50 p-3 pr-4 ring-1 ring-navy-100 transition-colors hover:bg-cream-100"
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl",
                      electrical ? "bg-navy-100 text-navy-700" : "bg-amber-100 text-amber-800",
                    )}
                  >
                    <ProductIcon name={item.icon} className="size-5" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-navy-900">{item.name}</span>
                  <ArrowRight className="size-4 text-navy-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-600">
            Also browse {categoryGroups[otherGroup[0].group].label.toLowerCase()}:{" "}
            {otherGroup.map((item, index) => (
              <span key={item.slug}>
                <Link href={getCategoryPath(item.slug)} className="font-semibold text-navy-700 hover:text-navy-900 hover:underline">
                  {item.name}
                </Link>
                {index < otherGroup.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
