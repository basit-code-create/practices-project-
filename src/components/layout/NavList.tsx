import Link from "next/link";
import { isActivePath, mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface NavListProps {
  /** Current pathname, or null while it is not yet known (no item highlighted). */
  pathname: string | null;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

const styles = {
  desktop: {
    list: "flex items-center gap-1",
    link: "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
    active: "bg-navy-50 text-navy-900",
    idle: "text-slate-600 hover:bg-cream-100 hover:text-navy-900",
  },
  mobile: {
    list: "flex flex-col gap-1",
    link: "flex min-h-12 items-center rounded-xl px-4 text-base font-semibold",
    active: "bg-navy-50 text-navy-900",
    idle: "text-slate-700 hover:bg-cream-100",
  },
};

export function NavList({ pathname, variant, onNavigate }: NavListProps) {
  const style = styles[variant];
  return (
    <ul className={style.list}>
      {mainNavigation.map((item) => {
        const active = pathname !== null && isActivePath(item.href, pathname);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(style.link, active ? style.active : style.idle)}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
