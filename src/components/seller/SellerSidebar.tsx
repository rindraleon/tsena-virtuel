import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Users,
  TrendingUp,
  Wallet,
  Store,
  User,
  LogOut,
  Menu,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { SidebarItem } from '../../shared/components/DashboardSidebar';

const sellerMenuItems: SidebarItem[] = [
  { id: 'overview', label: 'Tableau de bord', href: '/dashboard/vendeur', icon: LayoutDashboard },
  { id: 'products', label: 'Produits', href: '/dashboard/vendeur/products', icon: Package },
  { id: 'add-product', label: 'Ajouter un produit', href: '/dashboard/vendeur/products/new', icon: PlusCircle },
  { id: 'orders', label: 'Commandes', href: '/dashboard/vendeur/orders', icon: ShoppingBag, badge: 3 },
  { id: 'customers', label: 'Clients', href: '/dashboard/vendeur/customers', icon: Users },
  { id: 'sales', label: 'Ventes', href: '/dashboard/vendeur/sales', icon: TrendingUp },
  { id: 'earnings', label: 'Revenus', href: '/dashboard/vendeur/earnings', icon: Wallet },
  { id: 'store', label: 'Ma boutique', href: '/dashboard/vendeur/store', icon: Store },
  { id: 'profile', label: 'Profil', href: '/dashboard/vendeur/profile', icon: User },
];

export default function SellerSidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <aside className="hidden lg:flex flex-col w-[240px] bg-surface border-r border-border shrink-0">
        <div className="p-4 border-b border-border">
          <span className="font-bold text-primary text-sm">Espace vendeur</span>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <ul className="space-y-1">
            {sellerMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link to={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'text-text/70 hover:bg-surface-hover'}`}>
                    <Icon size={20} /><span>{item.label}</span>
                    {item.badge !== undefined && <span className="ml-auto bg-danger text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>}
                  </Link>
                </li>
              );
            })}
            <li><button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 mt-4">
              <LogOut size={20} /> <span>Déconnexion</span>
            </button></li>
          </ul>
        </nav>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-surface shadow-xl flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <span className="font-bold text-primary text-sm">Espace vendeur</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-hover"><span className="text-muted text-xl">×</span></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              <ul className="space-y-1">
                {sellerMenuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li key={item.id}>
                      <Link to={item.href} onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'text-text/70 hover:bg-surface-hover'}`}>
                        <Icon size={20} /><span>{item.label}</span>
                        {item.badge !== undefined && <span className="ml-auto bg-danger text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>}
                      </Link>
                    </li>
                  );
                })}
                <li><button onClick={() => { setMobileOpen(false); logout(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 mt-4">
                  <LogOut size={20} /> <span>Déconnexion</span>
                </button></li>
              </ul>
            </nav>
          </aside>
        </div>
      )}

      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed bottom-4 right-4 z-30 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center" aria-label="Ouvrir le menu">
        <Menu size={20} />
      </button>
    </>
  );
}
