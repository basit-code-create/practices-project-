import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookCopy, BookOpen, FileText, NotebookPen } from "lucide-react";
import { store } from "@/data/store";
import { bindingEnquiryMessage, hasDirectContact } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { ContactActions } from "@/components/shared/ContactActions";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata = pageMetadata({
  title: "Book-Binding Services in Okara",
  description: `Book-binding services at ${store.name}, Okara — binding for books, notebooks, registers and documents. Visit the shop to discuss the binding you need.`,
  path: "/services",
});

const services = [
  {
    icon: BookOpen,
    title: "Book Binding",
    text: "Binding to keep books, notes and loose pages together in a neat, sturdy format.",
  },
  {
    icon: NotebookPen,
    title: "Notebook & Register Binding",
    text: "Binding for notebooks and registers. Ask at the shop about the options available for your pages.",
  },
  {
    icon: BookCopy,
    title: "Book Repair & Rebinding",
    text: "Have a worn or loose book? Bring it in and ask whether it can be repaired or rebound.",
  },
  {
    icon: FileText,
    title: "Educational & Office Documents",
    text: "Binding for assignments, project reports and office documents. Ask about suitable binding styles.",
  },
];

const steps = [
  { title: "Bring your book or documents", text: "Visit the shop with the book, notes or pages you want bound." },
  { title: "Discuss the binding", text: "Tell us what you need and we will talk through the binding options." },
  { title: "Confirm price and timing", text: "Agree the price and expected completion time with the shop." },
  { title: "Collect your work", text: "Collect your bound work as arranged with the shop." },
];

export default function ServicesPage() {
  const canContact = hasDirectContact();

  return (
    <>
      <PageHeader
        title="Book-Binding Services"
        eyebrow="Our services"
        description={`Alongside stationery and electrical items, ${store.name} offers book binding in ${store.location.city} to help keep your books, notes and documents neat and protected.`}
        breadcrumbs={[{ label: "Services" }]}
      />

      <section aria-labelledby="services-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="services-heading" className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Binding for Books, Notes and Documents
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Whether it is a school notebook, a set of notes, a project report or an office file, bring it to the shop
              and we will discuss a binding that suits it.
            </p>
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
              Binding styles, prices and completion times depend on the job. Please confirm them with the shop before
              placing your order.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-cream-300/60 shadow-navy-900/10">
            <Image
              src="/images/services/book-binding.jpg"
              alt="Row of hardbound book spines"
              fill
              priority
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
              <span className="flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="process-heading" className="on-dark bg-navy-900 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.14em] text-amber-300 uppercase">How it works</p>
          <h2 id="process-heading" className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Getting Your Binding Done
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="flex size-10 items-center justify-center rounded-full bg-amber-400 font-display text-lg font-bold text-navy-950">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="binding-enquiry" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-3xl bg-cream-100 p-8 ring-1 ring-cream-300/60 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 id="binding-enquiry" className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Ask About Book Binding
            </h2>
            <p className="mt-3 text-slate-600">
              {canContact
                ? "Get in touch to check binding availability, options and pricing, or bring your work to the shop."
                : "Visit the shop with your book or documents to check binding availability, options and pricing."}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-4 lg:mt-0 lg:items-end">
            <ContactActions message={bindingEnquiryMessage} className="lg:justify-end" />
            <Link href="/contact" className={buttonStyles({ variant: "outline", size: "sm" })}>
              Contact &amp; location
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
