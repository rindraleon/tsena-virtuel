import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const shopLinks = {
  title: 'Boutique',
  links: [
    { label: 'Tous les produits', href: '/produits' },
    { label: 'Promotions', href: '/promotions' },
    { label: 'Nouveautés', href: '/produits' },
    { label: 'Meilleures ventes', href: '/produits' },
  ],
};

const customerServiceLinks = {
  title: 'Service client',
  links: [
    { label: 'Suivre ma commande', href: '/dashboard/client/mes-commandes' },
    { label: 'Contactez-nous', href: '/contact' },
    { label: 'Politique de livraison', href: '/a-propos' },
    { label: 'Conditions générales', href: '/a-propos' },
  ],
};

const informationLinks = {
  title: 'Informations',
  links: [
    { label: 'À propos', href: '/a-propos' },
    { label: 'Devenir vendeur', href: '/inscription/vendeur' },
    { label: 'Contact', href: '/contact' },
  ],
};

const paymentMethods = ['VISA', 'MasterCard', 'JazzCash', 'EasyPaisa'];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Logo & description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center relative overflow-hidden">
                <span className="text-primary font-extrabold text-xl relative z-10">T</span>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary/20 rounded-full" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </div>
              <div>
                <span className="font-extrabold text-white text-xl leading-none block tracking-tight">Tsena</span>
                <span className="text-[9px] text-white/50 font-medium leading-tight block tracking-[0.15em] uppercase">Marketplace</span>
              </div>
            </Link>
            <p className="text-white/70 text-xs leading-relaxed mb-4">Votre marketplace de confiance pour des produits de qualité aux meilleurs prix.</p>
          </div>

          {/* Link groups */}
          {[shopLinks, customerServiceLinks, informationLinks].map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-sm mb-4">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-white/70 text-xs hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+261341234567" className="flex items-center gap-2 text-white/70 text-xs hover:text-accent transition-colors">
                  <Phone size={14} /> +261 34 12 345 67
                </a>
              </li>
              <li>
                <a href="mailto:info@tsena.com" className="flex items-center gap-2 text-white/70 text-xs hover:text-accent transition-colors">
                  <Mail size={14} /> info@tsena.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-xs">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                Antananarivo, Madagascar
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">© {new Date().getFullYear()} Tsena. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-xs">Nous acceptons :</span>
            <div className="flex items-center gap-2">
              {paymentMethods.map((m) => (
                <span key={m} className="text-[10px] text-white/70 bg-white/10 px-2 py-1 rounded font-medium">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
