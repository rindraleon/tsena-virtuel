import { useTitle } from '../../hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SellerRegisterPage() {
  useTitle('Devenir vendeur');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', storeName: '', city: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register } = useAuth();

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.storeName) return 'Veuillez remplir tous les champs obligatoires.';
    if (form.password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères.';
    if (form.password !== form.confirmPassword) return 'Les mots de passe ne correspondent pas.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError('');
    try {
      const result = await register(form.email, form.password, form.name, 'seller');
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Erreur lors de l\'inscription.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 animate-fade-in-up">
        <div className="bg-surface rounded-xl shadow-sm border border-border p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <Store size={32} className="text-accent" />
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">Demande envoyée !</h2>
          <p className="text-muted text-sm mb-6">
            Votre demande de compte vendeur a été soumise à l'administration. Vous recevrez une confirmation par email une fois votre compte approuvé.
          </p>
          <Link to="/connexion" className="w-full inline-flex justify-center bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-8 mb-10 animate-fade-in-up">
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-3">
            <Store size={28} className="text-accent" />
          </div>
          <h1 className="text-xl font-bold text-primary">Inscription Vendeur</h1>
          <p className="text-sm text-muted mt-1">Créez votre boutique sur Tsena</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Nom complet *</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"><User size={18} /></div>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Email *</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Mail size={18} /></div>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Téléphone</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Phone size={18} /></div>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Nom de la boutique *</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Store size={18} /></div>
                <input type="text" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Ville</label>
              <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Description de votre boutique</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Mot de passe *</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Lock size={18} /></div>
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Confirmer le mot de passe *</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-70">
              {loading ? 'Envoi en cours...' : 'Soumettre ma demande'}
            </button>
          </div>
        </form>

        <p className="text-sm text-muted text-center mt-4">
          Déjà un compte ? <Link to="/connexion" className="text-primary font-semibold hover:underline">Se connecter</Link>
        </p>
        <p className="text-sm text-muted text-center mt-2">
          Inscription client ? <Link to="/inscription" className="text-primary font-semibold hover:underline">S'inscrire ici</Link>
        </p>
      </div>
    </div>
  );
}
