import { useTitle } from '../../hooks';
import { Package, ShoppingBag, AlertCircle, DollarSign, ShoppingCart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../../shared/components/StatCard';
import StatusBadge from '../../shared/components/StatusBadge';
import { mockOrders, mockProducts } from '../../shared/data/mockData';
import { useAuth } from '../../context/AuthContext';

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
  const myProducts = mockProducts.filter((p) => p.sellerId === user?.id);
  const myOrders = mockOrders.filter((o) => o.sellerId === user?.id);

  const totalRevenue = myOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingOrders = myOrders.filter((o) => ['pending', 'confirmed'].includes(o.status)).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">Tableau de bord vendeur</h2>
        <p className="text-muted text-sm mt-1">Vue d'ensemble de votre boutique</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total produits" value={myProducts.length} icon={Package} color="primary" />
        <StatCard title="Total commandes" value={myOrders.length} icon={ShoppingBag} color="info" />
        <StatCard title="Chiffre d'affaires" value={`PKR ${totalRevenue.toLocaleString()}`} icon={DollarSign} color="success" />
        <StatCard title="Commandes en attente" value={pendingOrders} icon={ShoppingCart} color="warning" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Évolution des ventes</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#0d3b2e" fill="#0d3b2e" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Ventes par catégorie</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#0d3b2e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold text-text mb-4">Commandes récentes</h3>
          <div className="space-y-3">
            {myOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text">{order.id}</p>
                  <p className="text-xs text-muted">{order.userName} · {order.date}</p>
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
          <h3 className="font-semibold text-text mb-4">Produits populaires</h3>
          <div className="space-y-3">
            {myProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" width={40} height={40} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{product.name}</p>
                  <p className="text-xs text-muted">Stock : {product.stock} unité{product.stock > 1 ? 's' : ''}</p>
                </div>
                <span className="text-sm font-semibold">PKR {product.price.toLocaleString()}</span>
                {product.stock === 0 && <AlertCircle size={16} className="text-danger" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
