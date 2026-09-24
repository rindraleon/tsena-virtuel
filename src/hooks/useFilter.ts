import { useState, useMemo } from 'react';

type FilterValue = string | number | boolean;

interface UseFilterOptions<T> {
  readonly data: readonly T[];
  readonly field: string;
  readonly initialFilter?: FilterValue | 'all';
}

interface UseFilterReturn<T, V extends FilterValue> {
  readonly activeFilter: V | 'all';
  readonly setFilter: (value: V | 'all') => void;
  readonly filteredData: readonly T[];
  readonly clearFilter: () => void;
  readonly hasFilter: boolean;
  readonly getCount: (value: V | 'all') => number;
}

export function useFilter<T, V extends FilterValue = string>({
  data,
  field,
  initialFilter = 'all',
}: UseFilterOptions<T>): UseFilterReturn<T, V> {
  const [activeFilter, setActiveFilter] = useState<V | 'all'>(initialFilter as V | 'all');

  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return data;
    return data.filter((item) => (item as Record<string, unknown>)[field] === activeFilter);
  }, [data, activeFilter, field]);

  const clearFilter = () => setActiveFilter('all' as V | 'all');
  const hasFilter = activeFilter !== 'all';

  const getCount = (value: V | 'all'): number => {
    if (value === 'all') return data.length;
    return data.filter((item) => (item as Record<string, unknown>)[field] === value).length;
  };

  return {
    activeFilter,
    setFilter: setActiveFilter,
    filteredData,
    clearFilter,
    hasFilter,
    getCount,
  };
}
