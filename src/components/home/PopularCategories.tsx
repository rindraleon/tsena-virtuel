import { motion } from 'framer-motion';
import CategoryCard from '../category/CategoryCard';
import { popularCategories } from '../../data/categories';

export default function PopularCategories() {
  return (
    <section className="py-8 md:py-12" aria-label="Catégories populaires">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-2 scrollbar-hide -mx-4 px-4">
          {popularCategories.map((category, idx) => (
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
      </div>
    </section>
  );
}
