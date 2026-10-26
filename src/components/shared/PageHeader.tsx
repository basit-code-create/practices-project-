import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  children?: ReactNode;
}

/** Title band at the top of inner pages, with breadcrumbs. */
export function PageHeader({ title, description, breadcrumbs, eyebrow, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-cream-200 bg-cream-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--color-cream-300)_1px,transparent_1px)] bg-size-[22px_22px] opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && (
          <p className="mt-6 text-sm font-semibold tracking-[0.14em] text-amber-800 uppercase">{eyebrow}</p>
        )}
        <h1
          className={`${eyebrow ? "mt-2" : "mt-6"} font-display text-3xl font-extrabold tracking-tight text-balance text-navy-900 sm:text-4xl lg:text-5xl`}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-pretty text-slate-600 sm:text-lg">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
