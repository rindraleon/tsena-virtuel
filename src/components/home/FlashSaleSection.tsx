import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import CountdownTimer from '../common/CountdownTimer';
import ProductCard from '../product/ProductCard';
import Reveal from '../common/Reveal';
import { flashSaleProducts } from '../../data/products';

export default function FlashSaleSection() {
  const endDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

  return (
    <section className="py-8 md:py-12" aria-label="Vente flash">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <Reveal direction="up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary">
                <Zap className="text-accent" size={24} aria-hidden="true" />
                Vente Flash
              </h2>
              <p className="text-muted text-sm mt-1">Offres à durée limitée</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <CountdownTimer endDate={endDate} />
              <Link
                to="/promotions"
                className="text-sm font-semibold text-primary hover:text-primary-light transition-colors flex items-center gap-1 group"
              >
                Voir toutes les offres
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {flashSaleProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
