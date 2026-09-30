// ============================================
// Categories Service
// ============================================

import { apiClient } from '../lib/api-client';
import type { ApiCategory, CategoryTreeNode, ApiResponse, PaginationMeta } from '../types/api';

export const categoriesService = {
  async findAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    parentId?: string;
    isActive?: boolean;
  }): Promise<{ items: ApiCategory[]; meta: PaginationMeta }> {
    const { data } = await apiClient.get<ApiResponse<ApiCategory[]>>('/categories', { params });
    return { items: data.data, meta: data.meta! };
  },

  async findById(id: string): Promise<ApiCategory> {
    const { data } = await apiClient.get<ApiResponse<ApiCategory>>(`/categories/${id}`);
    return data.data;
  },

  async findBySlug(slug: string): Promise<ApiCategory> {
    const { data } = await apiClient.get<ApiResponse<ApiCategory>>(`/categories/${slug}`);
    return data.data;
  },

  async getTree(): Promise<CategoryTreeNode[]> {
    const { data } = await apiClient.get<ApiResponse<CategoryTreeNode[]>>('/categories/tree');
    return data.data;
  },

  async create(category: Partial<ApiCategory>): Promise<ApiCategory> {
    const { data } = await apiClient.post<ApiResponse<ApiCategory>>('/categories', category);
    return data.data;
  },

  async update(id: string, category: Partial<ApiCategory>): Promise<ApiCategory> {
    const { data } = await apiClient.put<ApiResponse<ApiCategory>>(`/categories/${id}`, category);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};
