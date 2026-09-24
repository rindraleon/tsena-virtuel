import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly className?: string;
  readonly showFirstLast?: boolean;
  readonly maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages: (number | 'ellipsis')[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('ellipsis');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={cn('flex items-center justify-between gap-2', className)} aria-label="Pagination">
      <span className="text-sm text-muted hidden sm:block">
        Page {currentPage} sur {totalPages}
      </span>

      <div className="flex items-center gap-1">
        {showFirstLast && (
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Première page"
          >
            <ChevronsLeft size={16} />
          </button>
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Page précédente"
        >
          <ChevronLeft size={16} />
        </button>

        {visiblePages.map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-muted text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                'min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors',
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 text-text'
              )}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Page suivante"
        >
          <ChevronRight size={16} />
        </button>

        {showFirstLast && (
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Dernière page"
          >
            <ChevronsRight size={16} />
          </button>
        )}
      </div>
    </nav>
  );
}
