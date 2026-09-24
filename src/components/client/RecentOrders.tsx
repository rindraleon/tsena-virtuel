import { Link } from 'react-router-dom';
import type { Order } from '../../types';
import StatusBadge from '../../shared/components/StatusBadge';

interface RecentOrdersProps {
  readonly orders: readonly Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text">Commandes récentes</h3>
        <Link to="/dashboard/client/orders" className="text-sm text-primary font-medium hover:underline">Voir tout</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs font-semibold text-muted uppercase">N° commande</th>
              <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Date</th>
              <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Articles</th>
              <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Total</th>
              <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-surface-hover">
                <td className="py-3 font-medium text-primary">{order.id}</td>
                <td className="py-3 text-muted">{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                <td className="py-3 text-text">{order.products.length} article(s)</td>
                <td className="py-3 font-semibold">{order.total.toLocaleString('fr-FR')} PKR</td>
                <td className="py-3"><StatusBadge status={order.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
