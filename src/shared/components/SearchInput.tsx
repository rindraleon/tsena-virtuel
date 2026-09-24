import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'Rechercher...', className }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-surface"
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
          aria-label="Effacer la recherche"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
