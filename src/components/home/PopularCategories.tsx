import { motion } from 'framer-motion';
import CategoryCard from '../category/CategoryCard';
import { useCategoriesBridge } from '../../hooks/queries/useBridge';
import Skeleton from '../common/Skeleton';

export default function PopularCategories() {
  const { data, isLoading } = useCategoriesBridge();
  const categories = data?.items || [];

  // Mapper les catégories API vers le format attendu par CategoryCard
  const mappedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.iconUrl || cat.imageUrl || '',
    slug: cat.slug,
    productCount: cat.productCount,
    status: cat.isActive ? 'active' as const : 'inactive' as const,
  }));

  return (
    <section className="py-8 md:py-12" aria-label="Catégories populaires">
      <div className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0 w-28">
                <Skeleton className="w-28 h-28 rounded-full mx-auto" />
                <Skeleton className="h-4 w-20 mx-auto mt-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-2 scrollbar-hide -mx-4 px-4">
            {mappedCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
