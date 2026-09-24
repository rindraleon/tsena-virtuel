import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly actions?: ReactNode;
  readonly breadcrumb?: readonly { readonly label: string; readonly href?: string }[];
}

export default function PageHeader({ title, subtitle, actions, breadcrumb }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-muted mb-1" aria-label="Breadcrumb">
            {breadcrumb.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                {breadcrumb.indexOf(item) > 0 && <span aria-hidden="true">/</span>}
                {item.href ? (
                  <Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
                ) : (
                  <span className="text-text font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-xl md:text-2xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
