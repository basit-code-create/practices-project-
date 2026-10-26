import type { ReactNode } from "react";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { getCategoriesByGroup, getCategoryPath } from "@/data/categories";
import { mainNavigation } from "@/data/navigation";
import { store, storeLocationLabel } from "@/data/store";
import { formatOpeningHours, generalEnquiryMessage, getContactChannels, getWhatsAppHref } from "@/lib/contact";
import { getDirectionsUrl } from "@/lib/maps";
import { NewTabNote } from "@/components/shared/NewTabNote";
import { Logo } from "./Logo";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const socialLabels: Record<keyof typeof store.social, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-300">{children}</h2>;
}

const linkClass = "text-navy-100 transition-colors hover:text-white hover:underline";

export function Footer() {
  const { phone, whatsapp, email } = getContactChannels();
  const hours = formatOpeningHours();
  const socials = (Object.keys(socialLabels) as (keyof typeof store.social)[]).filter((key) => store.social[key]);

  return (
    <footer className="on-dark bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Stationery, school and office supplies, electrical essentials and book-binding services in{" "}
              {store.location.city}.
            </p>
            <p className="mt-4 text-sm">
              <span className="text-navy-300">Owner:</span> <span className="font-semibold text-white">{store.owner}</span>
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3 text-sm">
                {socials.map((key) => (
                  <li key={key}>
                    <a href={store.social[key]} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {socialLabels[key]}
                      <NewTabNote />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-labelledby="footer-pages" className="lg:col-span-2">
            <FooterHeading>
              <span id="footer-pages">Pages</span>
            </FooterHeading>
            <ul className="mt-4 space-y-3 text-sm">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-stationery" className="lg:col-span-3">
            <FooterHeading>
              <span id="footer-stationery">Stationery</span>
            </FooterHeading>
            <ul className="mt-4 space-y-3 text-sm">
              {getCategoriesByGroup("stationery").map((category) => (
                <li key={category.slug}>
                  <Link href={getCategoryPath(category.slug)} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={linkClass}>
                  Book-Binding Services
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-electrical" className="lg:col-span-3">
            <FooterHeading>
              <span id="footer-electrical">Electrical</span>
            </FooterHeading>
            <ul className="mt-4 space-y-3 text-sm">
              {getCategoriesByGroup("electrical").map((category) => (
                <li key={category.slug}>
                  <Link href={getCategoryPath(category.slug)} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
            <div>
              <p className="font-semibold text-white">Visit us</p>
              {store.address && <p className="mt-1">{store.address}</p>}
              <p className="mt-1">{storeLocationLabel}</p>
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:text-amber-200 hover:underline"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Get Directions
                <NewTabNote />
              </a>
            </div>
          </div>
          {phone && (
            <div className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">Phone</p>
                <a href={phone.href} className={`mt-1 inline-block ${linkClass}`}>
                  {phone.display}
                </a>
              </div>
            </div>
          )}
          {whatsapp && (
            <div className="flex gap-3">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">WhatsApp</p>
                <a
                  href={getWhatsAppHref(whatsapp.digits, generalEnquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-1 inline-block ${linkClass}`}
                >
                  {whatsapp.display}
                  <NewTabNote />
                </a>
              </div>
            </div>
          )}
          {email && (
            <div className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href={email.href} className={`mt-1 inline-block break-all ${linkClass}`}>
                  {email.address}
                </a>
              </div>
            </div>
          )}
          {hours.length > 0 && (
            <div className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">Opening hours</p>
                <ul className="mt-1 space-y-1">
                  {hours.map((entry) => (
                    <li key={entry.days}>
                      {entry.days}: {entry.hours}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {store.name}. All rights reserved.
          </p>
          <p>
            Photos are representative stock images and may differ from the items in the shop.{" "}
            <Link href="/image-credits" className="text-navy-100 underline hover:text-white">
              Image credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
