import { useTitle } from '../../hooks';
import { useDataList } from '../../hooks/useDataList';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { mockProducts, mockFavorites } from '../../shared/data/mockData';
import { useState } from 'react';

export default function FavoritesPage() {
  useTitle('Mes favoris');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [showSearch, setShowSearch] = useState(false);

  const userFavorites = mockFavorites
    .filter((f) => f.userId === user?.id)
    .map((f) => mockProducts.find((p) => p.id === f.productId))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const {
    search,
    setSearch,
    currentPage,
    setPage,
    paginatedData,
    totalPages,
    totalItems,
    canGoNext,
    canGoPrevious,
  } = useDataList({
    data: userFavorites,
    searchFields: ['name' as const, 'category' as const],
    itemsPerPage: 10,
  });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in-up">
        <Heart size={64} className="mx-auto text-muted mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">Connectez-vous pour voir vos favoris</h1>
        <p className="text-muted mb-6">Créez un compte ou connectez-vous pour sauvegarder vos produits préférés.</p>
        <Link to="/connexion" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
          Se connecter
        </Link>
      </div>
    );
  }

  if (userFavorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in-up">
        <Heart size={64} className="mx-auto text-muted mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">Aucun favori</h1>
        <p className="text-muted mb-6">Ajoutez des produits à vos favoris pour les retrouver facilement.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
          <ArrowLeft size={18} /> Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary">Mes favoris ({userFavorites.length})</h1>

        <div className="flex items-center gap-3">
          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className={`sm:hidden flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
              showSearch ? 'border-primary text-primary bg-primary/5' : 'border-border text-text'
            }`}
            aria-label="Rechercher"
          >
            <Search size={16} />
          </button>

          {/* Desktop search */}
          {userFavorites.length > 5 && (
            <div className="hidden sm:block relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher dans mes favoris..."
                className="w-64 pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface"
                aria-label="Rechercher dans mes favoris"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                  aria-label="Effacer la recherche"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile search */}
      {showSearch && (
        <div className="relative sm:hidden mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher dans mes favoris..."
            className="w-full pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface"
            aria-label="Rechercher dans mes favoris"
          />
        </div>
      )}

      {paginatedData.length === 0 ? (
        <div className="text-center py-10 text-muted">
          Aucun favori trouvé pour cette recherche.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {paginatedData.map((product) => (
            <div key={product.id} className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group animate-fade-in-up">
              <Link to={`/produits/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" width={200} height={200} />
                </div>
              </Link>
              <div className="p-3">
                <Link to={`/produits/${product.id}`} className="block">
                  <h3 className="text-sm font-medium text-text line-clamp-2 hover:text-primary">{product.name}</h3>
                </Link>
                <p className="text-sm font-bold text-primary mt-1">{product.price.toLocaleString('fr-FR')} PKR</p>
                {product.stock === 0 ? (
                  <p className="text-xs text-danger mt-2 font-medium">Rupture de stock</p>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-semibold py-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <ShoppingCart size={14} /> Ajouter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 pt-6">
          <span className="text-xs text-muted hidden sm:block">
            {totalItems} favori{totalItems > 1 ? 's' : ''}
          </span>
          <nav className="flex items-center gap-1 ml-auto" aria-label="Pagination">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={!canGoPrevious}
              className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Première page"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={!canGoPrevious}
              className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Page précédente"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-medium text-text px-2">{currentPage} / {totalPages}</span>
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={!canGoNext}
              className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Page suivante"
            >
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={!canGoNext}
              className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Dernière page"
            >
              <ChevronsRight size={16} />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
