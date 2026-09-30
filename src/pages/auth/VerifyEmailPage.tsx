import { useTitle } from '../../hooks';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowLeft, RotateCcw } from 'lucide-react';
import { useVerifyEmail, useResendVerification } from '../../hooks/queries/useAuthExtended';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

type Status = 'verifying' | 'success' | 'error' | 'expired' | 'already';

export default function VerifyEmailPage() {
  useTitle('Vérification de l\'adresse e-mail');
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<Status>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  const verifyMutation = useVerifyEmail();
  const resendMutation = useResendVerification();

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Lien de vérification invalide.');
      return;
    }

    verifyMutation.mutate(token, {
      onSuccess: () => setStatus('success'),
      onError: (error: any) => {
        const msg = error?.response?.data?.message || '';
        if (msg.includes('expir')) {
          setStatus('expired');
        } else if (msg.includes('déjà')) {
          setStatus('already');
        } else {
          setStatus('error');
          setErrorMessage(msg || 'Token de vérification invalide.');
        }
      },
    });
  }, [token]);

  const handleResend = () => {
    resendMutation.mutate(undefined, {
      onSuccess: () => {
        // Afficher un message de succès
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-2xl border border-border p-8 text-center">
          {/* States */}
          {status === 'verifying' && (
            <>
              <Loader2 size={48} className="mx-auto text-primary animate-spin mb-4" />
              <h1 className="text-xl font-bold text-primary mb-2">Vérification en cours...</h1>
              <p className="text-muted text-sm">Nous vérifions votre adresse e-mail.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h1 className="text-xl font-bold text-primary mb-2">Adresse e-mail vérifiée !</h1>
              <p className="text-muted text-sm mb-6">
                Votre compte est maintenant pleinement actif. Vous pouvez accéder à toutes les fonctionnalités.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Accéder à l'accueil
              </Link>
            </>
          )}

          {status === 'expired' && (
            <>
              <XCircle size={48} className="mx-auto text-amber-500 mb-4" />
              <h1 className="text-xl font-bold text-primary mb-2">Lien expiré</h1>
              <p className="text-muted text-sm mb-6">
                Ce lien de vérification a expiré. Veuillez demander un nouveau lien.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleResend}
                  loading={resendMutation.isPending}
                  className="w-full"
                >
                  <RotateCcw size={16} className="inline mr-2" />
                  Renvoyer l'e-mail de vérification
                </Button>
                {resendMutation.isSuccess && (
                  <p className="text-green-600 text-sm">
                    Un nouvel e-mail a été envoyé. Consultez votre boîte de réception.
                  </p>
                )}
                {resendMutation.isError && (
                  <p className="text-red-600 text-sm">
                    {(resendMutation.error as any)?.response?.data?.message || 'Erreur lors du renvoi.'}
                  </p>
                )}
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle size={48} className="mx-auto text-red-500 mb-4" />
              <h1 className="text-xl font-bold text-primary mb-2">Vérification échouée</h1>
              <p className="text-muted text-sm mb-2">{errorMessage}</p>
              <p className="text-muted text-sm mb-6">
                Ce lien n'est plus valide. Demandez un nouveau lien de vérification.
              </p>
              <div className="space-y-3">
                {user && (
                  <Button onClick={handleResend} loading={resendMutation.isPending} className="w-full">
                    <RotateCcw size={16} className="inline mr-2" />
                    Renvoyer l'e-mail de vérification
                  </Button>
                )}
                <Link
                  to="/connexion"
                  className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                >
                  <ArrowLeft size={14} /> Retour à la connexion
                </Link>
              </div>
            </>
          )}

          {status === 'already' && (
            <>
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h1 className="text-xl font-bold text-primary mb-2">Déjà vérifié</h1>
              <p className="text-muted text-sm mb-6">
                Votre adresse e-mail est déjà vérifiée. Votre compte est actif.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Accéder à l'accueil
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
