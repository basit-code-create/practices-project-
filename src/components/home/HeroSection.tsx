import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, PenLine, Zap } from "lucide-react";
import { getCategoryBySlug } from "@/data/categories";
import { storeLocationLabel } from "@/data/store";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/shared/buttonStyles";

const mosaic = [
  { slug: "copies-notebooks", className: "translate-y-6" },
  { slug: "electrical-lighting", className: "" },
  { slug: "writing-supplies", className: "translate-y-6" },
  { slug: "switches-accessories", className: "" },
] as const;

const highlights = [
  { icon: PenLine, label: "Stationery & school supplies" },
  { icon: Zap, label: "Electrical essentials" },
  { icon: BookOpen, label: "Book-binding services" },
];

function Highlight({ children }: { children: string }) {
  return (
    <span className="box-decoration-clone bg-linear-to-b from-transparent from-[62%] to-amber-300 to-[62%] px-1">
      {children}
    </span>
  );
}

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-cream-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--color-cream-300)_1px,transparent_1px)] bg-size-[22px_22px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800 shadow-sm">
            <MapPin className="size-4 text-amber-600" aria-hidden="true" />
            {storeLocationLabel}
          </p>
          <h1
            id="hero-heading"
            className="mt-6 font-display text-4xl leading-[1.12] font-extrabold tracking-tight text-balance text-navy-900 sm:text-5xl lg:text-[3.35rem]"
          >
            Your Everyday Destination for <Highlight>Stationery</Highlight> &amp;{" "}
            <Highlight>Electrical</Highlight> Essentials
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-600">
            School and office stationery, notebooks, registers, electrical essentials and book-binding services — all
            at Rajpoot Book Depo and Electric Store in Okara.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className={buttonStyles({ variant: "accent", size: "lg" })}>
              Explore Products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className={buttonStyles({ variant: "outline", size: "lg" })}>
              <MapPin className="size-4" aria-hidden="true" />
              Find Our Shop
            </Link>
          </div>
          <ul className="mt-10 grid gap-3 text-sm font-medium text-navy-800 sm:grid-cols-3 sm:gap-4">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm ring-1 ring-navy-100">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none" aria-hidden="true">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-amber-200/50 via-transparent to-navy-200/60 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-4 pb-6 sm:gap-5">
            {mosaic.map(({ slug, className }, index) => {
              const category = getCategoryBySlug(slug);
              if (!category) return null;
              return (
                <div
                  key={slug}
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-navy-900/10",
                    className,
                  )}
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 18rem, 45vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg">
            <BookOpen className="size-4 text-amber-300" />
            Book binding available in store
          </div>
        </div>
      </div>
    </section>
  );
}
