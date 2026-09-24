import { type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly action?: {
    readonly label: string;
    readonly icon?: LucideIcon;
    readonly onClick?: () => void;
    readonly href?: string;
  };
  readonly className?: string;
}

export default function SectionHeader({ title, subtitle, action, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-primary">{title}</h2>
        {subtitle && (
          <p className="text-muted text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <ActionLink action={action} />
      )}
    </div>
  );
}

function ActionLink({ action }: { readonly action: NonNullable<SectionHeaderProps['action']> }) {
  const ActionIcon = action.icon;

  const content = (
    <>
      {action.label}
      {ActionIcon ? <ActionIcon size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /> : <span aria-hidden="true">→</span>}
    </>
  );

  if (action.href) {
    return (
      <Link
        to={action.href}
        onClick={action.onClick}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light transition-colors group"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={action.onClick}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light transition-colors group cursor-pointer"
    >
      {content}
    </button>
  );
}
