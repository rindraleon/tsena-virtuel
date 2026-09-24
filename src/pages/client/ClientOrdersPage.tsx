import { useTitle } from '../../hooks';
import { useDataList } from '../../hooks/useDataList';
import { mockOrders } from '../../shared/data/mockData';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../shared/components/StatusBadge';
import { Search, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState } from 'react';
import type { OrderStatus, OrderProduct } from '../../types';

const timelineSteps: Record<OrderStatus, number> = {
  pending: 1, confirmed: 2, processing: 3, shipped: 4, delivered: 5, cancelled: 0,
};

const statusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  processing: 'En cours',
  shipped: 'Expédié',
  delivered: 'Livré',
  cancelled: 'Annulé',
};

export default function ClientOrdersPage() {
  useTitle('Mes commandes | Client');
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const myOrders = mockOrders.filter((o) => o.userId === user?.id);

  const {
    search,
    setSearch,
    activeFilter,
    setFilter,
    currentPage,
    setPage,
    paginatedData,
    totalPages,
    totalItems,
    canGoNext,
    canGoPrevious,
    resetAll,
    hasActiveFilters,
  } = useDataList({
    data: myOrders,
    searchFields: ['id' as const],
    filterField: 'status' as const,
    initialFilter: 'all',
    itemsPerPage: 5,
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Mes commandes</h2>

      {/* Toolbar */}
      <div className="space-y-3 mb-6">
        {/* Desktop */}
        <div className="hidden sm:flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une commande..."
                className="w-64 pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface"
                aria-label="Rechercher une commande"
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
            <div className="flex gap-2 flex-wrap" role="group" aria-label="Filtrer par statut">
              {[
                { value: 'all', label: 'Toutes' },
                { value: 'pending', label: 'En attente' },
                { value: 'confirmed', label: 'Confirmées' },
                { value: 'processing', label: 'En cours' },
                { value: 'shipped', label: 'Expédiées' },
                { value: 'delivered', label: 'Livrées' },
                { value: 'cancelled', label: 'Annulées' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === opt.value ? 'bg-primary text-white' : 'bg-surface-tertiary text-text hover:bg-surface-active'
                  }`}
                  aria-pressed={activeFilter === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {hasActiveFilters && (
              <button type="button" onClick={resetAll} className="inline-flex items-center gap-1 text-xs text-muted hover:text-text">
                <X size={12} /> Réinitialiser
              </button>
            )}
          </div>
          <span className="text-sm text-muted">{totalItems} résultat{totalItems > 1 ? 's' : ''}</span>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
              showSearch ? 'border-primary text-primary bg-primary/5' : 'border-border text-text'
            }`}
            aria-label="Rechercher"
          >
            <Search size={16} />
          </button>
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
              showFilter ? 'border-primary text-primary bg-primary/5' : 'border-border text-text'
            }`}
            aria-label="Filtrer"
          >
            <span className="text-xs font-medium">
              {activeFilter !== 'all' ? statusLabels[activeFilter as OrderStatus] : 'Filtrer'}
            </span>
          </button>
          <div className="flex-1" />
          <span className="text-xs text-muted">{totalItems} résultat{totalItems > 1 ? 's' : ''}</span>
        </div>

        {showSearch && (
          <div className="relative sm:hidden">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une commande..."
              className="w-full pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface"
              aria-label="Rechercher une commande"
            />
          </div>
        )}

        {showFilter && (
          <div className="flex gap-2 flex-wrap sm:hidden">
            {[
              { value: 'all', label: 'Toutes' },
              { value: 'pending', label: 'En attente' },
              { value: 'confirmed', label: 'Confirmées' },
              { value: 'processing', label: 'En cours' },
              { value: 'shipped', label: 'Expédiées' },
              { value: 'delivered', label: 'Livrées' },
              { value: 'cancelled', label: 'Annulées' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFilter(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  activeFilter === opt.value ? 'bg-primary text-white' : 'bg-surface-tertiary text-text'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {paginatedData.length === 0 && (
          <div className="bg-surface rounded-xl border border-border p-10 text-center text-muted">
            Aucune commande trouvée
            {hasActiveFilters && (
              <button type="button" onClick={resetAll} className="block mx-auto mt-3 text-sm text-primary font-medium hover:underline">
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}
        {paginatedData.map((order) => (
          <div key={order.id} className="bg-surface rounded-xl border border-border p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <p className="font-semibold text-primary">{order.id}</p>
                <p className="text-xs text-muted">{order.date}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Products */}
            <div className="space-y-2 mb-4">
              {order.products.map((p: OrderProduct) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" width={48} height={48} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{p.name}</p>
                    <p className="text-xs text-muted">Qté : {p.quantity} × {p.price.toLocaleString('fr-FR')} PKR</p>
                  </div>
                  <span className="text-sm font-semibold">{(p.quantity * p.price).toLocaleString('fr-FR')} PKR</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm text-muted">Total</span>
              <span className="font-bold text-lg text-primary">{order.total.toLocaleString('fr-FR')} PKR</span>
            </div>

            {/* Timeline */}
            {order.status !== 'cancelled' && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-semibold text-muted mb-2">Suivi de commande</p>
                <div className="flex items-center gap-1">
                  {['En attente', 'Confirmé', 'En cours', 'Expédié', 'Livré'].map((step, i) => {
                    const stepValue = i + 1;
                    const currentStep = timelineSteps[order.status as OrderStatus];
                    const isDone = stepValue <= currentStep;
                    const isCurrent = stepValue === currentStep;
                    return (
                      <div key={step} className="flex items-center flex-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isDone ? 'bg-primary text-white' : 'bg-surface-active text-gray-400'
                        } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                          {isDone ? '✓' : i + 1}
                        </div>
                        {i < 4 && <div className={`flex-1 h-0.5 ${isDone && stepValue < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {['En attente', 'Confirmé', 'En cours', 'Expédié', 'Livré'].map((s) => (
                    <span key={s} className="text-[10px] text-muted w-7 text-center">{s.slice(0, 3)}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 pt-4">
          <span className="text-xs text-muted hidden sm:block">
            Page {currentPage} sur {totalPages}
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
