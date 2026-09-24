// Product type used for flash sale / promo cards (subset of full Product)
export interface FlashSaleProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  variant?: string;
}

// Re-export the full Product from the main types
export type { Product } from './index';

// Common product interface for cards and display components
export type ProductLike = FlashSaleProduct & {
  category?: string;
  stock?: number;
  sellerId?: string;
  sellerName?: string;
  status?: 'active' | 'inactive';
};
