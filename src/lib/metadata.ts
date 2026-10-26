import type { Metadata } from "next";
import { store } from "@/data/store";
import { canonical } from "@/lib/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

/** Consistent title, description, canonical link and social preview for a page. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: canonical(path),
    openGraph: {
      type: "website",
      locale: "en_PK",
      siteName: store.name,
      title: `${title} | ${store.name}`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${store.name}`,
      description,
    },
  };
}
