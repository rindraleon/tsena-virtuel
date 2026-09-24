import { type ReactNode, useState } from 'react';
import { Search, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SlidersHorizontal, Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useDataList } from '../../hooks/useDataList';

type FilterValue = string | number | boolean;

interface Column<T> {
  readonly header: string;
  readonly accessor: keyof T | ((row: T) => ReactNode);
  readonly className?: string;
  readonly mobile?: boolean;
}

interface FilterOption {
  readonly value: string;
  readonly label: string;
}

interface FilterConfig {
  readonly field: string;
  readonly options: readonly FilterOption[];
}

interface DataTableProps<T extends { id: string }> {
  readonly data: readonly T[];
  readonly columns: readonly Column<T>[];
  readonly searchFields?: readonly (keyof T)[];
  readonly searchPlaceholder?: string;
  readonly filterConfig?: FilterConfig;
  readonly actions?: (item: T) => ReactNode;
  readonly titleKey?: keyof T;
  readonly subtitleKey?: keyof T;
  readonly statusKey?: keyof T;
  readonly imageKey?: keyof T;
  readonly emptyMessage?: string;
  readonly emptyIcon?: ReactNode;
  readonly itemsPerPage?: number;
  readonly onRowClick?: (item: T) => void;
  readonly className?: string;
  readonly headerContent?: ReactNode;
  readonly loading?: boolean;
}

function getValue<T>(row: T, accessor: keyof T | ((row: T) => ReactNode)): ReactNode {
  if (typeof accessor === 'function') return accessor(row);
  return row[accessor] as unknown as ReactNode;
}

