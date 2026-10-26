import type { ReactNode } from "react";
import { Mail, MessageCircle, Navigation, Phone } from "lucide-react";
import { generalEnquiryMessage, getContactChannels, getWhatsAppHref } from "@/lib/contact";
import { getDirectionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./buttonStyles";
import { NewTabNote } from "./NewTabNote";

interface ContactActionsProps {
  /** Prefilled WhatsApp message. */
  message?: string;
  /** Use light-on-dark button styles. */
  tone?: "light" | "dark";
  /**
   * Highlight "Get Directions" when no phone or WhatsApp is configured.
   * Turn off when another primary button sits next to these actions.
   */
  primaryDirections?: boolean;
  /** Extra buttons placed before or after the contact buttons, in the same row. */
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

/**
 * Buttons for every configured contact channel. Channels that are not set in
 * src/data/store.ts are hidden; "Get Directions" always works because the
 * shop coordinates are known.
 */
export function ContactActions({
  message = generalEnquiryMessage,
  tone = "light",
  primaryDirections = true,
  leading,
  trailing,
  className,
}: ContactActionsProps) {
  const { phone, whatsapp, email } = getContactChannels();
  const onDark = tone === "dark";
  const secondary = onDark ? "outlineLight" : "outline";
  const directionsVariant = primaryDirections && !phone && !whatsapp ? "accent" : secondary;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {leading}
      {whatsapp && (
        <a
          href={getWhatsAppHref(whatsapp.digits, message)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "whatsapp" })}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
          <NewTabNote />
        </a>
      )}
      {phone && (
        <a href={phone.href} className={buttonStyles({ variant: onDark ? "light" : "primary" })}>
          <Phone className="size-4" aria-hidden="true" />
          Call {phone.display}
        </a>
      )}
      {email && (
        <a href={email.href} className={buttonStyles({ variant: secondary })}>
          <Mail className="size-4" aria-hidden="true" />
          Email Us
        </a>
      )}
      <a
        href={getDirectionsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles({ variant: directionsVariant })}
      >
        <Navigation className="size-4" aria-hidden="true" />
        Get Directions
        <NewTabNote />
      </a>
      {trailing}
    </div>
  );
}
