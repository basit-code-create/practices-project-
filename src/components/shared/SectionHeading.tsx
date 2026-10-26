import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  as: Heading = "h2",
  tone = "light",
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <p
            className={cn(
              "text-sm font-semibold uppercase tracking-[0.14em]",
              tone === "dark" ? "text-amber-300" : "text-amber-800",
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading
          id={id}
          className={cn(
            "font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl",
            eyebrow && "mt-2",
            tone === "dark" ? "text-white" : "text-navy-900",
          )}
        >
          {title}
        </Heading>
        {description && (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-pretty sm:text-lg",
              tone === "dark" ? "text-navy-100" : "text-slate-600",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
