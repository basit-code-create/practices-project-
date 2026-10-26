"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Menu, Navigation, X } from "lucide-react";
import { getDirectionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { NewTabNote } from "@/components/shared/NewTabNote";
import { ActiveNavList } from "./ActiveNavList";
import { NavList } from "./NavList";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-900 transition-colors hover:bg-navy-50"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {/* Backdrop: tapping outside the menu closes it */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 bg-navy-950/30 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full border-b border-navy-100 bg-white shadow-lg transition duration-200",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 pt-3 pb-6 sm:px-6">
          <Suspense fallback={<NavList pathname={null} variant="mobile" onNavigate={close} />}>
            <ActiveNavList variant="mobile" onNavigate={close} />
          </Suspense>
          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={buttonStyles({ variant: "primary", size: "lg", className: "mt-4 w-full" })}
          >
            <Navigation className="size-4" aria-hidden="true" />
            Get Directions
            <NewTabNote />
          </a>
        </nav>
      </div>
    </div>
  );
}
