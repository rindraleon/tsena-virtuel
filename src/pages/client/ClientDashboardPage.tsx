import { useTitle } from '../../hooks';
import { ShoppingBag, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import StatCard from '../../shared/components/StatCard';
import { mockOrders } from '../../shared/data/mockData';
import StatusBadge from '../../shared/components/StatusBadge';
import { useAuth } from '../../context/AuthContext';

export default function ClientDashboardPage() {
  useTitle('Tableau de bord | Client');
  const { user } = useAuth();
  const myOrders = mockOrders.filter((o) => o.userId === user?.id);

  const totalSpent = myOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingOrders = myOrders.filter((o) => ['pending', 'confirmed', 'processing'].includes(o.status)).length;
  const completedOrders = myOrders.filter((o) => o.status === 'delivered').length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Bon retour, {user?.name?.split(' ')[0]} !</h2>
        <p className="text-muted text-sm mt-1">Voici un résumé de votre compte aujourd'hui.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total commandes" value={myOrders.length} icon={ShoppingBag} color="primary" />
        <StatCard title="Commandes en attente" value={pendingOrders} icon={Clock} color="warning" />
        <StatCard title="Commandes livrées" value={completedOrders} icon={CheckCircle} color="success" />
        <StatCard title="Total dépensé" value={`PKR ${totalSpent.toLocaleString()}`} icon={TrendingUp} color="info" />
      </div>

      {/* Recent Orders */}
      <div className="bg-surface rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text">Commandes récentes</h3>
          <a href="#/dashboard/client/mes-commandes" className="text-sm text-primary font-medium hover:underline">Voir tout</a>
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
              {myOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-surface-hover">
                  <td className="py-3 font-medium text-primary">{order.id}</td>
                  <td className="py-3 text-muted">{order.date}</td>
                  <td className="py-3 text-text">{order.products.length} article(s)</td>
                  <td className="py-3 font-semibold">PKR {order.total.toLocaleString()}</td>
                  <td className="py-3"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
