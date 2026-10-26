import type { Category, CategoryGroup, ProductIconName } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { ProductIcon } from "./ProductIcon";

const groupStyles: Record<CategoryGroup, { panel: string; dots: string; icon: string }> = {
  stationery: {
    panel: "bg-amber-50",
    dots: "bg-[radial-gradient(var(--color-amber-200)_1.2px,transparent_1.2px)]",
    icon: "text-amber-700",
  },
  electrical: {
    panel: "bg-navy-50",
    dots: "bg-[radial-gradient(var(--color-navy-200)_1.2px,transparent_1.2px)]",
    icon: "text-navy-600",
  },
};

/** Patterned tile with the product icon. Used when there is no photo or a photo fails. */
export function IconTile({ icon, group, className }: { icon: ProductIconName; group: CategoryGroup; className?: string }) {
  const style = groupStyles[group];
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", style.panel, className)}>
      <div className={cn("absolute inset-0 bg-size-[18px_18px] opacity-70", style.dots)} aria-hidden="true" />
      <span className="relative flex size-14 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5 sm:size-20 sm:rounded-2xl">
        <ProductIcon name={icon} className={cn("size-7 sm:size-10", style.icon)} />
      </span>
    </div>
  );
}

interface ProductVisualProps {
  image?: string;
  imageAlt: string;
  icon: ProductIconName;
  category: Category;
  sizes?: string;
}

export function ProductVisual({ image, imageAlt, icon, category, sizes }: ProductVisualProps) {
  const tile = <IconTile icon={icon} group={category.group} />;
  return (
    // Narrow strip beside the text on phones; full-width image above it from `sm` up.
    <div className="relative w-24 shrink-0 overflow-hidden sm:aspect-[3/2] sm:w-auto">
      {image ? (
        <FallbackImage
          src={image}
          alt={imageAlt}
          fill
          sizes={sizes ?? "(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 6rem"}
          className="object-cover"
          fallback={tile}
        />
      ) : (
        tile
      )}
    </div>
  );
}
