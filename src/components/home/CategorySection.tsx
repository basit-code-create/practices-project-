import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/products/CategoryCard";

export function CategorySection() {
  return (
    <section aria-labelledby="categories-heading" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="categories-heading"
          eyebrow="Browse our categories"
          title="Explore Our Products"
          description="Choose a category to see the products we offer. Each category has its own page with a quick search."
          align="center"
        />
        <ul role="list" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.slug}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
