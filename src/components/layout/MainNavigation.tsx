import { Link, useLocation } from 'react-router-dom';
import { mainNavItems } from '../../data/navigation';
import clsx from 'clsx';

export default function MainNavigation() {
  const location = useLocation();

  return (
    <nav className="bg-surface border-b border-border" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.id}>
                <Link
                  to={item.href}
                  className={clsx(
                    'block px-4 py-3 text-sm font-medium transition-colors border-b-2',
                    isActive
                      ? 'text-primary border-primary'
                      : 'text-text border-transparent hover:text-primary hover:border-primary/30'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Mobile */}
        <ul className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  to={item.href}
                  className={clsx(
                    'block px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text bg-surface-tertiary hover:bg-primary/10'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
