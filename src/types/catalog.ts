/**
 * Shared types for the product catalog.
 *
 * Category and product data live in `src/data/categories.ts` and
 * `src/data/products.ts`. These types keep the two files in sync: TypeScript
 * reports an error if a product points at a category slug that does not exist.
 */

/** The two sides of the business. Used for colours, grouping and navigation. */
export type CategoryGroup = "stationery" | "electrical";

/**
 * Every category slug used on the website. The slug is also the URL:
 * `/categories/<slug>`. When adding a category, add its slug here first.
 */
export type CategorySlug =
  | "copies-notebooks"
  | "registers"
  | "writing-supplies"
  | "school-supplies"
  | "office-stationery"
  | "electrical-lighting"
  | "switches-accessories"
  | "wires-cables"
  | "electrical-accessories";

/**
 * Icon shown on a product card when the product has no photo.
 * The icon artwork for each name is defined in
 * `src/components/products/ProductIcon.tsx`.
 */
export type ProductIconName =
  | "backpack"
  | "book-copy"
  | "book-marked"
  | "book-open"
  | "book-text"
  | "briefcase"
  | "cable"
  | "calculator"
  | "circle-dot"
  | "clipboard-list"
  | "disc"
  | "drafting-compass"
  | "droplet"
  | "eraser"
  | "file-text"
  | "files"
  | "folder"
  | "glass-water"
  | "grid"
  | "highlighter"
  | "lamp"
  | "lamp-ceiling"
  | "layers"
  | "lightbulb"
  | "link"
  | "list-ordered"
  | "mail"
  | "moon"
  | "notebook"
  | "notebook-pen"
  | "notebook-text"
  | "package"
  | "palette"
  | "paperclip"
  | "pen"
  | "pen-line"
  | "pen-tool"
  | "pencil"
  | "pencil-ruler"
  | "pin"
  | "plug"
  | "plug-zap"
  | "power"
  | "receipt"
  | "ruler"
  | "sandwich"
  | "school"
  | "scissors"
  | "shapes"
  | "shield"
  | "sparkles"
  | "spline"
  | "sticky-note"
  | "toggle"
  | "triangle-right"
  | "unplug"
  | "users"
  | "wrench"
  | "zap";

export interface Category {
  /** Unique URL-friendly identifier, e.g. "copies-notebooks". */
  slug: CategorySlug;
  /** Display name, e.g. "Copies & Notebooks". */
  name: string;
  group: CategoryGroup;
  /** One or two sentences shown on category cards. */
  description: string;
  /** Longer introduction shown at the top of the category page. */
  longDescription: string;
  /** Representative image, relative to the `public` folder. */
  image: string;
  /** Text alternative for `image`. */
  imageAlt: string;
  /** Icon used for products in this category that have no icon or photo. */
  icon: ProductIconName;
}

export interface Product {
  /** Unique, stable identifier. */
  id: string;
  /** Unique URL-friendly name, used for links such as `#product-<slug>`. */
  slug: string;
  name: string;
  /** Must match the slug of a category in `src/data/categories.ts`. */
  categorySlug: CategorySlug;
  description: string;
  /**
   * Optional product photo, relative to the `public` folder
   * (e.g. "/images/products/a4-paper.jpg"). When omitted, the product icon
   * is shown instead.
   */
  image?: string;
  /** Icon shown when there is no photo. Defaults to the category icon. */
  icon?: ProductIconName;
  /**
   * Verified price in Pakistani Rupees. Leave this out until the owner has
   * confirmed it — the website then shows "Contact for Price".
   */
  price?: number;
  currency?: "PKR";
  /** Show this product in the homepage "Featured Products" section. */
  featured?: boolean;
  /** Extra words customers might search for (alternative names, Urdu terms). */
  keywords?: string[];
}
