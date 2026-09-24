import { Truck, RotateCcw, ShieldCheck, BadgeCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  { icon: <Truck size={24} />, title: 'Livraison gratuite', description: 'Dès 2 000 PKR d\'achat' },
  { icon: <RotateCcw size={24} />, title: 'Retour sous 7 jours', description: 'Politique de retour simplifiée' },
  { icon: <ShieldCheck size={24} />, title: 'Paiement sécurisé', description: 'Paiement 100% sécurisé' },
  { icon: <BadgeCheck size={24} />, title: 'Produits authentiques', description: '100% originaux et de qualité' },
  { icon: <Headphones size={24} />, title: 'Support 24/7', description: 'Nous sommes là pour vous aider' },
];

export default function BenefitsSection() {
  return (
    <section className="py-8 md:py-12 bg-surface border-y border-border" aria-label="Nos avantages">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="text-primary shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="font-semibold text-sm text-text">{benefit.title}</h3>
                <p className="text-xs text-muted mt-0.5">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
