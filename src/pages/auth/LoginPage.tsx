import { useTitle } from '../../hooks';
import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

export default function LoginPage() {
  useTitle('Connexion');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/dashboard/client';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Échec de la connexion');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full" />

        <div className="max-w-md text-white relative z-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 relative">
            <span className="text-primary font-extrabold text-3xl relative z-10">T</span>
            <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Bienvenue sur Tsena</h1>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Votre marketplace de confiance. Des milliers de produits de qualité aux meilleurs prix, livrés chez vous.
          </p>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-accent">10K+</p>
              <p className="text-white/50 text-xs">Clients satisfaits</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-accent">5K+</p>
              <p className="text-white/50 text-xs">Produits disponibles</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-accent">500+</p>
              <p className="text-white/50 text-xs">Vendeurs vérifiés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Back to home */}
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center relative overflow-hidden">
              <span className="text-accent font-extrabold text-xl relative z-10">T</span>
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-accent rounded-full" />
            </div>
            <div>
              <span className="font-extrabold text-primary text-xl tracking-tight block leading-none">Tsena</span>
              <span className="text-[9px] text-muted font-medium tracking-[0.15em] uppercase">Marketplace</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-1">Connexion</h2>
          <p className="text-muted text-sm mb-6">Entrez vos identifiants pour accéder à votre compte</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg" role="alert">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                Se souvenir de moi
              </label>
              <Link to="/mot-de-passe-oublie" className="text-sm text-primary font-medium hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" loading={loading} size="lg" className="w-full rounded-lg">
              Se connecter
            </Button>
          </form>

          <p className="text-sm text-muted text-center mt-6">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="text-primary font-semibold hover:underline">Créer un compte</Link>
          </p>
          <p className="text-sm text-muted text-center mt-1">
            Vous êtes vendeur ?{' '}
            <Link to="/inscription/vendeur" className="text-primary font-semibold hover:underline">Ouvrir une boutique</Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-border">
            <p className="text-xs font-semibold text-muted mb-2">Comptes de démonstration :</p>
            <div className="space-y-1 text-xs text-muted">
              <p><span className="font-medium text-text">Admin :</span> admin@tsena.com / admin123</p>
              <p><span className="font-medium text-text">Vendeur :</span> bilal@seller.com / seller123</p>
              <p><span className="font-medium text-text">Client :</span> ahmed@example.com / client123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
