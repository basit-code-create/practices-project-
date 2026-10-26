import Link from "next/link";
import { MessageCircle, Phone, Store } from "lucide-react";
import type { Category, Product } from "@/types/catalog";
import { getContactChannels, getProductEnquiryMessage, getWhatsAppHref } from "@/lib/contact";
import { NewTabNote } from "@/components/shared/NewTabNote";

const actionClass =
  "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors";

/**
 * Enquiry action for a product. Uses WhatsApp (with the product named in the
 * message) or phone when configured; otherwise links to the contact page.
 */
export function ProductEnquiry({ product, category }: { product: Product; category: Category }) {
  const { whatsapp, phone } = getContactChannels();

  if (whatsapp) {
    return (
      <a
        href={getWhatsAppHref(whatsapp.digits, getProductEnquiryMessage(product.name, category.name))}
        target="_blank"
        rel="noopener noreferrer"
        className={`${actionClass} bg-[#075E54] text-white hover:bg-[#0a6b60]`}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Ask on WhatsApp
        <span className="sr-only"> about {product.name}</span>
        <NewTabNote />
      </a>
    );
  }

  if (phone) {
    return (
      <a href={phone.href} className={`${actionClass} bg-navy-800 text-white hover:bg-navy-700`}>
        <Phone className="size-4" aria-hidden="true" />
        Call to Ask
        <span className="sr-only"> about {product.name}</span>
      </a>
    );
  }

  return (
    <Link
      href="/contact"
      className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900 hover:underline"
    >
      <Store className="size-4" aria-hidden="true" />
      Ask in Store
      <span className="sr-only"> about {product.name}</span>
    </Link>
  );
}
