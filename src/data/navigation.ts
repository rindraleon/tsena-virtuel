export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'products', label: 'Tous les produits', href: '/produits' },
  { id: 'promos', label: 'Promotions', href: '/promotions' },
  { id: 'favorites', label: 'Favoris', href: '/favoris' },
  { id: 'contact', label: 'Contact', href: '/contact' },
  { id: 'about', label: 'À propos', href: '/a-propos' },
];
