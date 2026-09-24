import { Package, ShoppingBag, DollarSign, ShoppingCart } from 'lucide-react';
import StatCard from '../../shared/components/StatCard';

interface SellerStatsProps {
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
}

export default function SellerStats({ totalProducts, totalOrders, revenue, pendingOrders }: SellerStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard title="Total produits" value={totalProducts} icon={Package} color="primary" />
      <StatCard title="Total commandes" value={totalOrders} icon={ShoppingBag} color="info" />
      <StatCard title="Chiffre d'affaires" value={`${revenue.toLocaleString('fr-FR')} PKR`} icon={DollarSign} color="success" />
      <StatCard title="Commandes en attente" value={pendingOrders} icon={ShoppingCart} color="warning" />
    </div>
  );
}