function getStatusClasses(status: string | number | boolean): string {
  const s = String(status);
  if (['active', 'delivered', 'completed', 'approved', 'confirmed'].includes(s)) {
    return 'bg-green-50 text-green-700 border-green-200';
  }
  if (['pending', 'waiting'].includes(s)) {
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
  if (['processing', 'shipped', 'in_transit', 'suspended'].includes(s)) {
    return 'bg-blue-50 text-blue-700 border-blue-200';
  }
  if (['cancelled', 'rejected', 'inactive'].includes(s)) {
    return 'bg-red-50 text-red-700 border-red-200';
  }
  return 'bg-surface-secondary text-gray-700 border-gray-200';
}

function formatLabel(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  return String(value);
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  searchFields = [],
  searchPlaceholder = 'Rechercher...',
  filterConfig,
  actions,
  titleKey,
  subtitleKey,
  statusKey,
  imageKey,
  emptyMessage = 'Aucun résultat',
  emptyIcon,
  itemsPerPage = 10,
  onRowClick,
  className,
  headerContent,
  loading = false,
}: DataTableProps<T>) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const {
    search,
    setSearch,
    activeFilter,
    setFilter,
    currentPage,
    setPage,
    processedData,
    paginatedData,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    canGoNext,
    canGoPrevious,
    resetAll,
    hasActiveFilters,
  } = useDataList<T>({
    data,
    searchFields,
    filterField: filterConfig?.field as string | undefined,
    initialFilter: 'all',
    itemsPerPage,
  });

  if (loading) {
    return (
      <div className="bg-surface rounded-xl border border-border p-10">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={`loading-${i}`} className="h-12 bg-surface-tertiary rounded" />
          ))}
        </div>
      </div>
    );
  }

  const visibleColumns = columns;
  const mobileColumns = visibleColumns.filter((col) => col.mobile !== false);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-3">
        {/* Desktop toolbar */}
        <div className="hidden sm:flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {searchFields.length > 0 && (
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-64 pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface"
                  aria-label={searchPlaceholder}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
                    aria-label="Effacer la recherche"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
            {filterConfig && (
              <div className="flex gap-2 flex-wrap" role="group" aria-label="Filtrer par statut">
                {filterConfig.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilter(opt.value)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                      activeFilter === opt.value
                        ? 'bg-primary text-white'
                        : 'bg-surface-tertiary text-text hover:bg-surface-active'
                    )}
                    aria-pressed={activeFilter === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-text transition-colors"
                aria-label="Réinitialiser les filtres"
              >
                <X size={12} /> Réinitialiser
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {headerContent}
            <span className="text-sm text-muted">
              {totalItems} résultat{totalItems > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Mobile toolbar */}
        <div className="flex sm:hidden items-center gap-2">
          {searchFields.length > 0 && (
            <button
              type="button"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors',
                showMobileSearch ? 'border-primary text-primary bg-primary/5' : 'border-border text-text'
              )}
              aria-label="Rechercher"
            >
              <Search size={16} />
            </button>
          )}
          {filterConfig && (
            <button
              type="button"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors',
                showMobileFilter ? 'border-primary text-primary bg-primary/5' : 'border-border text-text'
              )}
              aria-label="Filtrer"
            >
              <SlidersHorizontal size={16} />
              {activeFilter !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          )}
          <div className="flex-1" />
          {headerContent}
          <span className="text-xs text-muted">{totalItems} résultat{totalItems > 1 ? 's' : ''}</span>
        </div>

        {/* Mobile expandable search */}
        {showMobileSearch && searchFields.length > 0 && (
          <div className="relative sm:hidden">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface"
              aria-label={searchPlaceholder}
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

        {/* Mobile expandable filter */}
        {showMobileFilter && filterConfig && (
          <div className="flex gap-2 flex-wrap sm:hidden">
            {filterConfig.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFilter(opt.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  activeFilter === opt.value
                    ? 'bg-primary text-white'
                    : 'bg-surface-tertiary text-text'
                )}
              >
                {opt.label}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-red-600 bg-red-50"
              >
                Réinitialiser
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-surface rounded-xl border border-border overflow-hidden">
        {processedData.length === 0 ? (
          <div className="p-10 text-center">
            {emptyIcon || <Inbox size={40} className="mx-auto text-gray-300 mb-3" />}
            <p className="text-muted text-sm">{emptyMessage}</p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="mt-3 text-sm text-primary font-medium hover:underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border">
              <tr>
                {visibleColumns.map((col, colIdx) => (
                  <th
                    key={`head-${colIdx}`}
                    className={cn('px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider', col.className)}
                  >
                    {col.header}
                  </th>
                ))}
                {actions && <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className={cn('transition-colors', onRowClick && 'cursor-pointer hover:bg-surface-hover')}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {visibleColumns.map((col, colIdx) => (
                    <td key={`cell-${colIdx}`} className={cn('px-4 py-3 text-sm', col.className)}>
                      {getValue(row, col.accessor)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {processedData.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-8 text-center">
            {emptyIcon || <Inbox size={32} className="mx-auto text-gray-300 mb-2" />}
            <p className="text-muted text-sm">{emptyMessage}</p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="mt-3 text-sm text-primary font-medium hover:underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          paginatedData.map((row) => (
            <div
              key={row.id}
              className={cn(
                'bg-surface rounded-xl border border-border p-4 transition-shadow hover:shadow-md',
                onRowClick && 'cursor-pointer'
              )}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              <div className="flex items-start gap-3">
                {imageKey && (
                  <img
                    src={row[imageKey] as unknown as string}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                    width={48}
                    height={48}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {titleKey && (
                        <p className="font-semibold text-text text-sm truncate">
                          {formatLabel(row[titleKey])}
                        </p>
                      )}
                      {subtitleKey && (
                        <p className="text-xs text-muted mt-0.5 truncate">
                          {formatLabel(row[subtitleKey])}
                        </p>
                      )}
                    </div>
                    {statusKey && (
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border capitalize shrink-0', getStatusClasses(row[statusKey] as unknown as FilterValue))}>
                        {formatLabel(row[statusKey])}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 space-y-1">
                    {mobileColumns.map((col, colIdx) => {
                      if (titleKey && col.accessor === titleKey) return null;
                      if (subtitleKey && col.accessor === subtitleKey) return null;
                      if (statusKey && col.accessor === statusKey) return null;
                      if (imageKey && col.accessor === imageKey) return null;
                      return (
                        <div key={`mobile-${colIdx}`} className="flex items-center justify-between text-xs">
                          <span className="text-muted">{col.header}</span>
                          <span className="text-text font-medium ml-2 truncate max-w-[60%] text-right">
                            {getValue(row, col.accessor)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {actions && (
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                  {actions(row)}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="text-xs text-muted hidden sm:block">
            {startIndex + 1}–{endIndex} sur {totalItems}
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

            <span className="text-sm font-medium text-text px-2">
              {currentPage} / {totalPages}
            </span>

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
