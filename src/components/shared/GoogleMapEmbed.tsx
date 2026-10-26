import { MapPin } from "lucide-react";
import { store } from "@/data/store";
import { getMapEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/** Google Map pinned to the exact shop coordinates from src/data/store.ts. */
export function GoogleMapEmbed({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy-100 bg-navy-50 shadow-sm sm:aspect-[16/11]",
        className,
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-navy-600" aria-hidden="true">
        <MapPin className="size-8" />
        <span className="text-sm font-medium">Loading map…</span>
      </div>
      <iframe
        src={getMapEmbedUrl()}
        title={`Google Map showing the location of ${store.name} in ${store.location.city}`}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
