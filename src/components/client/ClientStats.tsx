import { ShoppingBag, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import StatCard from '../../shared/components/StatCard';

interface ClientStatsProps {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalSpent: number;
}

export default function ClientStats({ totalOrders, pendingOrders, completedOrders, totalSpent }: ClientStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard title="Total commandes" value={totalOrders} icon={ShoppingBag} color="primary" />
      <StatCard title="En attente" value={pendingOrders} icon={Clock} color="warning" />
      <StatCard title="Livrées" value={completedOrders} icon={CheckCircle} color="success" />
      <StatCard title="Total dépensé" value={`${totalSpent.toLocaleString('fr-FR')} PKR`} icon={TrendingUp} color="info" />
    </div>
  );
}
