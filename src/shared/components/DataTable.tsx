import { type ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string }>({ columns, data, onRowClick, emptyMessage = 'Aucune donnée disponible' }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-surface rounded-xl border border-border p-10 text-center">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              {columns.map((col) => (
                <th key={col.header} className={`px-4 py-3 text-left font-semibold text-muted text-xs uppercase tracking-wider ${col.className ?? ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? 'cursor-pointer hover:bg-surface-secondary transition-colors' : ''}
              >
                {columns.map((col) => (
                  <td key={col.header} className={`px-4 py-3.5 ${col.className ?? ''}`}>
                    {typeof col.accessor === 'function' ? col.accessor(row) : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
