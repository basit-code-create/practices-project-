import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, MapPin, PenLine, Zap } from "lucide-react";
import { getCategoriesByGroup, getCategoryPath } from "@/data/categories";
import { store, storeLocationLabel } from "@/data/store";
import { pageMetadata } from "@/lib/metadata";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata = pageMetadata({
  title: "About Us",
  description: `${store.name} in Okara, Punjab, owned by ${store.owner}, offers stationery, school and office supplies, electrical essentials and book-binding services.`,
  path: "/about",
});

const offerings = [
  {
    icon: PenLine,
    title: "Stationery & School Supplies",
    text: "Copies, notebooks, pens, pencils, geometry boxes and other everyday items for students and teachers.",
    href: "/categories/copies-notebooks",
    linkLabel: "Browse copies & notebooks",
  },
  {
    icon: Briefcase,
    title: "Office Stationery",
    text: "Registers, paper, files, folders and desk essentials for offices, shops and homes.",
    href: "/categories/office-stationery",
    linkLabel: "Browse office stationery",
  },
  {
    icon: Zap,
    title: "Electrical Essentials",
    text: "Bulbs, switches, sockets, wires, cables and other everyday electrical items.",
    href: "/categories/electrical-lighting",
    linkLabel: "Browse electrical items",
  },
  {
    icon: BookOpen,
    title: "Book-Binding Services",
    text: "Binding for books, notebooks, registers and documents — ask at the shop about options.",
    href: "/services",
    linkLabel: "See our services",
  },
];

export default function AboutPage() {
  const initials = store.owner
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <>
      <PageHeader
        title={`About ${store.name}`}
        eyebrow="About us"
        description={`A local shop in ${store.location.city} for stationery, school and office supplies, electrical essentials and book-binding services.`}
        breadcrumbs={[{ label: "About Us" }]}
      />

      <section aria-labelledby="who-we-are" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <h2 id="who-we-are" className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Who We Are
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                {store.name} is a local business in {storeLocationLabel}, owned by {store.owner}. The shop brings two
                kinds of everyday needs together under one roof: stationery and electrical essentials.
              </p>
              <p>
                On the stationery side, customers can find copies and notebooks, registers, writing supplies, school
                supplies and office stationery. On the electrical side, the shop offers bulbs and lighting, switches and
                sockets, wires and cables, and other electrical accessories.
              </p>
              <p>
                The shop also provides book-binding services for books, notes and documents. For prices and current
                availability, customers are welcome to ask at the shop.
              </p>
            </div>
          </div>
          <aside className="flex flex-col gap-5">
            <div className="rounded-3xl bg-navy-900 p-7 text-white">
              <div className="flex items-center gap-4">
                <span
                  className="flex size-16 shrink-0 items-center justify-center rounded-full bg-amber-400 font-display text-xl font-bold text-navy-950"
                  aria-hidden="true"
                >
                  {initials}
                </span>
                <div>
                  <p className="text-sm text-navy-200">Owner</p>
                  <p className="font-display text-xl font-semibold">{store.owner}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-navy-100">
                {store.owner} runs {store.name}, serving customers in {store.location.city} with stationery, electrical
                items and book binding.
              </p>
            </div>
            <div className="flex gap-3 rounded-3xl bg-cream-100 p-7 ring-1 ring-cream-300/60">
              <MapPin className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-semibold text-navy-900">Location</p>
                {store.address && <p className="mt-1 text-slate-700">{store.address}</p>}
                <p className="mt-1 text-slate-700">{storeLocationLabel}</p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900 hover:underline"
                >
                  Map &amp; directions
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="what-we-offer" className="border-y border-navy-100 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="what-we-offer" className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            What We Offer
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map(({ icon: Icon, title, text, href, linkLabel }) => (
              <li key={title} className="flex flex-col rounded-2xl bg-cream-50 p-6 ring-1 ring-navy-100">
                <span className="flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{text}</p>
                <Link
                  href={href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900 hover:underline"
                >
                  {linkLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {(["stationery", "electrical"] as const).map((group) => (
              <div key={group}>
                <h3 className="font-display text-xl font-semibold text-navy-900">
                  {group === "stationery" ? "Stationery categories" : "Electrical categories"}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {getCategoriesByGroup(group).map((category) => (
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">Come and Visit Us</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Browse the catalog online, then visit the shop in {store.location.city} to ask about prices and availability.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className={buttonStyles({ variant: "accent" })}>
            Explore Products
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className={buttonStyles({ variant: "outline" })}>
            <MapPin className="size-4" aria-hidden="true" />
            Find Our Shop
          </Link>
        </div>
      </section>
    </>
  );
}
