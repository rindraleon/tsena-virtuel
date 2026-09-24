import { useTitle } from '../../hooks';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, Home, Phone } from 'lucide-react';

export default function OrderSuccessPage() {
  useTitle('Commande confirmée');
  const orderNumber = `CMD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center animate-fade-in-up">
      <div className="bg-surface rounded-xl border border-border p-8">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle2 size={40} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">Commande confirmée !</h1>
        <p className="text-muted mb-4">
          Merci pour votre commande. Votre numéro de commande est :
        </p>
        <p className="text-lg font-bold text-text mb-6 bg-surface-secondary rounded-lg py-2 px-4 inline-block">
          {orderNumber}
        </p>
        <p className="text-sm text-muted mb-6">
          Vous recevrez un email de confirmation avec les détails de votre commande.
          Notre équipe prépare votre colis et vous tiendra informé de l'avancement de la livraison.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted mb-6">
          <Package size={16} className="text-primary" />
          <span>Estimation de livraison : 3 à 5 jours ouvrables</span>
        </div>
        <div className="space-y-3">
          <Link to="/" className="block w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
            <Home size={16} className="inline mr-2" /> Retour à l'accueil
          </Link>
          <Link to="/dashboard/client/mes-commandes" className="block w-full border border-border text-text py-2.5 rounded-lg font-semibold hover:bg-surface-secondary transition-colors">
            Voir mes commandes
          </Link>
          <Link to="/contact" className="text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1">
            <Phone size={14} /> Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
