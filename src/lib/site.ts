import { store } from "@/data/store";

function withoutTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * The production domain, only when it has been explicitly configured
 * (NEXT_PUBLIC_SITE_URL or `store.siteUrl`). Canonical links use this, so
 * no unconfirmed domain is ever published as canonical.
 */
export function getConfiguredSiteUrl(): string | undefined {
  return store.siteUrl ? withoutTrailingSlash(store.siteUrl) : undefined;
}

/**
 * Base URL for absolute links (sitemap, robots, social previews).
 * Prefers the configured domain, then the domain Vercel assigns to the
 * production deployment, then the local development server.
 */
export function getBaseUrl(): string {
  const configured = getConfiguredSiteUrl();
  if (configured) return configured;
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;
  const vercelDeployment = process.env.VERCEL_URL;
  if (vercelDeployment) return `https://${vercelDeployment}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/** Canonical link for a page, or undefined when no domain is configured. */
export function canonical(path: string): { canonical: string } | undefined {
  const site = getConfiguredSiteUrl();
  return site ? { canonical: `${site}${path === "/" ? "" : path}` } : undefined;
}
