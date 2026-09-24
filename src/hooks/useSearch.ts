import { useState, useMemo } from 'react';

interface UseSearchOptions<T> {
  readonly data: readonly T[];
  readonly searchFields: readonly (keyof T)[];
  readonly initialSearch?: string;
}

interface UseSearchReturn<T> {
  readonly search: string;
  readonly setSearch: (value: string) => void;
  readonly filteredData: readonly T[];
  readonly clearSearch: () => void;
  readonly hasSearch: boolean;
}

export function useSearch<T>({ data, searchFields, initialSearch = '' }: UseSearchOptions<T>): UseSearchReturn<T> {
  const [search, setSearch] = useState(initialSearch);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const searchLower = search.toLowerCase().trim();

    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      })
    );
  }, [data, search, searchFields]);

  const clearSearch = () => setSearch('');
  const hasSearch = search.trim().length > 0;

  return {
    search,
    setSearch,
    filteredData,
    clearSearch,
    hasSearch,
  };
}
