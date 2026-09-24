import { Eye } from 'lucide-react';
import StatusBadge from '../../shared/components/StatusBadge';
import type { Order } from '../../types';

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">N° commande</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Vendeur</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Articles</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Total</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-surface-hover">
                <td className="px-4 py-3 font-medium text-primary">{order.id}</td>
                <td className="px-4 py-3 text-muted">{order.userName}</td>
                <td className="px-4 py-3 text-muted">{order.sellerName || '—'}</td>
                <td className="px-4 py-3 text-muted">{order.products.length} article(s)</td>
                <td className="px-4 py-3 font-semibold">{order.total.toLocaleString('fr-FR')} PKR</td>
                <td className="px-4 py-3 text-muted">{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                <td className="px-4 py-3">
                  <button className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Voir les détails"><Eye size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
