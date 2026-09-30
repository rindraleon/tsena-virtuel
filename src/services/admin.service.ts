// ============================================
// Admin Service
// ============================================

import { apiClient } from '../lib/api-client';
import type { DashboardStats, AuditLog, ApiUser, ApiProduct, ApiResponse, PaginationMeta } from '../types/api';

export const adminService = {
  async getDashboard(): Promise<DashboardStats> {
    const { data } = await apiClient.get<ApiResponse<DashboardStats>>('/admin/dashboard');
    return data.data;
  },

  async suspendUser(userId: string): Promise<ApiUser> {
    const { data } = await apiClient.post<ApiResponse<ApiUser>>(`/admin/users/${userId}/suspend`);
    return data.data;
  },

  async activateUser(userId: string): Promise<ApiUser> {
    const { data } = await apiClient.post<ApiResponse<ApiUser>>(`/admin/users/${userId}/activate`);
    return data.data;
  },

  async approveSeller(userId: string): Promise<ApiUser> {
    const { data } = await apiClient.post<ApiResponse<ApiUser>>(`/admin/users/${userId}/approve-seller`);
    return data.data;
  },

  async approveProduct(productId: string): Promise<ApiProduct> {
    const { data } = await apiClient.post<ApiResponse<ApiProduct>>(`/admin/products/${productId}/approve`);
    return data.data;
  },

  async rejectProduct(productId: string, reason: string): Promise<ApiProduct> {
    const { data } = await apiClient.post<ApiResponse<ApiProduct>>(`/admin/products/${productId}/reject`, { reason });
    return data.data;
  },

  async getAuditLogs(filters?: {
    userId?: string;
    action?: string;
    entity?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ items: AuditLog[]; meta: PaginationMeta }> {
    const { data } = await apiClient.get<ApiResponse<AuditLog[]>>('/admin/audit-logs', { params: filters });
    return { items: data.data, meta: data.meta! };
  },
};

// ─── Upload Service ──────────────────────────────────────

export const uploadService = {
  async uploadProductImage(productId: string, file: File): Promise<{ url: string; key: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/upload/product/${productId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async uploadAvatar(file: File): Promise<{ url: string; key: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post('/upload/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async uploadDisputeEvidence(disputeId: string, file: File): Promise<{ url: string; key: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/upload/dispute/${disputeId}/evidence`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async removeFile(key: string): Promise<void> {
    await apiClient.delete(`/upload/${key}`);
  },
};
