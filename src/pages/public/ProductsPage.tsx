import { useTitle } from '../../hooks';
import { useState } from 'react';
import { SlidersHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useProductsBridge, useCategoriesBridge, apiProductToProductLike } from '../../hooks/queries/useBridge';
import ProductCard from '../../components/product/ProductCard';
import SearchInput from '../../shared/components/SearchInput';
import Skeleton from '../../components/common/Skeleton';

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'discount';

export default function ProductsPage() {
  useTitle('Tous nos produits');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortKey>('relevance');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [page, setPage] = useState(1);

  // Hooks API avec fallback mocks
  const { data: productsData, isLoading } = useProductsBridge({
    search: search || undefined,
    categoryId: category !== 'all' ? category : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    inStock: onlyInStock || undefined,
    sortBy: sort === 'price-asc' ? 'price' : sort === 'price-desc' ? 'price' : sort === 'newest' ? 'createdAt' : undefined,
    order: sort === 'price-asc' ? 'ASC' : 'DESC',
    page,
    limit: 12,
  });

  const { data: categoriesData } = useCategoriesBridge();

  const products = productsData?.items || [];
  const meta = productsData?.meta;
  const categories = categoriesData?.items || [];
  const totalPages = meta?.totalPages || 1;

  // Reset page when filters change
  const handleSearch = (value: string) => { setSearch(value); setPage(1); };
  const handleCategory = (value: string) => { setCategory(value); setPage(1); };

  const resetAll = () => {
    setSearch('');
    setCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setOnlyPromo(false);
    setOnlyInStock(false);
    setSort('relevance');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-primary mb-2">Tous nos produits</h1>
      <p className="text-muted text-sm mb-6">
        {meta?.total || products.length} produit{(meta?.total || products.length) > 1 ? 's' : ''} trouvé{(meta?.total || products.length) > 1 ? 's' : ''}
        {productsData?.source === 'mock' && (
          <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">Mode démo</span>
        )}
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="lg:w-[240px] shrink-0">
          <div className="bg-surface rounded-xl border border-border p-5 space-y-5 sticky top-20">
            <h2 className="font-semibold text-text flex items-center gap-2"><SlidersHorizontal size={16} /> Filtres</h2>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Recherche</label>
              <SearchInput value={search} onChange={handleSearch} placeholder="Nom du produit..." />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Catégorie</label>
              <select value={category} onChange={(e) => handleCategory(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                <option value="all">Toutes les catégories</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">Prix (Ar)</label>
              <div className="flex gap-2">
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={onlyPromo} onChange={(e) => setOnlyPromo(e.target.checked)} className="rounded border-border text-primary" />
                En promotion
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} className="rounded border-border text-primary" />
                En stock
              </label>
            </div>

            <button type="button" onClick={resetAll} className="w-full text-sm text-primary font-medium hover:underline">
              Réinitialiser les filtres
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Sort */}
          <div className="flex items-center justify-between mb-4 bg-surface rounded-xl border border-border px-4 py-3">
            <span className="text-sm text-muted">Trier par :</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="text-sm font-medium text-text bg-transparent focus:outline-none cursor-pointer">
              <option value="relevance">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
              <option value="discount">Plus grosse réduction</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-surface rounded-xl border border-border overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-surface rounded-xl border border-border p-10 text-center text-muted">
              Aucun produit ne correspond à votre recherche.
              <button type="button" onClick={resetAll} className="block mx-auto mt-3 text-sm text-primary font-medium hover:underline">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => {
                  const productLike = apiProductToProductLike(product);
                  return <ProductCard key={product.id} product={productLike} />;
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-4 pt-6">
                  <span className="text-xs text-muted hidden sm:block">
                    Page {page} sur {totalPages}
                  </span>
                  <nav className="flex items-center gap-1 ml-auto" aria-label="Pagination">
                    <button
                      type="button"
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                      className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Première page"
                    >
                      <ChevronsLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Page précédente"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-medium text-text px-2">{page} / {totalPages}</span>
                    <button
                      type="button"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages}
                      className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Page suivante"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage(totalPages)}
                      disabled={page >= totalPages}
                      className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Dernière page"
                    >
                      <ChevronsRight size={16} />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
