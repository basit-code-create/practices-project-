import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { categories } from "@/data/categories";
import { imageCredits } from "@/data/imageCredits";
import { products } from "@/data/products";
import { store } from "@/data/store";
import { pageMetadata } from "@/lib/metadata";
import { NewTabNote } from "@/components/shared/NewTabNote";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata = pageMetadata({
  title: "Image Credits",
  description: `Sources of the stock photos used on the ${store.name} website.`,
  path: "/image-credits",
});

function usedFor(image: string): string {
  const category = categories.find((item) => item.image === image);
  if (category) return `${category.name} (category)`;
  const product = products.find((item) => item.image === image);
  if (product) return product.name;
  if (image.startsWith("/images/services/")) return "Book-binding services";
  return "Website";
}

export default function ImageCreditsPage() {
  return (
    <>
      <PageHeader
        title="Image Credits"
        description="Product and category photos on this website are representative stock photos. They show the kind of item we offer and may differ from the products in the shop."
        breadcrumbs={[{ label: "Image Credits" }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="max-w-3xl text-slate-600">
          All photos are from{" "}
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy-700 underline hover:text-navy-900"
          >
            Pexels
            <NewTabNote />
          </a>{" "}
          and are used under the{" "}
          <a
            href="https://www.pexels.com/license/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy-700 underline hover:text-navy-900"
          >
            Pexels License
            <NewTabNote />
          </a>
          . Thank you to the photographers who share their work.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imageCredits.map((credit) => (
            <li key={credit.image} className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-navy-100">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-navy-50">
                <Image src={credit.image} alt="" fill sizes="7rem" className="object-cover" />
              </div>
              <div className="min-w-0 text-sm">
                <p className="font-semibold text-navy-900">{usedFor(credit.image)}</p>
                <p className="mt-0.5 line-clamp-2 text-slate-600">{credit.title}</p>
                <a
                  href={credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-semibold text-navy-700 hover:text-navy-900 hover:underline"
                >
                  View on {credit.source}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <NewTabNote />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
