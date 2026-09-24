import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PromoCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly discount?: string;
  readonly bgClass: string;
  readonly textClass: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly className?: string;
}

function PromoCard({ title, subtitle, discount, bgClass, textClass, image, imageAlt, className = '' }: PromoCardProps) {
  const lines = title.split('\n');
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl ${bgClass} ${className} group cursor-pointer`}
      whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-5 md:p-6 h-full flex flex-col justify-between min-h-[180px] md:min-h-[220px]">
        <div>
          <div className={`${textClass} font-bold text-lg md:text-2xl leading-tight`}>
            {lines.map((line, lineIndex) => (
              <span key={`line-${lineIndex}`}>{line}<br /></span>
            ))}
          </div>
          <div className={`${textClass} font-bold text-base md:text-lg mt-1`}>{subtitle}</div>
          {discount && <div className="text-sm text-muted mt-1">{discount}</div>}
        </div>
        <motion.button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all mt-3 cursor-pointer"
          whileHover={{ x: 4 }}
        >
          Découvrir <ChevronRight size={14} aria-hidden="true" />
        </motion.button>
      </div>
      {/* Decorative image */}
      <motion.div
        className="absolute right-0 bottom-0 w-32 md:w-44 h-32 md:h-44 opacity-20 group-hover:opacity-30 transition-opacity"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ duration: 0.5 }}
      >
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
      </motion.div>
    </motion.div>
  );
}

export default function PromotionGrid() {
  return (
    <section className="py-4 md:py-8" aria-label="Promotions">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <PromoCard
              title="WEEKEND\nMEGA SOLDES"
              subtitle="Jusqu'à -50%"
              discount="Sur articles sélectionnés"
              bgClass="bg-primary lg:row-span-1"
              textClass="text-white"
              image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop"
              imageAlt="Méga soldes"
              className="md:col-span-1 lg:col-span-2"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <PromoCard
              title="ÉPICERIE\nEssentiels"
              subtitle="Jusqu'à -30%"
              bgClass="bg-green-50"
              textClass="text-primary"
              image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop"
              imageAlt="Essentiels épicerie"
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <PromoCard
              title="ÉLECTRONIQUE\nMeilleures offres"
              subtitle="Jusqu'à -40%"
              bgClass="bg-blue-50"
              textClass="text-primary"
              image="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop"
              imageAlt="Offres électronique"
              className="min-h-[160px]"
            />
            <PromoCard
              title="MODE\nNouvelle collection"
              subtitle="Jusqu'à -50%"
              bgClass="bg-pink-50"
              textClass="text-primary"
              image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
              imageAlt="Collection mode"
              className="min-h-[160px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
