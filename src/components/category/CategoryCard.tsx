import type { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  readonly category: {
    readonly id: string;
    readonly name: string;
    readonly icon?: string;
    readonly image?: string;
    readonly lucideIcon?: LucideIcon;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.lucideIcon;
  return (
    <a
      href={`/category/${category.id}`}
      className="flex flex-col items-center gap-2 group min-w-[80px] md:min-w-[100px]"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface border border-border overflow-hidden flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-md transition-all duration-200">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            loading="lazy"
            width={80}
            height={80}
          />
        ) : Icon ? (
          <Icon size={28} className="text-primary" aria-hidden="true" />
        ) : (
          <span className="text-2xl" role="img" aria-label={category.name}>
            {category.icon || ''}
          </span>
        )}
      </div>
      <span className="text-xs md:text-sm text-center text-text font-medium group-hover:text-primary transition-colors">
        {category.name}
      </span>
    </a>
  );
}
