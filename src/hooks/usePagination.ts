import { useState, useMemo } from 'react';

interface UsePaginationOptions<T> {
  readonly data: readonly T[];
  readonly itemsPerPage?: number;
  readonly initialPage?: number;
}

interface UsePaginationReturn<T> {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly paginatedData: readonly T[];
  readonly totalItems: number;
  readonly startIndex: number;
  readonly endIndex: number;
  readonly setPage: (page: number) => void;
  readonly nextPage: () => void;
  readonly previousPage: () => void;
  readonly firstPage: () => void;
  readonly lastPage: () => void;
  readonly canGoNext: boolean;
  readonly canGoPrevious: boolean;
  readonly itemsPerPage: number;
}

export function usePagination<T>({ data, itemsPerPage = 10, initialPage = 1 }: UsePaginationOptions<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );

  const setPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const nextPage = () => setPage(safePage + 1);
  const previousPage = () => setPage(safePage - 1);
  const firstPage = () => setPage(1);
  const lastPage = () => setPage(totalPages);

  return {
    currentPage: safePage,
    totalPages,
    paginatedData,
    totalItems: data.length,
    startIndex,
    endIndex,
    setPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    canGoNext: safePage < totalPages,
    canGoPrevious: safePage > 1,
    itemsPerPage,
  };
}
