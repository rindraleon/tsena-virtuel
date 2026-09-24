import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import ThemeSelector from '../common/ThemeSelector';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getDashboardRoute } from '../../shared/data/permissions';

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate('/connexion', { state: { from: '/favoris' } });
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate('/connexion', { state: { from: '/panier' } });
    }
  };

  const wishlistTarget = '/favoris';
  const cartTarget = '/panier';

  return (
    <header className="bg-surface shadow-sm sticky top-0 z-40 w-full">
      {/* Full-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center relative overflow-hidden">
              <span className="text-accent font-extrabold text-xl relative z-10">T</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent/30 rounded-full" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-primary text-xl leading-none block tracking-tight">Tsena</span>
              <span className="text-[9px] text-muted font-medium leading-tight block tracking-[0.15em] uppercase">Marketplace</span>
            </div>
          </Link>

          {/* Navigation links - desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/produits" className="text-sm font-medium text-text hover:text-primary transition-colors">
              Produits
            </Link>
            <Link to="/promotions" className="text-sm font-medium text-text hover:text-primary transition-colors">
              Promotions
            </Link>
            <Link to="/contact" className="text-sm font-medium text-text hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/a-propos" className="text-sm font-medium text-text hover:text-primary transition-colors">
              À propos
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSelector />
            <Link
              to={wishlistTarget}
              onClick={handleWishlistClick}
              className="hidden sm:flex flex-col items-center text-text hover:text-primary transition-colors"
              aria-label="Favoris"
            >
              <Heart size={22} />
              <span className="text-[10px] mt-0.5">Favoris</span>
            </Link>
            <Link
              to={cartTarget}
              onClick={handleCartClick}
              className="relative flex flex-col items-center text-text hover:text-primary transition-colors"
              aria-label="Panier"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-count-pulse">
                  {totalItems}
                </span>
              )}
              <span className="text-[10px] mt-0.5">Panier</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Account */}
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-hover transition-colors"
                  aria-label="Menu utilisateur"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-text block leading-tight">{user.name}</span>
                    <span className="text-[10px] text-muted capitalize leading-tight">
                      {user.role === 'client' ? 'Client' : user.role === 'seller' ? 'Vendeur' : 'Admin'}
                    </span>
                  </div>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 border-border bg-surface border border-border rounded-xl shadow-lg py-1 z-20">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-semibold text-text">{user.name}</p>
                        <p className="text-xs text-muted">{user.email}</p>
                      </div>
                      <Link
                        to={getDashboardRoute(user.role)}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-text hover:bg-surface-hover transition-colors"
                      >
                        <LayoutDashboard size={16} /> Mon tableau de bord
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} /> Déconnexion
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/connexion"
                className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                <User size={16} />
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {[
              { label: 'Accueil', href: '/' },
              { label: 'Tous les produits', href: '/produits' },
              { label: 'Promotions', href: '/promotions' },
              { label: 'Favoris', href: '/favoris' },
              { label: 'Contact', href: '/contact' },
              { label: 'À propos', href: '/a-propos' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block py-2.5 px-3 text-sm text-text hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border pt-3 mt-3 space-y-2">
              <Link
                to={wishlistTarget}
                onClick={(e) => { handleWishlistClick(e); setMobileMenuOpen(false); }}
                className="block text-center py-2.5 text-sm border border-border rounded-lg hover:bg-primary/10"
              >
                Favoris
              </Link>
              <Link
                to={cartTarget}
                onClick={(e) => { handleCartClick(e); setMobileMenuOpen(false); }}
                className="block text-center py-2.5 text-sm border border-border rounded-lg hover:bg-primary/10"
              >
                Panier
              </Link>
              {user ? (
                <>
                  <Link
                    to={getDashboardRoute(user.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2.5 text-sm bg-primary text-white rounded-lg font-semibold"
                  >
                    Mon tableau de bord
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 text-sm bg-primary text-white rounded-lg font-semibold"
                >
                  Connexion / Inscription
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
