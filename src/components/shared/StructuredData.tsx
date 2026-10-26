import { categories } from "@/data/categories";
import { store } from "@/data/store";
import { getContactChannels } from "@/lib/contact";
import { getMapViewUrl } from "@/lib/maps";
import { getConfiguredSiteUrl } from "@/lib/site";

/**
 * LocalBusiness (Store) structured data for search engines. Only verified
 * details are included: optional fields appear once they are set in
 * src/data/store.ts.
 */
export function StructuredData() {
  const { phone, email } = getContactChannels();
  const siteUrl = getConfiguredSiteUrl();
  const socials = Object.values(store.social).filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: store.name,
    description: store.description,
    ...(siteUrl && { url: siteUrl, "@id": `${siteUrl}/#store`, image: `${siteUrl}/opengraph-image` }),
    address: {
      "@type": "PostalAddress",
      ...(store.address && { streetAddress: store.address }),
      addressLocality: store.location.city,
      addressRegion: store.location.region,
      addressCountry: store.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: store.coordinates.latitude,
      longitude: store.coordinates.longitude,
    },
    hasMap: getMapViewUrl(),
    areaServed: { "@type": "City", name: store.location.city },
    ...(phone && { telephone: `+${phone.digits}` }),
    ...(email && { email: email.address }),
    ...(store.openingHours.length > 0 && {
      openingHoursSpecification: store.openingHours.map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.days,
        opens: entry.opens,
        closes: entry.closes,
      })),
    }),
    ...(socials.length > 0 && { sameAs: socials }),
    knowsAbout: [...categories.map((category) => category.name), "Book binding"],
  };

  return (
    <script
      type="application/ld+json"
      // JSON is escaped so it cannot close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
