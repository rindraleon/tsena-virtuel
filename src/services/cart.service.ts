// ============================================
// Cart Service
// ============================================

import { apiClient } from '../lib/api-client';
import type { CartData, ApiResponse } from '../types/api';

export const cartService = {
  async getCart(): Promise<CartData> {
    const { data } = await apiClient.get<ApiResponse<CartData>>('/cart');
    return data.data;
  },

  async getCartCount(): Promise<number> {
    const { data } = await apiClient.get<ApiResponse<{ count: number }>>('/cart/count');
    return data.data.count;
  },

  async addItem(productId: string, quantity: number = 1): Promise<CartData> {
    const { data } = await apiClient.post<ApiResponse<CartData>>('/cart/items', {
      productId,
      quantity,
    });
    return data.data;
  },

  async updateItemQuantity(itemId: string, quantity: number): Promise<CartData> {
    const { data } = await apiClient.patch<ApiResponse<CartData>>(`/cart/items/${itemId}`, {
      quantity,
    });
    return data.data;
  },

  async removeItem(itemId: string): Promise<CartData> {
    const { data } = await apiClient.delete<ApiResponse<CartData>>(`/cart/items/${itemId}`);
    return data.data;
  },

  async clearCart(): Promise<CartData> {
    const { data } = await apiClient.delete<ApiResponse<CartData>>('/cart');
    return data.data;
  },
};
