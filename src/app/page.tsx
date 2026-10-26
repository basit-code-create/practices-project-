import { AboutPreview } from "@/components/home/AboutPreview";
import { BindingSection } from "@/components/home/BindingSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FinalCta } from "@/components/home/FinalCta";
import { GroupOverview } from "@/components/home/GroupOverview";
import { HeroSection } from "@/components/home/HeroSection";
import { LocationSection } from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <GroupOverview group="stationery" />
      <GroupOverview group="electrical" />
      <BindingSection />
      <AboutPreview />
      <LocationSection />
      <FinalCta />
    </>
  );
}
