import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Bell, LogOut, Menu } from 'lucide-react';
import ThemeSelector from '../common/ThemeSelector';

interface DashboardTopBarProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly onMenuClick?: () => void;
}

export default function DashboardTopBar({ title, subtitle, onMenuClick }: DashboardTopBarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-surface border-b border-border px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg bg-surface-hover text-muted hover:text-text transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Logo — always links to home */}
        <Link to="/" className="flex items-center gap-2 shrink-0 mr-4" aria-label="Retour à l'accueil Tsena">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center relative overflow-hidden">
            <span className="text-accent font-extrabold text-sm relative z-10">T</span>
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-accent rounded-full" />
          </div>
          <span className="hidden sm:inline font-extrabold text-primary text-base tracking-tight">Tsena</span>
        </Link>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-border" />

        {/* Page title */}
        <div className="hidden sm:block">
          <h1 className="font-bold text-base text-text leading-tight">{title}</h1>
          {subtitle && <p className="text-[11px] text-muted leading-tight">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Theme selector */}
        <ThemeSelector />

        {/* Back to home */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-text font-medium px-2 sm:px-3 py-1.5 rounded-lg bg-surface-hover hover:bg-surface-tertiary transition-colors"
          title="Retour à l'accueil"
        >
          <Home size={16} />
          <span className="hidden sm:inline">Accueil</span>
        </Link>

        {/* Notifications */}
        <button className="relative p-2 text-muted hover:text-text transition-colors rounded-lg bg-surface-hover hover:bg-surface-tertiary" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 bg-danger text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">3</span>
        </button>

        {/* User avatar */}
        <Link to="/" className="flex items-center gap-2 p-1 rounded-lg bg-surface-hover hover:bg-surface-tertiary transition-colors">
          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <span className="hidden md:block text-sm font-medium text-text max-w-[100px] truncate">{user?.name}</span>
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 text-muted hover:text-danger transition-colors rounded-lg bg-surface-hover hover:bg-red-50 dark:hover:bg-red-950/30"
          title="Déconnexion"
          aria-label="Déconnexion"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
