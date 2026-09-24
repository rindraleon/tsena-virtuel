import { type ReactNode } from 'react';
import { useTitle } from '../hooks';

interface StubPageProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function StubPage({ title, subtitle = 'Cette section sera bientôt disponible.', icon }: StubPageProps) {
  useTitle(title);
  return (
    <div className="bg-surface rounded-xl border border-border p-10 text-center">
      {icon && <div className="mb-4 text-primary inline-block">{icon}</div>}
      <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-muted text-sm">{subtitle}</p>
    </div>
  );
}
