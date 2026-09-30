import { useTitle } from '../../hooks';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import { useForgotPassword } from '../../hooks/queries/useAuthExtended';

export default function ForgotPasswordPage() {
  useTitle('Mot de passe oublié');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const mutation = useForgotPassword();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    mutation.mutate(email.trim(), {
      onSuccess: () => setSubmitted(true),
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/connexion" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Retour à la connexion
        </Link>

        <div className="bg-surface rounded-2xl border border-border p-8">
          {!submitted ? (
            <>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Mail size={24} className="text-primary" />
              </div>

              <h1 className="text-xl font-bold text-primary mb-1">Mot de passe oublié ?</h1>
              <p className="text-muted text-sm mb-6">
                Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                    Adresse e-mail
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {mutation.isError && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                    {(mutation.error as any)?.response?.data?.message || 'Une erreur est survenue.'}
                  </div>
                )}

                <Button type="submit" loading={mutation.isPending} size="lg" className="w-full">
                  Envoyer le lien de réinitialisation
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h1 className="text-xl font-bold text-primary mb-2">E-mail envoyé !</h1>
              <p className="text-muted text-sm mb-6">
                Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un lien de réinitialisation.
                Consultez votre boîte de réception et vos spams.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-primary font-medium hover:underline"
              >
                Renvoyer un autre e-mail
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-muted text-center mt-6">
          Vous vous souvenez de votre mot de passe ?{' '}
          <Link to="/connexion" className="text-primary font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
