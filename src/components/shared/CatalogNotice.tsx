import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Honest note that the online catalog is a guide, not live stock. */
export function CatalogNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950",
        className,
      )}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
      <p>
        This catalog shows the kinds of products we usually carry. Stock, brands and prices change, so please ask at
        the shop to confirm availability and the current price. Photos are representative and may differ from the
        actual items.
      </p>
    </div>
  );
}
