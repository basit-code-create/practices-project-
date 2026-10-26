"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import type { CategorySlug } from "@/types/catalog";
import { categories, categoryGroups, getCategoriesByGroup } from "@/data/categories";
import { cn } from "@/lib/utils";

export type CategoryFilterValue = CategorySlug | "all";

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
  counts: Record<CategorySlug, number>;
  total: number;
  /** "list" is the sidebar on large screens; "select" is the compact dropdown on small screens. */
  variant: "list" | "select";
  className?: string;
}

function FilterOption({
  name,
  value,
  checked,
  label,
  count,
  onSelect,
}: {
  name: string;
  value: CategoryFilterValue;
  checked: boolean;
  label: string;
  count: number;
  onSelect: (value: CategoryFilterValue) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy-600",
        checked ? "bg-navy-800 font-semibold text-white" : "text-slate-700 hover:bg-navy-50",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      <span>{label}</span>
      <span
        className={cn(
          "min-w-7 rounded-full px-2 py-0.5 text-center text-xs font-semibold",
          checked ? "bg-white/15 text-white" : "bg-navy-50 text-navy-700",
        )}
      >
        {count}
      </span>
    </label>
  );
}

export function CategoryFilter({ value, onChange, counts, total, variant, className }: CategoryFilterProps) {
  const id = useId();

  if (variant === "select") {
    return (
      <div className={cn("relative", className)}>
        <label htmlFor={id} className="sr-only">
          Filter by category
        </label>
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as CategoryFilterValue)}
          className="h-12 w-full appearance-none rounded-full border border-navy-200 bg-white pr-11 pl-5 text-base font-medium text-navy-900 shadow-sm focus:border-navy-500"
        >
          <option value="all">All categories ({total})</option>
          {(["stationery", "electrical"] as const).map((group) => (
            <optgroup key={group} label={categoryGroups[group].label}>
              {getCategoriesByGroup(group).map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name} ({counts[category.slug]})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <fieldset className={className}>
      <legend className="font-display text-base font-semibold text-navy-900">Categories</legend>
      <div className="mt-3 space-y-1">
        <FilterOption
          name={id}
          value="all"
          checked={value === "all"}
          label="All categories"
          count={total}
          onSelect={onChange}
        />
      </div>
      {(["stationery", "electrical"] as const).map((group) => (
        <div key={group} className="mt-5">
          <p className="px-3 text-xs font-semibold tracking-[0.14em] text-amber-800 uppercase">
            {categoryGroups[group].label}
          </p>
          <div className="mt-2 space-y-1">
            {categories
              .filter((category) => category.group === group)
              .map((category) => (
                <FilterOption
                  key={category.slug}
                  name={id}
                  value={category.slug}
                  checked={value === category.slug}
                  label={category.name}
                  count={counts[category.slug]}
                  onSelect={onChange}
                />
              ))}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
