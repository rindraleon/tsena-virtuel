import { useTitle } from '../../hooks';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  useTitle('Contact');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-primary mb-2">Contactez-nous</h1>
      <p className="text-muted mb-8">Une question, un problème ou une suggestion ? Nous sommes à votre écoute.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-border p-6">
            <h2 className="font-bold text-text mb-4">Nos coordonnées</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10"><MapPin size={20} className="text-primary" /></div>
                <div><p className="font-medium text-text">Adresse</p><p className="text-sm text-muted">Blue Area, Islamabad, Pakistan</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10"><Phone size={20} className="text-primary" /></div>
                <div><p className="font-medium text-text">Téléphone</p><p className="text-sm text-muted">+92 51 123 4567</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10"><Mail size={20} className="text-primary" /></div>
                <div><p className="font-medium text-text">Email</p><p className="text-sm text-muted">contact@tsena.com</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10"><Clock size={20} className="text-primary" /></div>
                <div><p className="font-medium text-text">Horaires</p><p className="text-sm text-muted">Lun - Sam : 9h - 18h</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-surface rounded-xl border border-border p-6">
          {submitted ? (
            <div className="text-center py-10 animate-fade-in-up">
              <Send size={48} className="mx-auto text-primary mb-4" />
              <h2 className="text-xl font-bold text-text mb-2">Message envoyé !</h2>
              <p className="text-muted">Nous vous répondrons dans les plus brefs délais.</p>
              <button onClick={() => setSubmitted(false)} className="text-primary font-medium mt-4 hover:underline">Envoyer un autre message</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <h2 className="font-bold text-text mb-4">Envoyez-nous un message</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Nom complet</label>
                  <input type="text" required className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Email</label>
                  <input type="email" required className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Sujet</label>
                  <input type="text" required className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Message</label>
                  <textarea rows={4} required className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary resize-none" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                  <Send size={16} /> Envoyer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
