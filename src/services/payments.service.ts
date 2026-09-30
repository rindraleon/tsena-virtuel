// ============================================
// Payments Service
// ============================================

import { apiClient } from '../lib/api-client';
import type { ApiPayment, ApiEscrow, ApiResponse } from '../types/api';

export const paymentsService = {
  async initiate(orderId: string, method: string): Promise<{ payment: ApiPayment; paymentUrl: string }> {
    const { data } = await apiClient.post('/payments/initiate', { orderId, method });
    return data.data;
  },

  async findById(id: string): Promise<ApiPayment> {
    const { data } = await apiClient.get<ApiResponse<ApiPayment>>(`/payments/${id}`);
    return data.data;
  },

  async findByOrderId(orderId: string): Promise<ApiPayment[]> {
    const { data } = await apiClient.get<ApiResponse<ApiPayment[]>>(`/payments/order/${orderId}`);
    return data.data;
  },

  async findByTransactionId(transactionId: string): Promise<ApiPayment> {
    const { data } = await apiClient.get<ApiResponse<ApiPayment>>(`/payments/transaction/${transactionId}`);
    return data.data;
  },

  async confirm(paymentId: string): Promise<ApiPayment> {
    const { data } = await apiClient.post<ApiResponse<ApiPayment>>(`/payments/${paymentId}/confirm`);
    return data.data;
  },

  async getStats(): Promise<{
    totalPayments: number;
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
    totalRevenue: number;
  }> {
    const { data } = await apiClient.get('/payments/stats');
    return data.data;
  },
};

export const escrowService = {
  async findByOrderId(orderId: string): Promise<ApiEscrow> {
    const { data } = await apiClient.get<ApiResponse<ApiEscrow>>(`/escrow/order/${orderId}`);
    return data.data;
  },

  async findById(id: string): Promise<ApiEscrow> {
    const { data } = await apiClient.get<ApiResponse<ApiEscrow>>(`/escrow/${id}`);
    return data.data;
  },

  async release(escrowId: string): Promise<ApiEscrow> {
    const { data } = await apiClient.post<ApiResponse<ApiEscrow>>(`/escrow/${escrowId}/release`);
    return data.data;
  },

  async block(escrowId: string, reason: string): Promise<ApiEscrow> {
    const { data } = await apiClient.post<ApiResponse<ApiEscrow>>(`/escrow/${escrowId}/block`, { reason });
    return data.data;
  },

  async getStats(): Promise<{
    totalEscrows: number;
    totalHeld: number;
    blockedAmount: number;
    releasedAmount: number;
  }> {
    const { data } = await apiClient.get('/escrow/stats');
    return data.data;
  },
};
