import { useTitle } from '../hooks';
import CategorySidebar from '../components/home/CategorySidebar';
import HeroSection from '../components/home/HeroSection';
import PopularCategories from '../components/home/PopularCategories';
import PromotionGrid from '../components/home/PromotionGrid';
import FlashSaleSection from '../components/home/FlashSaleSection';
import BenefitsSection from '../components/home/BenefitsSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function HomePage() {
  useTitle('Accueil');
  return (
    <>
      {/* Hero with sidebar */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4">
            <CategorySidebar />
            <div className="flex-1 min-w-0">
              <HeroSection />
            </div>
          </div>
        </div>
      </section>

      <PopularCategories />
      <PromotionGrid />
      <FlashSaleSection />
      <BenefitsSection />
      <NewsletterSection />
    </>
  );
}
