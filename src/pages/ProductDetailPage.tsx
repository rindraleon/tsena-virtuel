import { useParams } from 'react-router-dom';
import { mockProducts } from '../shared/data/mockData';
import ProductDetail from '../components/product/ProductDetail';
import { useTitle } from '../hooks';
import { useProductBridge, apiProductToProductLike } from '../hooks/queries/useBridge';
import Skeleton from '../components/common/Skeleton';
import type { Product } from '../types';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useProductBridge(id || '');

  const apiProduct = data?.item;

  // Dynamic title based on product name
  useTitle(apiProduct ? apiProduct.name : 'Produit');

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!apiProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Produit introuvable</h2>
        <p className="text-muted">Le produit demandé n'existe pas ou a été retiré.</p>
        <a href="#/" className="inline-block mt-4 text-primary font-semibold hover:underline">← Retour à l'accueil</a>
      </div>
    );
  }

  // Convertir ApiProduct en Product pour le composant
  const productLike = apiProductToProductLike(apiProduct);
  const product: Product = {
    id: productLike.id,
    name: productLike.name,
    image: productLike.image || '',
    price: productLike.price,
    oldPrice: productLike.oldPrice,
    rating: productLike.rating,
    reviews: productLike.reviews,
    variant: undefined,
    category: productLike.category || '',
    stock: productLike.stock || 0,
    sellerId: productLike.sellerId || '',
    sellerName: '',
    status: productLike.status || 'active',
  };

  // Related products — utiliser les mocks pour l'instant
  const related = mockProducts.filter((p) => p.id !== product.id && p.category === product.category);

  return <ProductDetail product={product} relatedProducts={related} />;
}
