export type UserRole = 'client' | 'seller' | 'admin';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type SellerStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export type AccountStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  status: AccountStatus;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  sellerId?: string;
  sellerName?: string;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  date: string;
  address?: string;
}

export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  variant?: string;
  category: string;
  stock: number;
  sellerId: string;
  sellerName: string;
  status: 'active' | 'inactive';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  productCount: number;
  status: 'active' | 'inactive';
}

export interface SellerApplication {
  id: string;
  name: string;
  email: string;
  storeName: string;
  phone?: string;
  city?: string;
  description?: string;
  status: SellerStatus;
  appliedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
