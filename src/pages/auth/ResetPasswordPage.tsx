import { useTitle } from '../../hooks';
import { useState, type FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import { useResetPassword } from '../../hooks/queries/useAuthExtended';

export default function ResetPasswordPage() {
  useTitle('Réinitialiser le mot de passe');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  const mutation = useResetPassword();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!token) {
      setLocalError('Lien de réinitialisation invalide.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 8) {
      setLocalError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setLocalError('Le mot de passe doit contenir une majuscule, une minuscule et un chiffre.');
      return;
    }

    mutation.mutate(
      { token, newPassword: password },
      {
        onSuccess: () => setSuccess(true),
        onError: (error: any) => {
          const msg = error?.response?.data?.message || '';
          setLocalError(msg || 'Une erreur est survenue.');
        },
      }
    );
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface rounded-2xl border border-border p-8 text-center">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-xl font-bold text-primary mb-2">Mot de passe réinitialisé !</h1>
          <p className="text-muted text-sm mb-6">
            Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>
          <Link
            to="/connexion"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/connexion" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Retour à la connexion
        </Link>

        <div className="bg-surface rounded-2xl border border-border p-8">
          {!token ? (
            <div className="text-center">
              <XCircle size={48} className="mx-auto text-red-500 mb-4" />
              <h1 className="text-xl font-bold text-primary mb-2">Lien invalide</h1>
              <p className="text-muted text-sm mb-6">
                Ce lien de réinitialisation n'est pas valide ou a expiré.
              </p>
              <Link
                to="/mot-de-passe-oublie"
                className="text-sm text-primary font-semibold hover:underline"
              >
                Demander un nouveau lien
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-primary mb-1">Réinitialiser le mot de passe</h1>
              <p className="text-muted text-sm mb-6">
                Saisissez votre nouveau mot de passe ci-dessous.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {(localError || mutation.isError) && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                    {localError || (mutation.error as any)?.response?.data?.message || 'Une erreur est survenue.'}
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text mb-1.5">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1.5">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                  </div>
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Les mots de passe ne correspondent pas.</p>
                  )}
                </div>

                {/* Indicateur de force du mot de passe */}
                {password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[
                        password.length >= 8,
                        /[A-Z]/.test(password),
                        /[a-z]/.test(password),
                        /\d/.test(password),
                      ].map((met, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${met ? 'bg-green-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted">
                      {password.length < 8 && 'Au moins 8 caractères '}
                      {!/[A-Z]/.test(password) && 'une majuscule '}
                      {!/[a-z]/.test(password) && 'une minuscule '}
                      {!/\d/.test(password) && 'un chiffre'}
                    </p>
                  </div>
                )}

                <Button type="submit" loading={mutation.isPending} size="lg" className="w-full">
                  Réinitialiser le mot de passe
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
