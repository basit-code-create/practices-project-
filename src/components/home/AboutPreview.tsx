import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, PenLine, Zap } from "lucide-react";
import { store } from "@/data/store";
import { buttonStyles } from "@/components/shared/buttonStyles";

const focusAreas = [
  { icon: PenLine, title: "School stationery", text: "Copies, notebooks, pens and geometry boxes for students." },
  { icon: Briefcase, title: "Office supplies", text: "Registers, paper, files and desk essentials." },
  { icon: Zap, title: "Electrical essentials", text: "Bulbs, switches, sockets, wires and accessories." },
  { icon: BookOpen, title: "Book binding", text: "Binding for books, notes and documents." },
];

export function AboutPreview() {
  const initials = store.owner
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <section aria-labelledby="about-heading" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-amber-800 uppercase">About the business</p>
          <h2
            id="about-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
          >
            A Local Shop for Stationery and Electrical Needs
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {store.name} serves customers in {store.location.city} with stationery, school and office supplies,
            everyday electrical items and book-binding services — so students, families, offices and shops can find
            what they need in one place.
          </p>
          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-100">
            <span
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display text-lg font-bold text-white"
              aria-hidden="true"
            >
              {initials}
            </span>
            <div>
              <p className="text-sm text-slate-600">Owner</p>
              <p className="font-display text-lg font-semibold text-navy-900">{store.owner}</p>
            </div>
          </div>
          <Link href="/about" className={buttonStyles({ variant: "outline", className: "mt-8" })}>
            More About Us
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid content-center gap-4 sm:grid-cols-2">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
              <span className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
