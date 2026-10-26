import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { buttonStyles } from "@/components/shared/buttonStyles";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";

export function FeaturedProducts() {
  const featured = getFeaturedProducts(8);
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="featured-heading"
          eyebrow="Popular picks"
          title="Featured Products"
          description="A few everyday essentials from both sides of the shop. Ask us about current prices and availability."
          action={
            <Link href="/products" className={buttonStyles({ variant: "outline" })}>
              View All Products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </div>
    </section>
  );
}
