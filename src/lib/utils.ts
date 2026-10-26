/** Joins class names, skipping empty values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formats a verified price, e.g. 1250 → "Rs. 1,250". */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount).toString();
  return `Rs. ${rounded.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
