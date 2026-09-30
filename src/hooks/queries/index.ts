// ============================================
// Barrel Export — TanStack Query Hooks
// ============================================

// Auth
export { useProfile, useLogin, useRegister, useLogout } from './useAuth';

// Products
export {
  useProducts,
  useProduct,
  useFeaturedProducts,
  useInfiniteProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useSellerProductStats,
} from './useProducts';

// Categories
export {
  useCategories,
  useCategory,
  useCategoryTree,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from './useCategories';

// Cart
export {
  useCart,
  useCartCount,
  useAddToCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from './useCart';

// Orders + Payments + Escrow
export {
  useOrders,
  useOrder,
  useCreateOrder,
  useUpdateOrderStatus,
  useSellerOrderStats,
  useBuyerOrderStats,
  usePayment,
  usePaymentsByOrder,
  useInitiatePayment,
  useConfirmPayment,
  useEscrowByOrder,
  useReleaseEscrow,
  useBlockEscrow,
} from './useOrders';

// Admin + Reviews + Upload
export {
  useDashboard,
  useSuspendUser,
  useActivateUser,
  useApproveSeller,
  useApproveProduct,
  useRejectProduct,
  useAuditLogs,
  useReviews,
  useAverageRating,
  useCreateReview,
  useUploadProductImage,
  useUploadAvatar,
} from './useAdmin';

// Bridge hooks (API avec fallback mocks)
export {
  useProductsBridge,
  useFeaturedProductsBridge,
  useCategoriesBridge,
  useProductBridge,
  apiProductToProductLike,
} from './useBridge';
