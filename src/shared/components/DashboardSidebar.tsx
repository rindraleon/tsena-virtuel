import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { type LucideIcon, ChevronLeft, X } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  children?: SidebarItem[];
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  title?: string;
}

export default function DashboardSidebar({ items, title = 'Menu' }: DashboardSidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  const renderItems = (list: SidebarItem[]) => {
    return list.map((item) => {
      const Icon = item.icon;
      return (
        <li key={item.id}>
          <Link
            to={item.href}
            onClick={() => setMobileOpen(false)}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative',
              isActive(item.href)
                ? 'bg-primary text-white'
                : 'text-text/70 hover:bg-surface-tertiary hover:text-text'
            )}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            <Icon size={20} className="shrink-0" aria-hidden="true" />
            {!collapsed && <span>{item.label}</span>}
            {item.badge !== undefined && !collapsed && (
              <span className="ml-auto bg-danger text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-surface-inverse text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={clsx(
        'hidden lg:flex flex-col bg-surface border-r border-border shrink-0 transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[240px]'
      )}>
        <div className="p-4 flex items-center justify-between border-b border-border">
          {!collapsed && <span className="font-bold text-primary text-sm">{title}</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-surface-tertiary text-muted transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft size={16} className={clsx('transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <ul className="space-y-1">{renderItems(items)}</ul>
        </nav>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-surface shadow-xl flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <span className="font-bold text-primary text-sm">{title}</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-hover" aria-label="Close sidebar">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              <ul className="space-y-1">{renderItems(items)}</ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Mobile toggle - passed as render prop */}
      {/* We expose toggleMobile via a button the header can use */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-30 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </>
  );
}

// ─── DASHBOARD HEADER ─────────────────────────────────
interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  onMenuClick?: () => void;
  notificationCount?: number;
  avatar?: string;
  userName: string;
  onLogout: () => void;
  badge?: ReactNode;
}

export function DashboardHeader({ title, subtitle, children, notificationCount = 0, avatar, userName, onLogout, badge }: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border px-4 md:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-bold text-lg text-primary">{title}</h1>
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        </div>
        {badge}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {/* Notifications */}
        <button className="relative p-2 text-muted hover:text-text transition-colors" aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-danger text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{notificationCount}</span>
          )}
        </button>
        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-tertiary transition-colors"
            aria-label="User menu"
            aria-expanded={menuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold overflow-hidden">
              {avatar ? <img src={avatar} alt={userName} className="w-full h-full object-cover" /> : userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block text-sm font-medium text-text">{userName}</span>
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-xl shadow-lg py-1 z-20">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-semibold text-text">{userName}</p>
                </div>
                <button onClick={() => { setMenuOpen(false); onLogout(); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
