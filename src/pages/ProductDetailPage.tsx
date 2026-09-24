import { useParams } from 'react-router-dom';
import { mockProducts } from '../shared/data/mockData';
import ProductDetail from '../components/product/ProductDetail';
import { useTitle } from '../hooks';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);

  // Dynamic title based on product name
  useTitle(product ? product.name : 'Produit');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Produit introuvable</h2>
        <p className="text-muted">Le produit demandé n'existe pas ou a été retiré.</p>
        <a href="#/" className="inline-block mt-4 text-primary font-semibold hover:underline">← Retour à l'accueil</a>
      </div>
    );
  }

  const related = mockProducts.filter((p) => p.id !== product.id && p.category === product.category);

  return <ProductDetail product={product} relatedProducts={related} />;
}
