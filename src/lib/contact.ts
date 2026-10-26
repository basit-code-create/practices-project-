import { store, type DayOfWeek, type OpeningHours } from "@/data/store";

/**
 * Normalises a phone number to international digits without "+",
 * e.g. "0300-1234567" → "923001234567".
 *
 * Returns `null` when the number is missing or incomplete, so the website
 * never shows a call or WhatsApp button for a number that cannot work.
 */
export function normalizePhone(input: string | undefined | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!/^\+?[\d\s\-().]+$/.test(trimmed)) return null;

  let digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (!trimmed.startsWith("+") && digits.startsWith("0") && digits.length === 11) {
    // Pakistani local format: 03001234567 → 923001234567
    digits = `92${digits.slice(1)}`;
  }

  if (digits.startsWith("92")) {
    // Pakistani numbers: country code + 10 digits.
    return digits.length === 12 ? digits : null;
  }
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

/** Readable format, e.g. "+92 300 1234567". */
export function formatPhoneDisplay(digits: string): string {
  if (digits.startsWith("92") && digits.length === 12) {
    return `+92 ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  return `+${digits}`;
}

export function getPhoneHref(digits: string): string {
  return `tel:+${digits}`;
}

export function getWhatsAppHref(digits: string, message?: string): string {
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function isValidEmail(email: string | undefined | null): email is string {
  return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export interface ContactChannels {
  phone: { digits: string; display: string; href: string } | null;
  whatsapp: { digits: string; display: string } | null;
  email: { address: string; href: string } | null;
}

/** The contact channels that are configured and valid in `store.ts`. */
export function getContactChannels(): ContactChannels {
  const phoneDigits = normalizePhone(store.phone);
  const whatsappDigits = normalizePhone(store.whatsapp);
  const email = isValidEmail(store.email) ? store.email.trim() : null;

  return {
    phone: phoneDigits
      ? { digits: phoneDigits, display: formatPhoneDisplay(phoneDigits), href: getPhoneHref(phoneDigits) }
      : null,
    whatsapp: whatsappDigits
      ? { digits: whatsappDigits, display: formatPhoneDisplay(whatsappDigits) }
      : null,
    email: email ? { address: email, href: `mailto:${email}` } : null,
  };
}

export function hasDirectContact(channels: ContactChannels = getContactChannels()): boolean {
  return Boolean(channels.phone || channels.whatsapp || channels.email);
}

/** Prefilled WhatsApp message asking about a specific product. */
export function getProductEnquiryMessage(productName: string, categoryName: string): string {
  return `Assalam-o-Alaikum! I would like to ask about the price and availability of "${productName}" (${categoryName}) at ${store.name}.`;
}

export const generalEnquiryMessage = `Assalam-o-Alaikum! I have a question for ${store.name}.`;

export const bindingEnquiryMessage = `Assalam-o-Alaikum! I would like to ask about book-binding services at ${store.name}.`;

// ─── Opening hours ──────────────────────────────────────────────────────

const weekOrder: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** "Monday – Saturday" for consecutive days, otherwise "Monday, Wednesday". */
export function formatDays(days: DayOfWeek[]): string {
  const sorted = [...days].sort((a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b));
  if (sorted.length === 0) return "";
  if (sorted.length === 1) return sorted[0];
  const indexes = sorted.map((day) => weekOrder.indexOf(day));
  const consecutive = indexes.every((value, i) => i === 0 || value === indexes[i - 1] + 1);
  return consecutive ? `${sorted[0]} – ${sorted[sorted.length - 1]}` : sorted.join(", ");
}

/** "09:00" → "9:00 AM" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatOpeningHours(hours: OpeningHours[] = store.openingHours) {
  return hours
    .filter((entry) => entry.days.length > 0)
    .map((entry) => ({
      days: formatDays(entry.days),
      hours: `${formatTime(entry.opens)} – ${formatTime(entry.closes)}`,
    }));
}
