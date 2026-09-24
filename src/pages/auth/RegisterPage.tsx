import { useTitle } from '../../hooks';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

export default function RegisterPage() {
  useTitle('Créer un compte');
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    if (!form.name || !form.email || !form.password) return 'Veuillez remplir tous les champs.';
    if (form.password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères.';
    if (form.password !== form.confirmPassword) return 'Les mots de passe ne correspondent pas.';
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError('');
    try {
      const result = await register(form.email, form.password, form.name, 'client');
      if (result.success) {
        navigate('/dashboard/client', { replace: true });
      } else {
        setError(result.error || "Erreur lors de l'inscription.");
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full" />

        <div className="max-w-md text-white relative z-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 relative">
            <span className="text-primary font-extrabold text-3xl relative z-10">T</span>
            <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Rejoignez Tsena</h1>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Créez votre compte et découvrez des milliers de produits de qualité. Achetez en toute confiance.
          </p>
          <div className="space-y-3">
            {['Accès à des offres exclusives', 'Suivi de commande en temps réel', 'Retours simplifiés'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-accent text-xs font-bold">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary font-medium mb-6 transition-colors">
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>

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

          <h2 className="text-2xl font-bold text-primary mb-1">Créer un compte</h2>
          <p className="text-muted text-sm mb-6">Rejoignez la communauté Tsena en quelques clics</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg" role="alert">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Nom complet</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Votre nom" className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full pl-10 pr-10 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text" aria-label="Afficher/masquer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Confirmer le mot de passe</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>

            <Button type="submit" loading={loading} size="lg" className="w-full rounded-lg">
              Créer mon compte
            </Button>
          </form>

          <p className="text-sm text-muted text-center mt-6">
            Déjà un compte ?{' '}
            <Link to="/connexion" className="text-primary font-semibold hover:underline">Se connecter</Link>
          </p>
          <p className="text-sm text-muted text-center mt-1">
            Vous êtes vendeur ?{' '}
            <Link to="/inscription/vendeur" className="text-primary font-semibold hover:underline">Ouvrir une boutique</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
