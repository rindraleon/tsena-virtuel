import { useTitle } from '../../hooks';
import { ShieldCheck, Users, Store, TrendingUp, Truck, HeadphonesIcon, CreditCard, RefreshCw } from 'lucide-react';

export default function AboutPage() {
  useTitle('À propos');
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-primary mb-2">À propos de Tsena</h1>
      <p className="text-muted mb-8 max-w-3xl">
        Tsena est votre marketplace de confiance en Afrique de l'Est. Nous connectons vendeurs vérifiés
        et acheteurs pour offrir une expérience d'achat en ligne sûre, pratique et diversifiée.
      </p>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { icon: ShieldCheck, title: 'Sécurité', desc: 'Transactions protégées et données chiffrées' },
          { icon: Users, title: 'Communauté', desc: 'Des milliers de vendeurs et clients satisfaits' },
          { icon: Store, title: 'Diversité', desc: 'Des milliers de produits de toutes catégories' },
          { icon: TrendingUp, title: 'Croissance', desc: 'Une plateforme en constante évolution' },
        ].map((item) => (
          <div key={item.title} className="bg-surface rounded-xl border border-border p-5 text-center">
            <item.icon size={32} className="mx-auto text-primary mb-3" />
            <h3 className="font-semibold text-text mb-1">{item.title}</h3>
            <p className="text-sm text-muted">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Services */}
      <h2 className="text-xl font-bold text-primary mb-4">Nos engagements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {[
          { icon: Truck, title: 'Livraison rapide', desc: 'Livraison dans tout le pays, gratuite dès 2 000 PKR d\'achat.' },
          { icon: RefreshCw, title: 'Retours faciles', desc: 'Retour sous 7 jours sur les produits non utilisés.' },
          { icon: CreditCard, title: 'Paiement sécurisé', desc: 'Cash à la livraison, paiement en ligne, mobile money.' },
          { icon: HeadphonesIcon, title: 'Support 7j/7', desc: 'Une équipe dédiée pour répondre à vos questions.' },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 bg-surface rounded-xl border border-border p-5">
            <div className="shrink-0 p-2 rounded-lg bg-primary/10"><item.icon size={24} className="text-primary" /></div>
            <div><h3 className="font-semibold text-text mb-1">{item.title}</h3><p className="text-sm text-muted">{item.desc}</p></div>
          </div>
        ))}
      </div>

      {/* For sellers */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
        <Store size={40} className="mx-auto text-primary mb-3" />
        <h2 className="text-xl font-bold text-primary mb-2">Vous êtes vendeur ?</h2>
        <p className="text-muted mb-4">Rejoignez Tsena et développez votre activité en ligne avec des milliers de clients potentiels.</p>
        <a href="#/inscription/vendeur" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
          Devenir vendeur
        </a>
      </div>
    </div>
  );
}
