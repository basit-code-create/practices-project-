import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { categories, getCategoryPath } from "@/data/categories";
import { buttonStyles } from "@/components/shared/buttonStyles";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-navy-50 text-navy-600">
        <SearchX className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold tracking-[0.14em] text-amber-800 uppercase">404 — Page not found</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        The page or category you are looking for doesn&apos;t exist. Try one of the categories below or browse the full
        catalog.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonStyles({ variant: "primary" })}>
          Go to Homepage
        </Link>
        <Link href="/products" className={buttonStyles({ variant: "outline" })}>
          View All Products
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-12 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={getCategoryPath(category.slug)}
              className="inline-flex min-h-10 items-center rounded-full border border-navy-200 bg-white px-4 text-sm font-medium text-navy-800 hover:bg-navy-50"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
