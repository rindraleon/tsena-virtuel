import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, UserCheck, Package, FolderOpen,
  ShoppingBag, CreditCard, BarChart3, Megaphone, Settings,
  
} from 'lucide-react';
import DashboardSidebar, { type SidebarItem } from '../shared/components/DashboardSidebar';
import DashboardTopBar from '../components/layout/DashboardTopBar';
import { useState } from 'react';

const adminMenuItems: SidebarItem[] = [
  { id: 'overview', label: 'Tableau de bord', href: '/dashboard/admin', icon: LayoutDashboard },
  { id: 'users', label: 'Utilisateurs', href: '/dashboard/admin/utilisateurs', icon: Users },
  { id: 'sellers', label: 'Vendeurs', href: '/dashboard/admin/vendeurs', icon: UserCheck, badge: 2 },
  { id: 'products', label: 'Produits', href: '/dashboard/admin/produits', icon: Package },
  { id: 'categories', label: 'Catégories', href: '/dashboard/admin/categories', icon: FolderOpen },
  { id: 'orders', label: 'Commandes', href: '/dashboard/admin/commandes', icon: ShoppingBag },
  { id: 'payments', label: 'Paiements', href: '/dashboard/admin/paiements', icon: CreditCard },
  { id: 'reports', label: 'Rapports', href: '/dashboard/admin/rapports', icon: BarChart3 },
  { id: 'promotions', label: 'Promotions', href: '/dashboard/admin/promotions', icon: Megaphone },
  { id: 'settings', label: 'Paramètres', href: '/dashboard/admin/parametres', icon: Settings },
];

export default function AdminDashboardLayout() {
  const { user: _user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPage = adminMenuItems.find((i) => location.pathname === i.href);

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:block">
        <DashboardSidebar items={adminMenuItems} title="Panneau admin" />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopBar
          title={currentPage?.label || 'Tableau de bord'}
          subtitle="Administration du système"
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-surface shadow-xl flex flex-col animate-slide-in-right">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <span className="font-bold text-primary text-sm">Panneau admin</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-hover"><span className="text-muted text-xl">×</span></button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              <ul className="space-y-1">
                {adminMenuItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.href;
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
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
