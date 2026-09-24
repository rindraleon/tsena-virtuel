import { Users, UserCheck, Package, ShoppingBag, DollarSign, Clock, AlertCircle } from 'lucide-react';
import StatCard from '../../shared/components/StatCard';

interface AdminStatsProps {
  totalUsers: number;
  totalCustomers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  pendingSellers: number;
}

export default function AdminStats({
  totalUsers, totalCustomers, totalSellers, totalProducts,
  totalOrders, totalRevenue, pendingOrders, pendingSellers,
}: AdminStatsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total utilisateurs" value={totalUsers} icon={Users} color="primary" trend={{ value: '+12% ce mois', positive: true }} />
        <StatCard title="Total clients" value={totalCustomers} icon={Users} color="info" />
        <StatCard title="Total vendeurs" value={totalSellers} icon={UserCheck} color="success" />
        <StatCard title="Vendeurs en attente" value={pendingSellers} icon={AlertCircle} color="warning" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total produits" value={totalProducts} icon={Package} color="primary" />
        <StatCard title="Total commandes" value={totalOrders} icon={ShoppingBag} color="info" />
        <StatCard title="Chiffre d'affaires" value={`${totalRevenue.toLocaleString('fr-FR')} PKR`} icon={DollarSign} color="success" trend={{ value: '+18% vs mois dernier', positive: true }} />
        <StatCard title="Commandes en attente" value={pendingOrders} icon={Clock} color="warning" />
      </div>
    </div>
  );
}
