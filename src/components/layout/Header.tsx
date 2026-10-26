import { Navigation, Phone } from "lucide-react";
import { getContactChannels } from "@/lib/contact";
import { getDirectionsUrl } from "@/lib/maps";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { NewTabNote } from "@/components/shared/NewTabNote";
import { DesktopNavigation } from "./DesktopNavigation";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const { phone } = getContactChannels();

  return (
    // Solid background on purpose: a backdrop-filter here would trap the mobile
    // menu's fixed-position backdrop inside the header.
    <header className="sticky top-0 z-40 border-b border-navy-100/80 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />
        <DesktopNavigation className="hidden lg:block" />
        <div className="hidden items-center gap-2 lg:flex">
          {phone && (
            <a href={phone.href} className={buttonStyles({ variant: "outline", size: "sm" })}>
              <Phone className="size-4" aria-hidden="true" />
              Call
              <span className="sr-only"> {phone.display}</span>
            </a>
          )}
          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            <Navigation className="size-4" aria-hidden="true" />
            Get Directions
            <NewTabNote />
          </a>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
