/**
 * Central business configuration for Rajpoot Book Depo and Electric Store.
 *
 * The header, footer, contact page, map, enquiry buttons and search-engine
 * data all read from this file, so a change here updates the whole website.
 *
 * Optional details (phone, WhatsApp, address, hours, email, social links)
 * are intentionally left empty until the owner confirms them. Anything left
 * empty is simply hidden on the website — nothing breaks.
 */

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHours {
  /** Days these hours apply to, e.g. ["Monday", "Tuesday", "Wednesday"]. */
  days: DayOfWeek[];
  /** Opening time in 24-hour "HH:MM" format, e.g. "09:00". */
  opens: string;
  /** Closing time in 24-hour "HH:MM" format, e.g. "21:00". */
  closes: string;
}

export interface StoreConfig {
  name: string;
  /** Shorter name for tight spaces such as the mobile header. */
  shortName: string;
  owner: string;
  /** One-sentence summary used in search results and link previews. */
  description: string;
  location: {
    city: string;
    region: string;
    country: string;
    /** ISO country code, used in search-engine data. */
    countryCode: string;
  };
  /** Exact street address. Leave undefined until confirmed. */
  address?: string;
  /** Exact shop coordinates. The map and directions are generated from these. */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  map: {
    /** Google Maps zoom level for the embedded map (1–21). */
    zoom: number;
  };
  /**
   * Complete phone number, ideally in international format, e.g. "+92 300 1234567".
   * Incomplete numbers are ignored and no call button is shown.
   */
  phone?: string;
  /** Complete WhatsApp number in international format, e.g. "+92 300 1234567". */
  whatsapp?: string;
  email?: string;
  /** Leave empty until the owner confirms the opening hours. */
  openingHours: OpeningHours[];
  /**
   * Production website address, e.g. "https://www.example.com".
   * Used for canonical links. Set NEXT_PUBLIC_SITE_URL in Vercel or edit here.
   */
  siteUrl?: string;
  social: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  /**
   * Optional logo image in the `public` folder. When omitted, the built-in
   * text-and-icon logo is used.
   */
  logo?: {
    src: string;
    width: number;
    height: number;
  };
}

export const store: StoreConfig = {
  name: "Rajpoot Book Depo and Electric Store",
  shortName: "Rajpoot Book Depo",
  owner: "Rao Nazir Asim",
  description:
    "Stationery, school and office supplies, electrical essentials and book-binding services in Okara, Punjab, Pakistan.",
  location: {
    city: "Okara",
    region: "Punjab",
    country: "Pakistan",
    countryCode: "PK",
  },

  // Add the exact street address once confirmed, for example:
  // address: "Shop No. 1, Main Bazaar, Okara",
  address: undefined,

  coordinates: {
    latitude: 30.817865,
    longitude: 73.468005,
  },
  map: {
    zoom: 16,
  },

  // Add complete, verified numbers only, for example: "+92 300 1234567".
  phone: undefined,
  whatsapp: undefined,
  email: undefined,

  // Add verified opening hours, for example:
  // openingHours: [
  //   { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:00" },
  // ],
  openingHours: [],

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || undefined,

  // Add full profile URLs once the accounts are confirmed.
  social: {},

  logo: undefined,
};

/** "Okara, Punjab, Pakistan" */
export const storeLocationLabel = `${store.location.city}, ${store.location.region}, ${store.location.country}`;
