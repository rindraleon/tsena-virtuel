import { useTitle } from '../../hooks';
import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag } from 'lucide-react';

export default function NotFoundPage() {
  useTitle('Page introuvable');
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 animate-fade-in-up">
      <div className="max-w-lg w-full text-center">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="mx-auto w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center relative">
            <ShoppingBag size={64} className="text-primary/30" />
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-extrabold text-primary">?</span>
            </div>
          </div>
          {/* Floating elements */}
          <div className="absolute top-4 left-1/4 w-3 h-3 bg-accent rounded-full animate-pulse" />
          <div className="absolute bottom-8 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/3 right-8 w-2.5 h-2.5 bg-danger/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Error code */}
        <p className="text-7xl sm:text-8xl font-extrabold text-primary/10 mb-2 leading-none">404</p>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-primary -mt-4 mb-3">Page introuvable</h1>
        <p className="text-muted mb-8 max-w-sm mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors w-full sm:w-auto justify-center"
          >
            <Home size={18} /> Retour à l'accueil
          </Link>
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 border border-border text-text px-6 py-3 rounded-lg font-semibold hover:bg-surface-secondary transition-colors w-full sm:w-auto justify-center"
          >
            <Search size={18} /> Explorer les produits
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted mb-3">Pages populaires :</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'Promotions', href: '/promotions' },
              { label: 'Favoris', href: '/favoris' },
              { label: 'Contact', href: '/contact' },
              { label: 'À propos', href: '/a-propos' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-primary font-medium px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
