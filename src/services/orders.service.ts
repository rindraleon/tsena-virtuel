// ============================================
// Orders Service
// ============================================

import { apiClient } from '../lib/api-client';
import type { ApiOrder, OrderStats, ApiResponse, PaginationMeta } from '../types/api';

export const ordersService = {
  async create(dto: { addressId?: string; notes?: string }): Promise<ApiOrder[]> {
    const { data } = await apiClient.post<ApiResponse<ApiOrder[]>>('/orders', dto);
    return data.data;
  },

  async findAll(filters?: {
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ items: ApiOrder[]; meta: PaginationMeta }> {
    const { data } = await apiClient.get<ApiResponse<ApiOrder[]>>('/orders', { params: filters });
    return { items: data.data, meta: data.meta! };
  },

  async findById(id: string): Promise<ApiOrder> {
    const { data } = await apiClient.get<ApiResponse<ApiOrder>>(`/orders/${id}`);
    return data.data;
  },

  async findByOrderNumber(orderNumber: string): Promise<ApiOrder> {
    const { data } = await apiClient.get<ApiResponse<ApiOrder>>(`/orders/number/${orderNumber}`);
    return data.data;
  },

  async updateStatus(id: string, status: string, comment?: string): Promise<ApiOrder> {
    const { data } = await apiClient.patch<ApiResponse<ApiOrder>>(`/orders/${id}/status`, {
      status,
      comment,
    });
    return data.data;
  },

  async getSellerStats(): Promise<OrderStats> {
    const { data } = await apiClient.get<ApiResponse<OrderStats>>('/orders/seller/stats');
    return data.data;
  },

  async getBuyerStats(): Promise<OrderStats> {
    const { data } = await apiClient.get<ApiResponse<OrderStats>>('/orders/buyer/stats');
    return data.data;
  },
};
