import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { store, storeLocationLabel } from "@/data/store";
import {
  formatOpeningHours,
  generalEnquiryMessage,
  getContactChannels,
  getWhatsAppHref,
  hasDirectContact,
} from "@/lib/contact";
import { formatCoordinates, getDirectionsUrl, getMapViewUrl } from "@/lib/maps";
import { pageMetadata } from "@/lib/metadata";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { ContactActions } from "@/components/shared/ContactActions";
import { GoogleMapEmbed } from "@/components/shared/GoogleMapEmbed";
import { NewTabNote } from "@/components/shared/NewTabNote";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata = pageMetadata({
  title: "Contact & Location",
  description: `Find ${store.name} in Okara, Punjab, Pakistan. View the shop on Google Maps and get directions.`,
  path: "/contact",
});

function DetailRow({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-sm font-semibold text-slate-600">{label}</dt>
        <dd className="mt-1 text-navy-900">{children}</dd>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { phone, whatsapp, email } = getContactChannels();
  const hours = formatOpeningHours();
  const canContact = hasDirectContact();

  return (
    <>
      <PageHeader
        title="Contact & Location"
        eyebrow="Visit or get in touch"
        description={
          canContact
            ? `Ask about products, prices or book binding, or visit ${store.name} in ${store.location.city}.`
            : `Visit ${store.name} in ${store.location.city} to ask about products, prices or book binding. Use the map below for directions.`
        }
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section
        id="location"
        aria-labelledby="contact-details"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[2fr_3fr] lg:gap-14 lg:px-8"
      >
        <div>
          <h2 id="contact-details" className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
            Shop Details
          </h2>
          <dl className="mt-6 divide-y divide-navy-100 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy-100 sm:p-7">
            <DetailRow icon={MapPin} label="Location">
              {store.address && <span className="block font-semibold">{store.address}</span>}
              <span className={store.address ? "block" : "block font-semibold"}>{storeLocationLabel}</span>
              <span className="mt-1 block text-sm text-slate-600">GPS: {formatCoordinates()}</span>
            </DetailRow>
            {phone && (
              <DetailRow icon={Phone} label="Phone">
                <a href={phone.href} className="font-semibold hover:underline">
                  {phone.display}
                </a>
              </DetailRow>
            )}
            {whatsapp && (
              <DetailRow icon={MessageCircle} label="WhatsApp">
                <a
                  href={getWhatsAppHref(whatsapp.digits, generalEnquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                >
                  {whatsapp.display}
                  <NewTabNote />
                </a>
              </DetailRow>
            )}
            {email && (
              <DetailRow icon={Mail} label="Email">
                <a href={email.href} className="font-semibold break-all hover:underline">
                  {email.address}
                </a>
              </DetailRow>
            )}
            {hours.length > 0 && (
              <DetailRow icon={Clock} label="Opening hours">
                <ul className="space-y-1">
                  {hours.map((entry) => (
                    <li key={entry.days}>
                      <span className="font-semibold">{entry.days}:</span> {entry.hours}
                    </li>
                  ))}
                </ul>
              </DetailRow>
            )}
          </dl>

          <ContactActions
            className="mt-6"
            trailing={
              <a
                href={getMapViewUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "outline" })}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Open in Google Maps
                <NewTabNote />
              </a>
            }
          />

          <div className="mt-8 rounded-2xl bg-cream-100 p-5 text-sm leading-relaxed text-slate-700 ring-1 ring-cream-300/60">
            <p className="font-semibold text-navy-900">Asking about a product?</p>
            <p className="mt-1">
              Note the product name from our{" "}
              <Link href="/products" className="font-semibold text-navy-700 underline hover:text-navy-900">
                catalog
              </Link>{" "}
              and {canContact ? "send us a message or" : ""} ask at the counter — we can confirm the current price and
              availability.
            </p>
          </div>
        </div>

        <div>
          <h2 className="sr-only">Map</h2>
          <GoogleMapEmbed className="sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem]" />
          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:text-navy-900 hover:underline"
          >
            <Navigation className="size-4" aria-hidden="true" />
            Get turn-by-turn directions in Google Maps
            <NewTabNote />
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
