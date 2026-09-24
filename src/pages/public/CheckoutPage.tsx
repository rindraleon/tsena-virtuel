import { useTitle } from '../../hooks';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, CreditCard, ClipboardCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

type Step = 'address' | 'payment' | 'confirm';

export default function CheckoutPage() {
  useTitle('Validation de la commande');
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('address');
  const [address, setAddress] = useState({ fullName: user?.name || '', phone: '', city: '', address: '', notes: '' });
  const [payment, setPayment] = useState<'cod' | 'online'>('cod');

  const shipping = subtotal > 2000 ? 0 : 250;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in-up">
        <p className="text-muted">Votre panier est vide.</p>
        <Link to="/" className="text-primary font-medium hover:underline mt-4 inline-block">Continuer mes achats</Link>
      </div>
    );
  }

  const steps: { key: Step; label: string; icon: React.ElementType }[] = [
    { key: 'address', label: 'Adresse', icon: MapPin },
    { key: 'payment', label: 'Paiement', icon: CreditCard },
    { key: 'confirm', label: 'Confirmation', icon: ClipboardCheck },
  ];

  const canProceed = () => {
    if (step === 'address') return address.fullName && address.phone && address.city && address.address;
    return true;
  };

  const handleNext = () => {
    if (step === 'address') setStep('payment');
    else if (step === 'payment') setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'payment') setStep('address');
  };

  const handleConfirm = () => {
    clearCart();
    navigate('/commande/succes');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-primary mb-6">Valider ma commande</h1>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = s.key === step;
          const isPast = steps.findIndex((x) => x.key === step) > i;
          return (
            <div key={s.key} className="flex items-center gap-2">
              {i > 0 && <div className={`w-8 h-0.5 ${isPast ? 'bg-primary' : 'bg-border'}`} />}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${isActive ? 'bg-primary text-white' : isPast ? 'bg-primary/10 text-primary' : 'bg-surface-secondary text-muted'}`}>
                <Icon size={16} /> {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Address step */}
          {step === 'address' && (
            <div className="bg-surface rounded-xl border border-border p-6">
              <h2 className="font-bold text-text mb-4 flex items-center gap-2"><MapPin size={18} /> Adresse de livraison</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Nom complet</label>
                  <input type="text" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Téléphone</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Phone size={16} /></div>
                    <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Ville</label>
                  <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Adresse complète</label>
                  <textarea rows={2} value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Notes (optionnel)</label>
                  <input type="text" value={address.notes} onChange={(e) => setAddress({ ...address, notes: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                </div>
              </div>
              <button onClick={handleNext} disabled={!canProceed()} className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold mt-4 hover:bg-primary-dark transition-colors disabled:opacity-50">
                Continuer
              </button>
            </div>
          )}

          {/* Payment step */}
          {step === 'payment' && (
            <div className="bg-surface rounded-xl border border-border p-6">
              <h2 className="font-bold text-text mb-4 flex items-center gap-2"><CreditCard size={18} /> Mode de paiement</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${payment === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <input type="radio" name="payment" checked={payment === 'cod'} onChange={() => setPayment('cod')} className="text-primary" />
                  <div>
                    <p className="font-medium text-text">Paiement à la livraison</p>
                    <p className="text-xs text-muted">Payez en espèces à la réception de votre commande</p>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${payment === 'online' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <input type="radio" name="payment" checked={payment === 'online'} onChange={() => setPayment('online')} className="text-primary" />
                  <div>
                    <p className="font-medium text-text">Paiement en ligne</p>
                    <p className="text-xs text-muted">Carte bancaire ou mobile money</p>
                  </div>
                </label>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleBack} className="flex-1 border border-border text-text py-2.5 rounded-lg font-semibold hover:bg-surface-secondary transition-colors">Retour</button>
                <button onClick={handleNext} className="flex-1 bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Continuer</button>
              </div>
            </div>
          )}

          {/* Confirm step */}
          {step === 'confirm' && (
            <div className="bg-surface rounded-xl border border-border p-6">
              <h2 className="font-bold text-text mb-4 flex items-center gap-2"><ClipboardCheck size={18} /> Récapitulatif</h2>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-muted">{address.address}, {address.city}</p>
                    <p className="text-muted">{address.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard size={16} className="text-primary" />
                  <span className="text-text">{payment === 'cod' ? 'Paiement à la livraison' : 'Paiement en ligne'}</span>
                </div>
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-text">{product.name} x{quantity}</span>
                    <span className="font-medium">{(product.price * quantity).toLocaleString('fr-FR')} PKR</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleBack} className="flex-1 border border-border text-text py-2.5 rounded-lg font-semibold hover:bg-surface-secondary transition-colors">Retour</button>
                <button onClick={handleConfirm} className="flex-1 bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Confirmer la commande</button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="bg-surface rounded-xl border border-border p-5 h-fit sticky top-20">
          <h3 className="font-bold text-text mb-3">Votre commande</h3>
          <div className="space-y-2 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between">
                <span className="text-muted truncate mr-2">{product.name} x{quantity}</span>
                <span className="font-medium shrink-0">{(product.price * quantity).toLocaleString('fr-FR')} PKR</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between"><span className="text-muted">Sous-total</span><span>{subtotal.toLocaleString('fr-FR')} PKR</span></div>
              <div className="flex justify-between"><span className="text-muted">Livraison</span><span>{shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString('fr-FR')} PKR`}</span></div>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-border pt-2">
              <span>Total</span><span className="text-primary">{total.toLocaleString('fr-FR')} PKR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
