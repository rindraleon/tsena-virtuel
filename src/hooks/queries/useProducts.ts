// ============================================
// useProducts — Hooks TanStack Query pour Products
// ============================================

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { productsService } from '../../services';
import type { ProductFilters, ApiProduct } from '../../types/api';

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsService.findAll(filters),
    staleTime: 2 * 60 * 1000, // 2 min
  });
}

export function useProduct(idOrSlug: string) {
  return useQuery({
    queryKey: ['product', idOrSlug],
    queryFn: () => productsService.findById(idOrSlug),
    enabled: !!idOrSlug,
    staleTime: 1 * 60 * 1000, // 1 min
  });
}

export function useFeaturedProducts(limit: number = 10) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productsService.getFeatured(limit),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useInfiniteProducts(filters: Omit<ProductFilters, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      productsService.findAll({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialPageParam: 1,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Partial<ApiProduct>) => productsService.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ApiProduct> }) =>
      productsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useSellerProductStats() {
  return useQuery({
    queryKey: ['products', 'seller', 'stats'],
    queryFn: () => productsService.getSellerStats(),
    staleTime: 1 * 60 * 1000,
  });
}
