// ============================================
// useOrders — Hooks TanStack Query pour Orders + Payments + Escrow
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService, paymentsService, escrowService } from '../../services';

// ─── Orders ──────────────────────────────────────────────

export function useOrders(filters?: { status?: string; page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => ordersService.findAll(filters),
    staleTime: 1 * 60 * 1000,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersService.findById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { addressId?: string; notes?: string }) => ordersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, comment }: { id: string; status: string; comment?: string }) =>
      ordersService.updateStatus(id, status, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
}

export function useSellerOrderStats() {
  return useQuery({
    queryKey: ['orders', 'seller', 'stats'],
    queryFn: () => ordersService.getSellerStats(),
    staleTime: 1 * 60 * 1000,
  });
}

export function useBuyerOrderStats() {
  return useQuery({
    queryKey: ['orders', 'buyer', 'stats'],
    queryFn: () => ordersService.getBuyerStats(),
    staleTime: 1 * 60 * 1000,
  });
}

// ─── Payments ────────────────────────────────────────────

export function usePayment(id: string) {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentsService.findById(id),
    enabled: !!id,
  });
}

export function usePaymentsByOrder(orderId: string) {
  return useQuery({
    queryKey: ['payments', 'order', orderId],
    queryFn: () => paymentsService.findByOrderId(orderId),
    enabled: !!orderId,
  });
}

export function useInitiatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, method }: { orderId: string; method: string }) =>
      paymentsService.initiate(orderId, method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['escrow'] });
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) => paymentsService.confirm(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['escrow'] });
    },
  });
}

// ─── Escrow ──────────────────────────────────────────────

export function useEscrowByOrder(orderId: string) {
  return useQuery({
    queryKey: ['escrow', 'order', orderId],
    queryFn: () => escrowService.findByOrderId(orderId),
    enabled: !!orderId,
  });
}

export function useReleaseEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (escrowId: string) => escrowService.release(escrowId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escrow'] });
    },
  });
}

export function useBlockEscrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ escrowId, reason }: { escrowId: string; reason: string }) =>
      escrowService.block(escrowId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escrow'] });
    },
  });
}
