import { useTitle } from '../../hooks';
import { Package, ShoppingBag, AlertCircle, DollarSign, ShoppingCart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../../shared/components/StatCard';
import StatusBadge from '../../shared/components/StatusBadge';
import { mockOrders, mockProducts } from '../../shared/data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useSellerProductStats, useSellerOrderStats } from '../../hooks/queries';

const salesData = [
  { month: 'Jan', sales: 4000 }, { month: 'Feb', sales: 3000 }, { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 }, { month: 'May', sales: 6000 }, { month: 'Jun', sales: 7200 },
  { month: 'Jul', sales: 5800 }, { month: 'Aug', sales: 8500 }, { month: 'Sep', sales: 9200 },
];

const categoryData = [
  { name: 'Épicerie', value: 45 }, { name: 'Mode', value: 30 }, { name: 'Électronique', value: 25 },
];

export default function SellerDashboardPage() {
  useTitle('Tableau de bord | Vendeur');
  const { user } = useAuth();

  // Hooks API avec fallback mock
  const { data: productStats } = useSellerProductStats();
  const { data: orderStats } = useSellerOrderStats();

  // Fallback sur les mocks si l'API n'est pas disponible
  const myProducts = mockProducts.filter((p) => p.sellerId === user?.id);
  const myOrders = mockOrders.filter((o) => o.sellerId === user?.id);
  const totalRevenue = orderStats?.totalRevenue ?? myOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orderStats?.pendingOrders ?? myOrders.filter((o) => ['pending', 'confirmed'].includes(o.status)).length;
  const totalProducts = productStats?.totalProducts ?? myProducts.length;
  const totalOrders = orderStats?.totalOrders ?? myOrders.length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Tableau de bord vendeur</h2>
        <p className="text-muted text-sm mt-1">Vue d'ensemble de votre boutique</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total produits" value={totalProducts} icon={Package} color="primary" />
        <StatCard title="Total commandes" value={totalOrders} icon={ShoppingBag} color="info" />
        <StatCard title="Chiffre d'affaires" value={`Ar ${totalRevenue.toLocaleString()}`} icon={DollarSign} color="success" />
        <StatCard title="Commandes en attente" value={pendingOrders} icon={ShoppingCart} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Évolution des ventes</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d3b2e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0d3b2e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)' }} />
              <Area type="monotone" dataKey="sales" stroke="#0d3b2e" fill="url(#colorSales)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Ventes par catégorie</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)' }} />
              <Bar dataKey="value" fill="#0d3b2e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Produits actifs"
          value={productStats?.activeProducts ?? myProducts.filter(p => p.status === 'active').length}
          icon={Package}
          color="success"
        />
        <StatCard
          title="Rupture de stock"
          value={productStats?.outOfStock ?? myProducts.filter(p => p.stock === 0).length}
          icon={AlertCircle}
          color="danger"
        />
        <StatCard
          title="Stock faible"
          value={productStats?.lowStock ?? myProducts.filter(p => p.stock > 0 && p.stock < 10).length}
          icon={AlertCircle}
          color="warning"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-surface rounded-xl border border-border">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-text">Commandes récentes</h3>
          <a href="/dashboard/seller/orders" className="text-sm text-primary font-medium hover:underline">
            Voir tout
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Commande</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Client</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Montant</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Statut</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-sm font-medium text-text">#{order.id.slice(-6)}</td>
                  <td className="px-5 py-3 text-sm text-text">{order.userName}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-text">Ar {order.total.toLocaleString()}</td>
                  <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-3 text-sm text-muted">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
