// ============================================
// API Types — Types correspondant au backend NestJS
// ============================================

// ─── Réponse API standard ────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ─── Auth ────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: ApiUser;
  tokens: AuthTokens;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// ─── User ────────────────────────────────────────────────

export type UserRole = 'visitor' | 'client' | 'buyer' | 'seller' | 'admin';
export type AccountStatus = 'active' | 'suspended' | 'disabled' | 'pending_verification';

export interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  roles: UserRole[];
  status: AccountStatus;
  reputationScore: number;
  createdAt: string;
}

// ─── Category ────────────────────────────────────────────

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  parentId?: string;
  parent?: ApiCategory;
  children?: ApiCategory[];
  productCount: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface CategoryTreeNode {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
  children: CategoryTreeNode[];
}

// ─── Product ─────────────────────────────────────────────

export type ProductStatus = 'draft' | 'pending_review' | 'active' | 'published' | 'unavailable' | 'sold_out' | 'suspended' | 'archived' | 'rejected';

export interface ApiProductImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  sku?: string;
  stockQuantity: number;
  lowStockThreshold: number;
  weight?: number;
  sellerId: string;
  categoryId: string;
  category?: ApiCategory;
  status: ProductStatus;
  averageRating: number;
  reviewCount: number;
  salesCount: number;
  tags: string[];
  isFeatured: boolean;
  images?: ApiProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  sellerId?: string;
  isFeatured?: boolean;
  inStock?: boolean;
  tags?: string;
  sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt' | 'stockQuantity';
  order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

// ─── Cart ────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product?: {
    id: string;
    name: string;
    slug: string;
    images: ApiProductImage[];
    stockQuantity: number;
    status: ProductStatus;
  };
  subtotal: number;
}

export interface CartData {
  cart: { id: string; userId: string };
  items: CartItem[];
  summary: {
    itemCount: number;
    totalQuantity: number;
    totalAmount: number;
  };
}

// ─── Order ───────────────────────────────────────────────

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'in_dispute';

export interface OrderLine {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ApiOrder {
  id: string;
  orderNumber: string;
  buyerId: string;
  sellerId: string;
  addressId?: string;
  subtotalAmount: number;
  shippingAmount: number;
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
  lines: OrderLine[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders?: number;
  shippedOrders?: number;
  deliveredOrders: number;
  cancelledOrders?: number;
  totalRevenue?: number;
  totalSpent?: number;
  activeOrders?: number;
}

// ─── Payment ─────────────────────────────────────────────

export type PaymentStatus = 'initiated' | 'pending' | 'processing' | 'success' | 'failed' | 'cancelled' | 'escrow' | 'blocked' | 'released' | 'refunded' | 'partially_refunded';

export interface ApiPayment {
  id: string;
  transactionId: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  providerResponse?: string;
  paidAt?: string;
  createdAt: string;
}

// ─── Escrow ──────────────────────────────────────────────

export interface ApiEscrow {
  id: string;
  paymentId: string;
  orderId: string;
  amount: number;
  isBlocked: boolean;
  reason?: string;
  releasedAt?: string;
  releasedTo?: string;
  createdAt: string;
}

// ─── Dispute ─────────────────────────────────────────────

export type DisputeStatus = 'reported' | 'open' | 'awaiting_evidence' | 'under_review' | 'resolved_buyer' | 'resolved_seller' | 'partial_resolution' | 'closed' | 'cancelled';

export interface ApiDispute {
  id: string;
  orderId: string;
  reporterId: string;
  reason: string;
  status: DisputeStatus;
  adminDecision?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface DisputeEvidence {
  id: string;
  disputeId: string;
  url: string;
  description?: string;
  uploadedBy: string;
  createdAt: string;
}

// ─── Review ──────────────────────────────────────────────

export interface ApiReview {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comment?: string;
  isVisible: boolean;
  createdAt: string;
}

// ─── Badge ───────────────────────────────────────────────

export interface ApiBadge {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  criteria?: object;
  isActive: boolean;
  createdAt: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  awardedAt?: string;
  isActive: boolean;
  badge?: ApiBadge;
}

// ─── Admin ───────────────────────────────────────────────

export interface DashboardStats {
  users: { total: number; active: number; sellers: number };
  products: { total: number; active: number };
  orders: { total: number; pending: number; delivered: number; last7Days: number };
  revenue: { total: number; last7Days: number };
  payments: { total: number; successful: number };
  escrow: { heldAmount: number };
  disputes: { open: number };
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  changes?: object;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// ─── Upload ──────────────────────────────────────────────

export interface UploadResult {
  url: string;
  key: string;
}
