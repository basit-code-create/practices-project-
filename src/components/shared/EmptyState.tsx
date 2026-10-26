import type { ReactNode } from "react";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-navy-200 bg-white px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-navy-50 text-navy-600">
        <PackageSearch className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">{description}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
