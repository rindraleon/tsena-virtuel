import { useTitle } from '../../hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  useTitle('Mot de passe oublié');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto mt-20 animate-fade-in-up">
        <div className="bg-surface rounded-xl shadow-sm border border-border p-8 text-center">
          <CheckCircle2 size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2">Email envoyé !</h2>
          <p className="text-muted text-sm mb-6">
            Si un compte est associé à <strong>{email}</strong>, vous recevrez un lien de réinitialisation par email dans quelques minutes.
          </p>
          <Link to="/connexion" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            <ArrowLeft size={16} /> Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 animate-fade-in-up">
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-primary">Mot de passe oublié</h1>
          <p className="text-sm text-muted mt-2">
            Saisissez votre adresse email. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Mail size={18} /></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-70">
              {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
            </button>
          </div>
        </form>

        <p className="text-sm text-muted text-center mt-4">
          <Link to="/connexion" className="text-primary font-semibold hover:underline flex items-center justify-center gap-1">
            <ArrowLeft size={14} /> Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
