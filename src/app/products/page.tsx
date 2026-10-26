import { products } from "@/data/products";
import { store } from "@/data/store";
import { pageMetadata } from "@/lib/metadata";
import { CatalogNotice } from "@/components/shared/CatalogNotice";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductCatalog } from "@/components/products/ProductCatalog";

export const metadata = pageMetadata({
  title: "All Products",
  description: `Browse the full catalog at ${store.name} in Okara — copies and notebooks, registers, writing and school supplies, office stationery, bulbs, switches, wires and electrical accessories.`,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="All Products"
        eyebrow="Product catalog"
        description="Search the complete catalog or filter by category to find stationery, school and office supplies, and electrical essentials."
        breadcrumbs={[{ label: "Products" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <CatalogNotice className="mb-8" />
        <ProductCatalog products={products} />
      </div>
    </>
  );
}
