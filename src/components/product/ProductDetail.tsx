import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';

interface ProductDetailProps {
  readonly product: Product;
  readonly relatedProducts?: Product[];
  readonly userRole?: 'client' | 'seller' | 'admin' | 'visitor';
}

export default function ProductDetail({ product, relatedProducts = [], userRole = 'visitor' }: ProductDetailProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.discount || 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted mb-6">
        <Link to="/" className="hover:text-primary">Accueil</Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-primary">Catégories</Link>
        <span>/</span>
        <Link to={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
        <span>/</span>
        <span className="text-text font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="animate-fade-in">
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface-secondary border border-border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              width={600}
              height={600}
            />
          </div>
        </div>

        {/* Info */}
        <div className="animate-fade-in-up">
          {discount > 0 && (
            <span className="inline-block bg-danger text-white text-xs font-bold px-2.5 py-1 rounded-md mb-3">
              -{discount}%
            </span>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            {product.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star key={`star-${starIndex}`} size={16} className={starIndex < Math.round(product.rating || 0) ? 'text-accent fill-accent' : 'text-gray-300'} />
                ))}
              </div>
            )}
            {product.reviews !== undefined && <span className="text-sm text-muted">({product.reviews} avis)</span>}
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-primary">{product.price.toLocaleString('fr-FR')} PKR</span>
            {product.oldPrice && (
              <span className="text-lg text-muted line-through">{product.oldPrice.toLocaleString('fr-FR')} PKR</span>
            )}
          </div>

          <p className="text-muted text-sm mb-6">
            Catégorie : <span className="font-medium text-text">{product.category}</span>
            {product.variant && <> · Variante : <span className="font-medium text-text">{product.variant}</span></>}
            {product.sellerName && <> · Vendeur : <span className="font-medium text-text">{product.sellerName}</span></>}
          </p>

          {/* Stock */}
          <div className={`text-sm font-medium mb-6 ${isOutOfStock ? 'text-danger' : 'text-success'}`}>
            {isOutOfStock ? '✗ En rupture de stock' : `En stock (${product.stock} unités)`}
          </div>

          {/* Quantity */}
          {!isOutOfStock && userRole !== 'admin' && (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-text">Quantité :</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-surface-secondary text-muted"
                  aria-label="Diminuer la quantité"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-semibold text-text">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-surface-secondary text-muted"
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            {!isOutOfStock && userRole !== 'admin' && (
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  added ? 'bg-success text-white' : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                <ShoppingCart size={18} />
                {added ? 'Ajouté !' : 'Ajouter au panier'}
              </button>
            )}
            {(userRole === 'seller' || userRole === 'admin') && (
              <button
                onClick={() => navigate(-1)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-primary text-white hover:bg-primary-dark transition-all"
              >
                Modifier ce produit
              </button>
            )}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted">
              <Truck size={16} className="text-primary" /> Livraison rapide
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <ShieldCheck size={16} className="text-primary" /> 100% authentique
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <RotateCcw size={16} className="text-primary" /> Retour 7 jours
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 animate-fade-in-up">
          <h2 className="text-xl font-bold text-primary mb-6">Produits similaires</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                to={`/produits/${p.id}`}
                className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" width={200} height={200} />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-text line-clamp-1">{p.name}</p>
                  <p className="text-sm font-bold text-primary">{p.price.toLocaleString('fr-FR')} PKR</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
