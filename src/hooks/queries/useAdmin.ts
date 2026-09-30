// ============================================
// useAdmin — Hooks TanStack Query pour Admin + Reviews + Badges
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, uploadService, reviewsService } from '../../services';

// ─── Admin Dashboard ─────────────────────────────────────

export function useDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => adminService.getDashboard(),
    staleTime: 30 * 1000, // 30 sec
    refetchInterval: 60 * 1000, // Auto-refresh every minute
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => adminService.suspendUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
}

export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => adminService.activateUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
}

export function useApproveSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => adminService.approveSeller(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
}

export function useApproveProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => adminService.approveProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
}

export function useRejectProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, reason }: { productId: string; reason: string }) =>
      adminService.rejectProduct(productId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
}

export function useAuditLogs(filters?: {
  userId?: string;
  action?: string;
  entity?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['admin', 'audit-logs', filters],
    queryFn: () => adminService.getAuditLogs(filters),
    staleTime: 1 * 60 * 1000,
  });
}

// ─── Reviews ─────────────────────────────────────────────

export function useReviews(filters?: {
  reviewerId?: string;
  reviewedId?: string;
  minRating?: number;
  maxRating?: number;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['reviews', filters],
    queryFn: () => reviewsService.findAll(filters),
    staleTime: 2 * 60 * 1000,
  });
}

export function useAverageRating(userId: string) {
  return useQuery({
    queryKey: ['reviews', 'average', userId],
    queryFn: () => reviewsService.getAverageRating(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { orderId: string; reviewedId: string; rating: number; comment?: string }) =>
      reviewsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

// ─── Upload ──────────────────────────────────────────────

export function useUploadProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, file }: { productId: string; file: File }) =>
      uploadService.uploadProductImage(productId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}
