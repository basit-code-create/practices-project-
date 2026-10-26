import { getCategoryBySlug } from "@/data/categories";
import type { CategorySlug, Product } from "@/types/catalog";

/** Turns simple English plurals into singulars so "registers" finds "Register". */
function singular(term: string): string {
  if (/(x|ch|sh|ss)es$/.test(term)) return term.slice(0, -2);
  if (term.length > 4 && term.endsWith("ies")) return `${term.slice(0, -3)}y`;
  if (term.length > 3 && term.endsWith("s") && !term.endsWith("ss")) return term.slice(0, -1);
  return term;
}

function searchableText(product: Product): string {
  const category = getCategoryBySlug(product.categorySlug);
  return [product.name, category?.name, category?.group, ...(product.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/**
 * Case-insensitive search across product names, category names and keywords.
 * Every word in the query must match.
 */
export function matchesQuery(product: Product, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const text = searchableText(product);
  return terms.every((term) => text.includes(term) || text.includes(singular(term)));
}

export function filterProducts(
  items: Product[],
  { query = "", category = "all" }: { query?: string; category?: CategorySlug | "all" },
): Product[] {
  return items.filter(
    (product) =>
      (category === "all" || product.categorySlug === category) && matchesQuery(product, query),
  );
}
