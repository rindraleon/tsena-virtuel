import { useTitle } from '../../hooks';
import { Users, UserCheck, Package, ShoppingBag, DollarSign, AlertCircle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../shared/components/StatCard';
import StatusBadge from '../../shared/components/StatusBadge';
import { mockOrders, mockUsers, mockProducts } from '../../shared/data/mockData';
import { useDashboard } from '../../hooks/queries';

const revenueData = [
  { month: 'Jan', revenue: 12000 }, { month: 'Feb', revenue: 19000 }, { month: 'Mar', revenue: 15000 },
  { month: 'Apr', revenue: 25000 }, { month: 'May', revenue: 22000 }, { month: 'Jun', revenue: 30000 },
  { month: 'Jul', revenue: 35000 }, { month: 'Aug', revenue: 28000 }, { month: 'Sep', revenue: 42000 },
];

const PIE_COLORS = ['#0d3b2e', '#1a5c47', '#2d8a6b', '#f0c040', '#f59e0b', '#ef4444'];
const categorySalesData = [
  { name: 'Épicerie', value: 35 }, { name: 'Mode', value: 25 }, { name: 'Électronique', value: 20 },
  { name: 'Maison', value: 10 }, { name: 'Beauté', value: 6 }, { name: 'Autres', value: 4 },
];

export default function AdminDashboardPage() {
  useTitle('Tableau de bord | Administration');

  // Hook API dashboard
  const { data: dashboardStats } = useDashboard();

  // Fallback sur les mocks si l'API n'est pas disponible
  const totalRevenue = dashboardStats?.revenue.total ?? mockOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const sellers = dashboardStats ? Array(dashboardStats.users.sellers).fill(null) : mockUsers.filter((u) => u.role === 'seller');
  const pendingOrders = dashboardStats?.orders.pending ?? mockOrders.filter((o) => o.status === 'pending').length;
  const totalProducts = dashboardStats?.products.total ?? mockProducts.length;
  const totalOrders = dashboardStats?.orders.total ?? mockOrders.length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Tableau de bord admin</h2>
        <p className="text-muted text-sm mt-1">Vue d'ensemble de la marketplace</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Utilisateurs" value={dashboardStats?.users.total ?? mockUsers.length} icon={Users} color="primary" />
        <StatCard title="Vendeurs" value={sellers.length} icon={UserCheck} color="info" />
        <StatCard title="Produits" value={totalProducts} icon={Package} color="success" />
        <StatCard title="Commandes" value={totalOrders} icon={ShoppingBag} color="warning" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard title="Chiffre d'affaires" value={`Ar ${totalRevenue.toLocaleString()}`} icon={DollarSign} color="success" />
        <StatCard title="Commandes en attente" value={pendingOrders} icon={Clock} color="warning" />
        <StatCard title="Fonds en séquestre" value={`Ar ${(dashboardStats?.escrow.heldAmount ?? 0).toLocaleString()}`} icon={AlertCircle} color="info" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Évolution du chiffre d'affaires</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d3b2e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0d3b2e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)' }} />
              <Area type="monotone" dataKey="revenue" stroke="#0d3b2e" fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Ventes par catégorie</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categorySalesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {categorySalesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-surface rounded-xl border border-border">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-text">Commandes récentes</h3>
          <a href="/dashboard/admin/orders" className="text-sm text-primary font-medium hover:underline">
            Voir tout
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">N° Commande</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Client</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Montant</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Statut</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.slice(0, 5).map((order) => (
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
