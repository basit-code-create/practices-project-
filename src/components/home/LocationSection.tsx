import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Navigation } from "lucide-react";
import { store, storeLocationLabel } from "@/data/store";
import { formatCoordinates, getDirectionsUrl, getMapViewUrl } from "@/lib/maps";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { GoogleMapEmbed } from "@/components/shared/GoogleMapEmbed";
import { NewTabNote } from "@/components/shared/NewTabNote";

export function LocationSection() {
  return (
    <section aria-labelledby="location-heading" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:gap-14 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-amber-800 uppercase">Visit the shop</p>
          <h2
            id="location-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-navy-900 sm:text-4xl"
          >
            Find Us in {store.location.city}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Use the map to find {store.name}, or open Google Maps for directions straight to the shop.
          </p>
          <div className="mt-6 flex gap-3 rounded-2xl bg-cream-100 p-5 ring-1 ring-cream-300/60">
            <MapPin className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
            <div className="text-slate-700">
              {store.address && <p className="font-semibold text-navy-900">{store.address}</p>}
              <p className={store.address ? "" : "font-semibold text-navy-900"}>{storeLocationLabel}</p>
              <p className="mt-1 text-sm text-slate-600">GPS: {formatCoordinates()}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "accent" })}
            >
              <Navigation className="size-4" aria-hidden="true" />
              Get Directions
              <NewTabNote />
            </a>
            <a
              href={getMapViewUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "outline" })}
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              View Location
              <NewTabNote />
            </a>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:text-navy-900 hover:underline"
          >
            Contact &amp; location details
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <GoogleMapEmbed />
      </div>
    </section>
  );
}
