import { useState, useMemo } from 'react';

type FilterValue = string | number | boolean;

interface UseDataListOptions<T> {
  readonly data: readonly T[];
  readonly searchFields?: readonly (keyof T)[];
  readonly filterField?: string;
  readonly initialFilter?: FilterValue | 'all';
  readonly itemsPerPage?: number;
}

interface UseDataListReturn<T> {
  readonly search: string;
  readonly setSearch: (value: string) => void;
  readonly activeFilter: FilterValue | 'all';
  readonly setFilter: (value: FilterValue | 'all') => void;
  readonly currentPage: number;
  readonly setPage: (page: number) => void;
  readonly processedData: readonly T[];
  readonly paginatedData: readonly T[];
  readonly totalPages: number;
  readonly totalItems: number;
  readonly filteredCount: number;
  readonly startIndex: number;
  readonly endIndex: number;
  readonly canGoNext: boolean;
  readonly canGoPrevious: boolean;
  readonly resetAll: () => void;
  readonly hasActiveFilters: boolean;
}

export function useDataList<T>({
  data,
  searchFields = [],
  filterField,
  initialFilter = 'all',
  itemsPerPage = 10,
}: UseDataListOptions<T>): UseDataListReturn<T> {
  const [search, setSearch] = useState('');
  const [activeFilter, setFilter] = useState<FilterValue | 'all'>(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);

  // Apply search filter
  const searchedData = useMemo(() => {
    if (!search.trim() || searchFields.length === 0) return data;
    const searchLower = search.toLowerCase().trim();
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      })
    );
  }, [data, search, searchFields]);

  // Apply status filter
  const filteredData = useMemo(() => {
    if (activeFilter === 'all' || !filterField) return searchedData;
    return searchedData.filter((item) => {
      const value = (item as Record<string, unknown>)[filterField];
      return value === activeFilter;
    });
  }, [searchedData, activeFilter, filterField]);

  // Apply pagination
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedData = useMemo(
    () => filteredData.slice(startIndex, endIndex),
    [filteredData, startIndex, endIndex]
  );

  // Reset page when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: FilterValue | 'all') => {
    setFilter(value);
    setCurrentPage(1);
  };

  const setPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const resetAll = () => {
    setSearch('');
    setFilter(initialFilter);
    setCurrentPage(1);
  };

  const hasActiveFilters = search.trim().length > 0 || activeFilter !== 'all';

  return {
    search,
    setSearch: handleSearch,
    activeFilter,
    setFilter: handleFilter,
    currentPage: safePage,
    setPage,
    processedData: filteredData,
    paginatedData,
    totalPages,
    totalItems,
    filteredCount: totalItems,
    startIndex,
    endIndex,
    canGoNext: safePage < totalPages,
    canGoPrevious: safePage > 1,
    resetAll,
    hasActiveFilters,
  };
}
