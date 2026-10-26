import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { store } from "@/data/store";
import { canonical, getBaseUrl } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StructuredData } from "@/components/shared/StructuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = `${store.name} | Stationery & Electrical Store in Okara`;
const defaultDescription =
  "Stationery, copies and notebooks, registers, school and office supplies, electrical bulbs, switches, wires and book-binding services at Rajpoot Book Depo and Electric Store in Okara, Punjab, Pakistan.";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${store.name}`,
  },
  description: defaultDescription,
  applicationName: store.name,
  keywords: [
    "Rajpoot Book Depo",
    "stationery shop Okara",
    "book depot Okara",
    "electric store Okara",
    "school supplies Okara",
    "office stationery Okara",
    "registers",
    "notebooks",
    "electrical items Okara",
    "book binding Okara",
  ],
  alternates: canonical("/"),
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: store.name,
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  other: {
    "geo.region": "PK-PB",
    "geo.placename": store.location.city,
    "geo.position": `${store.coordinates.latitude};${store.coordinates.longitude}`,
    ICBM: `${store.coordinates.latitude}, ${store.coordinates.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c2f53",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-full bg-navy-900 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <StructuredData />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
