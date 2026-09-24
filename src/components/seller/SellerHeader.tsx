import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, LogOut } from 'lucide-react';

interface SellerHeaderProps {
  title: string;
  subtitle?: string;
  notificationCount?: number;
}

export default function SellerHeader({ title, subtitle, notificationCount = 3 }: SellerHeaderProps) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-bold text-lg text-primary">{title}</h1>
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-muted hover:text-text" aria-label="Notifications">
          <Bell size={20} />
          {notificationCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-danger text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{notificationCount}</span>}
        </button>
        <div className="relative group">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-hover" aria-label="Menu utilisateur">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">{user?.name?.charAt(0) || 'V'}</div>
            <span className="hidden md:block text-sm font-medium text-text">{user?.name}</span>
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-xl shadow-lg py-1 z-20">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-semibold text-text">{user?.name}</p>
                  <p className="text-xs text-muted">{user?.email}</p>
                </div>
                <Link to="/dashboard/vendeur/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-text hover:bg-surface-hover">Mon profil</Link>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <LogOut size={14} /> Déconnexion
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
