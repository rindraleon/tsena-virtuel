// ============================================
// useCategories — Hooks TanStack Query pour Categories
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '../../services';
import type { ApiCategory } from '../../types/api';

export function useCategories(params?: {
  page?: number;
  limit?: number;
  search?: string;
  parentId?: string;
  isActive?: boolean;
}) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoriesService.findAll(params),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useCategory(idOrSlug: string) {
  return useQuery({
    queryKey: ['category', idOrSlug],
    queryFn: () => categoriesService.findById(idOrSlug),
    enabled: !!idOrSlug,
  });
}

export function useCategoryTree() {
  return useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: () => categoriesService.getTree(),
    staleTime: 10 * 60 * 1000, // 10 min
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: Partial<ApiCategory>) => categoriesService.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ApiCategory> }) =>
      categoriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
