import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonStyles } from "@/components/shared/buttonStyles";

const points = [
  "Binding for books, notebooks and registers",
  "Educational and office document binding",
  "Ask at the shop about binding styles, price and timing",
];

export function BindingSection() {
  return (
    <section aria-labelledby="binding-heading" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-cream-100 ring-1 ring-cream-300/60 lg:grid-cols-2 lg:gap-0">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[26rem]">
            <Image
              src="/images/services/book-binding.jpg"
              alt="Row of hardbound book spines"
              fill
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 pb-10 sm:px-10 lg:py-14">
            <p className="text-sm font-semibold tracking-[0.14em] text-amber-800 uppercase">Our services</p>
            <h2
              id="binding-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
            >
              Book-Binding Services
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Along with stationery and electrical items, we offer book binding to help keep your books, notes and
              documents neat and protected.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-slate-700">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/services" className={buttonStyles({ variant: "primary", size: "lg", className: "mt-8" })}>
              Explore Our Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
