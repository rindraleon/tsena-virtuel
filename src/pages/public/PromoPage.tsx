import { useTitle } from '../../hooks';
import { useState } from 'react';
import { Tag, Percent, Flame, Zap } from 'lucide-react';
import { mockProducts } from '../../shared/data/mockData';
import ProductCard from '../../components/product/ProductCard';

type TabKey = 'promos' | 'flash' | 'new' | 'best';

export default function PromoPage() {
  useTitle('Promotions');
  const [activeTab, setActiveTab] = useState<TabKey>('promos');

  const promoProducts = mockProducts.filter((p) => p.discount && p.discount > 0 && p.status === 'active');
  const flashProducts = promoProducts.slice(0, 6);
  const newProducts = mockProducts.filter((p) => p.status === 'active').slice(0, 8);
  const bestProducts = [...mockProducts.filter((p) => p.status === 'active')].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'promos', label: 'Promotions', icon: Tag },
    { key: 'flash', label: 'Vente Flash', icon: Flame },
    { key: 'new', label: 'Nouveautés', icon: Zap },
    { key: 'best', label: 'Meilleures ventes', icon: Percent },
  ];

  const products = activeTab === 'promos' ? promoProducts
    : activeTab === 'flash' ? flashProducts
    : activeTab === 'new' ? newProducts
    : bestProducts;

  const titles: Record<TabKey, string> = {
    promos: 'Toutes les promotions',
    flash: 'Vente Flash — Offres limitées !',
    new: 'Nouveautés',
    best: 'Meilleures ventes',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-primary mb-6">Offres spéciales</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeTab === tab.key ? 'bg-primary text-white' : 'bg-surface border border-border text-text hover:bg-surface-hover'
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      <h2 className="text-lg font-bold text-text mb-4">{titles[activeTab]}</h2>

      {products.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-10 text-center text-muted">Aucun produit disponible dans cette catégorie.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
