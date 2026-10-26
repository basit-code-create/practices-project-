import Image from "next/image";
import Link from "next/link";
import { store } from "@/data/store";
import { cn } from "@/lib/utils";

/** Book-and-lightning mark. Replace by setting `store.logo` in src/data/store.ts. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <rect width="40" height="40" rx="10" fill="#1c2f53" />
      <path d="M7 13c4-1.8 8.2-1.6 12 .6v16.2c-3.8-2.2-8-2.4-12-.6z" fill="#fff" />
      <path d="M33 13c-4-1.8-8.2-1.6-12 .6v16.2c3.8-2.2 8-2.4 12-.6z" fill="#dce5f2" />
      <path
        d="M22.6 5.5 15.2 21h5l-2.4 11.5L26 16.6h-5.1l2.9-11.1z"
        fill="#f59e0b"
        stroke="#1c2f53"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("flex min-w-0 items-center gap-3 rounded-lg", className)}>
      {store.logo ? (
        <Image src={store.logo.src} width={store.logo.width} height={store.logo.height} alt="" className="h-10 w-auto" />
      ) : (
        <LogoMark className="size-10 shrink-0" />
      )}
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tight",
            tone === "dark" ? "text-navy-900" : "text-white",
          )}
        >
          Rajpoot
        </span>
        <span
          className={cn(
            "truncate text-xs font-medium",
            tone === "dark" ? "text-slate-600" : "text-navy-100",
          )}
        >
          Book Depo and Electric Store
        </span>
      </span>
    </Link>
  );
}
