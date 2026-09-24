import { useState, type FormEvent } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMsg('Veuillez entrer votre adresse email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Veuillez entrer une adresse email valide');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-8 md:py-12" aria-label="Inscription à la newsletter">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="bg-surface rounded-2xl border border-border p-6 md:p-10 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
                Inscrivez-vous à notre newsletter
              </h2>
              <p className="text-muted text-sm">
                Recevez les dernières nouveautés, offres exclusives et bien plus encore.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Votre adresse email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                    status === 'error'
                      ? 'border-danger focus:ring-danger/20'
                      : 'border-border focus:border-primary focus:ring-primary/20'
                  }`}
                  aria-label="Adresse email"
                  aria-invalid={status === 'error'}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="shrink-0"
              >
                S'inscrire
              </Button>
            </form>
          </div>
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.p
                key="success"
                className="text-success text-sm mt-3 text-center flex items-center justify-center gap-2"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <CheckCircle size={16} /> Merci pour votre inscription !
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                key="error"
                className="text-danger text-sm mt-3 text-center flex items-center justify-center gap-2"
                role="alert"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <AlertCircle size={16} /> {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
