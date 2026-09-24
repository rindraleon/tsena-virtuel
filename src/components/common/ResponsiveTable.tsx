import { MoreVertical } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import clsx from 'clsx';

export interface TableColumn<T> {
  readonly header: string;
  readonly accessor: keyof T | ((row: T) => ReactNode);
  readonly className?: string;
  readonly mobile?: boolean;
}

interface ResponsiveTableProps<T extends { id: string }> {
  readonly columns: readonly TableColumn<T>[];
  readonly data: readonly T[];
  readonly emptyMessage?: string;
  readonly onRowClick?: (row: T) => void;
  readonly actions?: (row: T) => ReactNode;
  readonly renderMobileCard?: (row: T) => ReactNode;
  readonly titleKey?: keyof T;
  readonly subtitleKey?: keyof T;
  readonly statusKey?: keyof T;
  readonly imageKey?: keyof T;
}

function getValue<T>(row: T, accessor: keyof T | ((row: T) => ReactNode)): ReactNode {
  if (typeof accessor === 'function') return accessor(row);
  const val = row[accessor];
  return val !== null && val !== undefined ? String(val) : '—';
}

export default function ResponsiveTable<T extends { id: string }>({
  columns,
  data,
  emptyMessage = 'Aucune donnée disponible.',
  onRowClick,
  actions,
  renderMobileCard,
  titleKey,
  subtitleKey,
  statusKey,
  imageKey,
}: ResponsiveTableProps<T>) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (data.length === 0) {
    return (
      <div className="bg-surface rounded-xl border border-border p-10 text-center text-muted text-sm">
        {emptyMessage}
      </div>
    );
  }

  const visibleColumns = columns.filter((c) => c.mobile !== false);

  return (
    <>
      {/* ── Desktop: Table ── */}
      <div className="hidden md:block bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                {columns.map((col) => (
                  <th key={col.header} className={clsx('px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider', col.className)}>
                    {col.header}
                  </th>
                ))}
                {actions && <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={clsx(onRowClick && 'cursor-pointer hover:bg-gray-50 transition-colors')}
                >
                  {columns.map((col) => (
                    <td key={col.header} className={clsx('px-4 py-3.5', col.className)}>
                      {getValue(row, col.accessor)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile: Cards ── */}
      <div className="md:hidden space-y-3">
        {data.map((row) => {
          // If custom card renderer is provided, use it
          if (renderMobileCard) {
            return (
              <div key={row.id} className="bg-surface rounded-xl border border-border p-4 animate-fade-in-up">
                {renderMobileCard(row)}
              </div>
            );
          }

          // Default card rendering
          const title = titleKey ? String(row[titleKey] || '') : '';
          const subtitle = subtitleKey ? String(row[subtitleKey] || '') : '';
          const status = statusKey ? row[statusKey] : undefined;
          const image = imageKey ? row[imageKey] as string | undefined : undefined;

          return (
            <div key={row.id} className="bg-surface rounded-xl border border-border p-4 animate-fade-in-up">
              <div className="flex items-start gap-3 mb-3">
                {image && (
                  <img src={image} alt={title} className="w-12 h-12 rounded-lg object-cover shrink-0" width={48} height={48} />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text text-sm truncate">{title}</h3>
                  {subtitle && <p className="text-xs text-muted mt-0.5 truncate">{subtitle}</p>}
                </div>
                {status && (
                  <span className="text-xs font-medium bg-gray-100 text-text px-2 py-0.5 rounded-full">
                    {String(status)}
                  </span>
                )}
                {actions && (
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                      className="p-1 rounded-lg hover:bg-gray-100 text-muted"
                      aria-label="Actions"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openMenuId === row.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-0 top-8 bg-surface border border-border rounded-xl shadow-lg py-1 z-20 min-w-[140px]">
                          {actions(row)}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="space-y-1.5">
                {visibleColumns.map((col) => {
                  if (titleKey && col.accessor === titleKey) return null;
                  if (subtitleKey && col.accessor === subtitleKey) return null;
                  if (statusKey && col.accessor === statusKey) return null;
                  if (imageKey && col.accessor === imageKey) return null;
                  return (
                    <div key={col.header} className="flex items-center justify-between text-xs">
                      <span className="text-muted">{col.header}</span>
                      <span className="text-text font-medium">{getValue(row, col.accessor)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
