import { NextResponse, type NextRequest } from "next/server";
import { categories } from "@/data/categories";

const knownSlugs = new Set<string>(categories.map((category) => category.slug));

/**
 * Category pages are prerendered, and an unknown slug would otherwise stream
 * the not-found page with a 200 status. Rewriting unknown slugs before
 * rendering returns a proper 404 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/categories/:slug",
};
