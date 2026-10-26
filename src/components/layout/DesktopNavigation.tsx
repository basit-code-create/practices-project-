import { Suspense } from "react";
import { ActiveNavList } from "./ActiveNavList";
import { NavList } from "./NavList";

export function DesktopNavigation({ className }: { className?: string }) {
  return (
    <nav aria-label="Main" className={className}>
      <Suspense fallback={<NavList pathname={null} variant="desktop" />}>
        <ActiveNavList variant="desktop" />
      </Suspense>
    </nav>
  );
}
