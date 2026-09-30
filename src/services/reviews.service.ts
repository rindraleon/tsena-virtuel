// ============================================
// Reviews Service
// ============================================

import { apiClient } from '../lib/api-client';
import type { ApiReview, ApiResponse, PaginationMeta } from '../types/api';

export const reviewsService = {
  async create(dto: { orderId: string; reviewedId: string; rating: number; comment?: string }): Promise<ApiReview> {
    const { data } = await apiClient.post<ApiResponse<ApiReview>>('/reviews', dto);
    return data.data;
  },

  async findAll(filters?: {
    reviewerId?: string;
    reviewedId?: string;
    minRating?: number;
    maxRating?: number;
    page?: number;
    limit?: number;
  }): Promise<{ items: ApiReview[]; meta: PaginationMeta }> {
    const { data } = await apiClient.get<ApiResponse<ApiReview[]>>('/reviews', { params: filters });
    return { items: data.data, meta: data.meta! };
  },

  async findById(id: string): Promise<ApiReview> {
    const { data } = await apiClient.get<ApiResponse<ApiReview>>(`/reviews/${id}`);
    return data.data;
  },

  async update(id: string, dto: { rating?: number; comment?: string }): Promise<ApiReview> {
    const { data } = await apiClient.patch<ApiResponse<ApiReview>>(`/reviews/${id}`, dto);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/reviews/${id}`);
  },

  async getAverageRating(userId: string): Promise<{
    reviewedId: string;
    averageRating: number;
    reviewCount: number;
  }> {
    const { data } = await apiClient.get(`/reviews/user/${userId}/average`);
    return data.data;
  },
};
