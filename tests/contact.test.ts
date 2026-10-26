import { describe, expect, it } from "vitest";
import {
  formatDays,
  formatOpeningHours,
  formatPhoneDisplay,
  formatTime,
  getPhoneHref,
  getProductEnquiryMessage,
  getWhatsAppHref,
  isValidEmail,
  normalizePhone,
} from "@/lib/contact";

describe("normalizePhone", () => {
  it.each([
    ["+92 300 1234567", "923001234567"],
    ["+92-300-1234567", "923001234567"],
    ["03001234567", "923001234567"],
    ["0300-1234567", "923001234567"],
    ["0092 300 1234567", "923001234567"],
    ["(0300) 123 4567", "923001234567"],
  ])("normalises %s", (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it.each([undefined, null, "", "0300-12", "+92 300", "92300123", "+92 300 12345678", "call us", "0300 123 456x"])(
    "rejects incomplete or invalid number %s",
    (input) => {
      expect(normalizePhone(input)).toBeNull();
    },
  );
});

describe("contact links", () => {
  it("formats Pakistani numbers for display", () => {
    expect(formatPhoneDisplay("923001234567")).toBe("+92 300 1234567");
  });

  it("creates tel: links in international format", () => {
    expect(getPhoneHref("923001234567")).toBe("tel:+923001234567");
  });

  it("creates WhatsApp links with an encoded message", () => {
    expect(getWhatsAppHref("923001234567", 'Price of "A4 Paper" & pens?')).toBe(
      "https://wa.me/923001234567?text=Price%20of%20%22A4%20Paper%22%20%26%20pens%3F",
    );
    expect(getWhatsAppHref("923001234567")).toBe("https://wa.me/923001234567");
  });

  it("names the product in enquiry messages", () => {
    const message = getProductEnquiryMessage("LED Bulbs", "Electrical Bulbs & Lighting");
    expect(message).toContain('"LED Bulbs"');
    expect(message).toContain("Electrical Bulbs & Lighting");
  });

  it("validates email addresses", () => {
    expect(isValidEmail("shop@example.com")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });
});

describe("opening hours", () => {
  it("formats consecutive and separate days", () => {
    expect(formatDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])).toBe(
      "Monday – Saturday",
    );
    expect(formatDays(["Sunday"])).toBe("Sunday");
    expect(formatDays(["Friday", "Monday"])).toBe("Monday, Friday");
  });

  it("formats 24-hour times as 12-hour times", () => {
    expect(formatTime("09:00")).toBe("9:00 AM");
    expect(formatTime("12:30")).toBe("12:30 PM");
    expect(formatTime("21:00")).toBe("9:00 PM");
    expect(formatTime("00:15")).toBe("12:15 AM");
  });

  it("formats configured hours", () => {
    expect(formatOpeningHours([{ days: ["Monday", "Tuesday"], opens: "09:00", closes: "20:00" }])).toEqual([
      { days: "Monday – Tuesday", hours: "9:00 AM – 8:00 PM" },
    ]);
    expect(formatOpeningHours([])).toEqual([]);
  });
});
