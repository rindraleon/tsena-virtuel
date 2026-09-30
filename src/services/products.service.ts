// ============================================
// Products Service
// ============================================

import { apiClient } from '../lib/api-client';
import type { ApiProduct, ProductFilters, ApiResponse, PaginationMeta } from '../types/api';

export const productsService = {
  async findAll(filters: ProductFilters = {}): Promise<{ items: ApiProduct[]; meta: PaginationMeta }> {
    const { data } = await apiClient.get<ApiResponse<ApiProduct[]>>('/products', { params: filters });
    return { items: data.data, meta: data.meta! };
  },

  async findById(id: string): Promise<ApiProduct> {
    const { data } = await apiClient.get<ApiResponse<ApiProduct>>(`/products/${id}`);
    return data.data;
  },

  async findBySlug(slug: string): Promise<ApiProduct> {
    const { data } = await apiClient.get<ApiResponse<ApiProduct>>(`/products/${slug}`);
    return data.data;
  },

  async getFeatured(limit: number = 10): Promise<ApiProduct[]> {
    const { data } = await apiClient.get<ApiResponse<ApiProduct[]>>('/products/featured', {
      params: { limit },
    });
    return data.data;
  },

  async create(product: Partial<ApiProduct>): Promise<ApiProduct> {
    const { data } = await apiClient.post<ApiResponse<ApiProduct>>('/products', product);
    return data.data;
  },

  async update(id: string, product: Partial<ApiProduct>): Promise<ApiProduct> {
    const { data } = await apiClient.put<ApiResponse<ApiProduct>>(`/products/${id}`, product);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  async getSellerStats(): Promise<{
    totalProducts: number;
    activeProducts: number;
    draftProducts: number;
    outOfStock: number;
    lowStock: number;
  }> {
    const { data } = await apiClient.get('/products/seller/stats');
    return data.data;
  },
};
