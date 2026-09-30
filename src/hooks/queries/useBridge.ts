// ============================================
// Hooks Bridge — API avec fallback sur les mocks
// ============================================

import { useQuery } from '@tanstack/react-query';
import { productsService, categoriesService } from '../../services';
import { mockProducts, mockCategories } from '../../shared/data/mockData';
import { flashSaleProducts } from '../../data/products';
import type { ProductFilters, ApiProduct, ApiCategory } from '../../types/api';

import type { ProductLike } from '../../types/product';

/**
 * Convertir un ApiProduct en ProductLike (pour les composants existants)
 */
export function apiProductToProductLike(api: ApiProduct): ProductLike {
  const primaryImage = api.images?.find((img: any) => img.isPrimary) || api.images?.[0];
  return {
    id: api.id,
    name: api.name,
    image: primaryImage?.url || '',
    price: Number(api.price),
    oldPrice: api.compareAtPrice ? Number(api.compareAtPrice) : undefined,
    discount: api.compareAtPrice
      ? Math.round(((Number(api.compareAtPrice) - Number(api.price)) / Number(api.compareAtPrice)) * 100)
      : undefined,
    rating: api.averageRating || undefined,
    reviews: api.reviewCount || undefined,
    category: typeof api.categoryId === 'string' ? api.categoryId : undefined,
    stock: api.stockQuantity,
    sellerId: api.sellerId,
    sellerName: '',
    status: api.status === 'active' || api.status === 'published' ? 'active' : 'inactive',
  };
}

/**
 * Convertir un mock product en ApiProduct
 */
function mockProductToApi(mock: any): ApiProduct {
  return {
    id: mock.id,
    name: mock.name,
    slug: mock.id,
    price: mock.price,
    compareAtPrice: mock.oldPrice,
    stockQuantity: mock.stock,
    lowStockThreshold: 5,
    sellerId: mock.sellerId,
    categoryId: mock.category,
    status: 'active',
    averageRating: mock.rating || 0,
    reviewCount: mock.reviews || 0,
    salesCount: 0,
    tags: [],
    isFeatured: false,
    images: [{
      id: `img-${mock.id}`,
      url: mock.image,
      alt: mock.name,
      sortOrder: 0,
      isPrimary: true,
    }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Convertir un mock category en ApiCategory
 */
function mockCategoryToApi(mock: any): ApiCategory {
  return {
    id: mock.id,
    name: mock.name,
    slug: mock.slug,
    iconUrl: mock.icon,
    productCount: mock.productCount,
    sortOrder: 0,
    isActive: mock.status === 'active',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Produits avec filtres — API d'abord, fallback sur mocks
 */
export function useProductsBridge(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', 'bridge', filters],
    queryFn: async () => {
      try {
        const result = await productsService.findAll(filters);
        return {
          items: result.items,
          meta: result.meta,
          source: 'api' as const,
        };
      } catch {
        // Fallback sur les mocks
        let result = mockProducts.filter((p) => p.status === 'active').map(mockProductToApi);

        if (filters.search) {
          result = result.filter((p) =>
            p.name.toLowerCase().includes(filters.search!.toLowerCase())
          );
        }
        if (filters.categoryId) {
          result = result.filter((p) => p.categoryId === filters.categoryId);
        }
        if (filters.minPrice !== undefined) {
          result = result.filter((p) => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== undefined) {
          result = result.filter((p) => p.price <= filters.maxPrice!);
        }
        if (filters.inStock) {
          result = result.filter((p) => p.stockQuantity > 0);
        }

        const page = filters.page || 1;
        const limit = filters.limit || 20;
        const start = (page - 1) * limit;
        const paged = result.slice(start, start + limit);

        return {
          items: paged,
          meta: {
            page,
            limit,
            total: result.length,
            totalPages: Math.ceil(result.length / limit),
            hasNextPage: start + limit < result.length,
            hasPreviousPage: page > 1,
          },
          source: 'mock' as const,
        };
      }
    },
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Produits featured — API d'abord, fallback sur mocks
 */
export function useFeaturedProductsBridge(limit: number = 10) {
  return useQuery({
    queryKey: ['products', 'featured', 'bridge', limit],
    queryFn: async () => {
      try {
        const result = await productsService.getFeatured(limit);
        return { items: result, source: 'api' as const };
      } catch {
        // Fallback sur les mocks flash sale
        const items = flashSaleProducts.slice(0, limit).map(mockProductToApi);
        return { items, source: 'mock' as const };
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Catégories — API d'abord, fallback sur mocks
 */
export function useCategoriesBridge() {
  return useQuery({
    queryKey: ['categories', 'bridge'],
    queryFn: async () => {
      try {
        const result = await categoriesService.findAll({ limit: 50 });
        return {
          items: result.items,
          source: 'api' as const,
        };
      } catch {
        // Fallback sur les mocks
        const items = mockCategories.map(mockCategoryToApi);
        return { items, source: 'mock' as const };
      }
    },
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Un seul produit — API d'abord, fallback sur mocks
 */
export function useProductBridge(id: string) {
  return useQuery({
    queryKey: ['product', 'bridge', id],
    queryFn: async () => {
      try {
        const result = await productsService.findById(id);
        return { item: result, source: 'api' as const };
      } catch {
        // Fallback sur les mocks
        const mock = mockProducts.find((p) => p.id === id);
        if (!mock) {
          throw new Error('Produit non trouvé');
        }
        const item = mockProductToApi(mock);
        return { item, source: 'mock' as const };
      }
    },
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  });
}
