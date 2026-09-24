import { useTitle } from '../../hooks';
import { Users, UserCheck, Package, ShoppingBag, DollarSign, AlertCircle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../shared/components/StatCard';
import StatusBadge from '../../shared/components/StatusBadge';
import { mockOrders, mockUsers, mockProducts, mockSellerApplications } from '../../shared/data/mockData';

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
  const totalRevenue = mockOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const customers = mockUsers.filter((u) => u.role === 'client');
  const sellers = mockUsers.filter((u) => u.role === 'seller');
  const pendingOrders = mockOrders.filter((o) => o.status === 'pending').length;
  const pendingSellers = mockSellerApplications.filter((a) => a.status === 'pending').length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Vue d'ensemble</h2>
        <p className="text-muted text-sm mt-1">Statistiques et activité de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total utilisateurs" value={mockUsers.length} icon={Users} color="primary" trend={{ value: '+12% ce mois', positive: true }} />
        <StatCard title="Total clients" value={customers.length} icon={Users} color="info" />
        <StatCard title="Total vendeurs" value={sellers.length} icon={UserCheck} color="success" />
        <StatCard title="Vendeurs en attente" value={pendingSellers} icon={AlertCircle} color="warning" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total produits" value={mockProducts.length} icon={Package} color="primary" />
        <StatCard title="Total commandes" value={mockOrders.length} icon={ShoppingBag} color="info" />
        <StatCard title="Chiffre d'affaires" value={`PKR ${totalRevenue.toLocaleString()}`} icon={DollarSign} color="success" trend={{ value: '+18% vs mois dernier', positive: true }} />
        <StatCard title="Commandes en attente" value={pendingOrders} icon={Clock} color="warning" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Évolution du chiffre d'affaires</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000)}k`} />
              <Tooltip formatter={(v) => [`PKR ${Number(v).toLocaleString()}`, "Chiffre d'affaires"]} />
              <Area type="monotone" dataKey="revenue" stroke="#0d3b2e" fill="#0d3b2e" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Ventes par catégorie</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categorySalesData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                {categorySalesData.map((entry) => (
                  <Cell key={entry.name} fill={PIE_COLORS[categorySalesData.indexOf(entry) % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent orders & pending sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Commandes récentes</h3>
          <div className="space-y-3">
            {mockOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text">{order.id}</p>
                  <p className="text-xs text-muted">{order.userName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">PKR {order.total.toLocaleString()}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Demandes vendeurs en attente</h3>
          <div className="space-y-3">
            {mockSellerApplications.filter((a) => a.status === 'pending').map((app) => (
              <div key={app.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text">{app.storeName}</p>
                  <p className="text-xs text-muted">{app.name} · {app.appliedAt}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
