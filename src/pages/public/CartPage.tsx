import { useTitle } from '../../hooks';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function CartPage() {
  useTitle('Mon panier');
  const { items, totalItems, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const shipping = subtotal > 2000 ? 0 : 250;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in-up">
        <ShoppingBag size={64} className="mx-auto text-muted mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">Votre panier est vide</h1>
        <p className="text-muted mb-6">Découvrez nos produits et ajoutez-les à votre panier.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
          <ArrowLeft size={18} /> Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Mon panier ({totalItems} article{totalItems > 1 ? 's' : ''})</h1>
        <button onClick={clearCart} className="text-sm text-danger hover:underline">Vider le panier</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-surface rounded-xl border border-border p-4 flex gap-4 animate-fade-in-up">
              <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover shrink-0" width={80} height={80} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text truncate">{product.name}</h3>
                {product.variant && <p className="text-xs text-muted">{product.variant}</p>}
                <p className="text-sm font-bold text-primary mt-1">{product.price.toLocaleString('fr-FR')} PKR</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(product.id)} className="p-1.5 text-muted hover:text-danger transition-colors" aria-label="Supprimer">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-surface-secondary text-muted" aria-label="Diminuer">
                    <Minus size={14} />
                  </button>
                  <span className="px-3 font-semibold text-sm">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-surface-secondary text-muted" aria-label="Augmenter">
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-sm font-bold text-text">{(product.price * quantity).toLocaleString('fr-FR')} PKR</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-surface rounded-xl border border-border p-5 h-fit sticky top-20">
          <h2 className="font-bold text-lg text-primary mb-4">Résumé</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Sous-total</span><span className="font-medium">{subtotal.toLocaleString('fr-FR')} PKR</span></div>
            <div className="flex justify-between"><span className="text-muted">Livraison</span><span className="font-medium">{shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString('fr-FR')} PKR`}</span></div>
            {shipping > 0 && <p className="text-xs text-primary">Livraison gratuite dès 2 000 PKR</p>}
            <div className="border-t border-border pt-3 flex justify-between text-base font-bold"><span>Total</span><span className="text-primary">{total.toLocaleString('fr-FR')} PKR</span></div>
          </div>
          {user ? (
            <Link to="/commande/validation" className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold mt-4 hover:bg-primary-dark transition-colors">
              Valider la commande
            </Link>
          ) : (
            <Link to="/connexion" className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold mt-4 hover:bg-primary-dark transition-colors">
              Se connecter pour commander
            </Link>
          )}
          <Link to="/" className="block text-center text-sm text-primary font-medium mt-3 hover:underline">
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}
