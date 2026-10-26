import { categories } from "./categories";

export interface NavigationItem {
  href: string;
  label: string;
}

export const mainNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const categoryPaths = new Set(categories.map((category) => `/categories/${category.slug}`));

/** Whether a navigation item should be shown as the current page. */
export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/products") return pathname === "/products" || categoryPaths.has(pathname);
  return pathname === href || pathname.startsWith(`${href}/`);
}
