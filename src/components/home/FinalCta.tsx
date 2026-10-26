import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hasDirectContact } from "@/lib/contact";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { ContactActions } from "@/components/shared/ContactActions";

export function FinalCta() {
  const canContact = hasDirectContact();

  return (
    <section aria-labelledby="cta-heading" className="bg-cream-50 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="on-dark relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-navy-600)_0,transparent_55%)] opacity-70"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-heading" className="font-display text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              Looking for Something Specific?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-100">
              {canContact
                ? "Browse the catalog, then get in touch to ask about prices and availability — or visit us in Okara."
                : "Browse the catalog, then visit us in Okara to ask about prices and availability. Directions are one tap away."}
            </p>
            <ContactActions
              tone="dark"
              primaryDirections={false}
              className="mt-8 justify-center"
              leading={
                <Link href="/products" className={buttonStyles({ variant: "accent" })}>
                  Explore Products
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
