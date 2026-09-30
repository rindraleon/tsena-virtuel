// ============================================
// useCart — Hooks TanStack Query pour Cart
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../../services';

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
    staleTime: 30 * 1000, // 30 sec
  });
}

export function useCartCount() {
  return useQuery({
    queryKey: ['cart', 'count'],
    queryFn: () => cartService.getCartCount(),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000, // Polling every minute
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity?: number }) =>
      cartService.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartService.updateItemQuantity(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => cartService.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
