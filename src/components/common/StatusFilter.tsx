import { cn } from '../../lib/utils';

interface FilterOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

interface StatusFilterProps<T extends string> {
  readonly options: readonly FilterOption<T>[] | readonly T[];
  readonly value: T;
  readonly onChange: (value: T) => void;
  readonly className?: string;
  readonly allLabel?: string;
  readonly showAll?: boolean;
}

export default function StatusFilter<T extends string>({
  options,
  value,
  onChange,
  className,
  allLabel = 'Tous',
  showAll = true,
}: StatusFilterProps<T>) {
  const getLabel = (opt: FilterOption<T> | T): { value: T; label: string } => {
    if (typeof opt === 'string') {
      return {
        value: opt,
        label: opt === 'all' ? allLabel : opt.charAt(0).toUpperCase() + opt.slice(1),
      };
    }
    return opt;
  };

  const allOptions = showAll
    ? [{ value: 'all' as T, label: allLabel }, ...(options as readonly (FilterOption<T> | T)[]).map(getLabel)]
    : (options as readonly (FilterOption<T> | T)[]).map(getLabel);

  return (
    <div className={cn('flex gap-2 flex-wrap', className)} role="group" aria-label="Filtrer par statut">
      {allOptions.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors',
            value === opt.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-text hover:bg-gray-200'
          )}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
