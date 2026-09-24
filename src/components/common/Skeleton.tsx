import clsx from 'clsx';

interface SkeletonProps {
  readonly className?: string;
  readonly width?: string;
  readonly height?: string;
  readonly rounded?: 'sm' | 'md' | 'lg' | 'full';
  readonly circle?: boolean;
}

const roundedMap = { sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', full: 'rounded-full' };

export default function Skeleton({ className, width, height, rounded = 'md', circle }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200',
        roundedMap[rounded],
        circle && 'rounded-full',
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

// Specialized skeletons
export function ProductCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <Skeleton height="160px" className="rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton height="16px" width="80%" />
        <Skeleton height="12px" width="40%" />
        <Skeleton height="20px" width="60%" />
        <Skeleton height="14px" width="50%" />
        <Skeleton height="40px" width="100%" rounded="lg" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton height="14px" width="60%" />
          <Skeleton height="28px" width="80%" />
          <Skeleton height="12px" width="50%" />
        </div>
        <Skeleton circle width="48px" height="48px" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden p-4">
      <div className="space-y-3">
        <div className="flex gap-3">
          {Array.from({ length: cols }, (_, colIndex) => (
            <Skeleton key={`header-${colIndex}`} height="12px" className="flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-3 py-2 border-t border-border">
            {Array.from({ length: cols }, (_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} height="16px" className="flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
