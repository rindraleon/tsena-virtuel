import { useTitle } from '../../hooks';
import { useState } from 'react';
import { mockOrders } from '../../shared/data/mockData';
import DataTable from '../../components/common/DataTable';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle } from 'lucide-react';
import type { Order, OrderStatus } from '../../types';

const statusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  processing: 'En cours',
  shipped: 'Expédié',
  delivered: 'Livré',
  cancelled: 'Annulé',
};

const nextStatus: Record<string, OrderStatus> = {
  pending: 'confirmed',
  confirmed: 'processing',
  processing: 'shipped',
};

export default function SellerOrdersPage() {
  useTitle('Commandes | Vendeur');
  const { user } = useAuth();
  const [orders, setOrders] = useState(mockOrders.filter((o) => o.sellerId === user?.id));

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const columns = [
    {
      header: 'N° commande',
      accessor: (o: Order) => <span className="font-medium text-primary">{o.id}</span>,
      mobile: true,
    },
    { header: 'Client', accessor: 'userName' as keyof Order, className: 'text-muted' },
    {
      header: 'Articles',
      accessor: (o: Order) => <span className="text-muted">{o.products.length} article(s)</span>,
    },
    {
      header: 'Total',
      accessor: (o: Order) => <span className="font-semibold">{o.total.toLocaleString('fr-FR')} PKR</span>,
      mobile: true,
    },
    {
      header: 'Date',
      accessor: (o: Order) => new Date(o.date).toLocaleDateString('fr-FR'),
      className: 'text-muted',
    },
    {
      header: 'Statut',
      accessor: (o: Order) => {
        const statusColors: Record<OrderStatus, string> = {
          pending: 'bg-amber-50 text-amber-700 border-amber-200',
          confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
          processing: 'bg-purple-50 text-purple-700 border-purple-200',
          shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          delivered: 'bg-green-50 text-green-700 border-green-200',
          cancelled: 'bg-red-50 text-red-700 border-red-200',
        };
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[o.status]}`}>
            {statusLabels[o.status]}
          </span>
        );
      },
    },
  ];

  const actions = (order: Order) => {
    const next = nextStatus[order.status];
    return (
      <div className="flex items-center gap-1">
        {next && (
          <button
            onClick={() => updateStatus(order.id, next)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label={`Passer à ${statusLabels[next]}`}
          >
            <CheckCircle size={12} />
            {statusLabels[next]}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Mes commandes</h2>

      <DataTable
        data={orders}
        columns={columns}
        searchFields={['id', 'userName']}
        searchPlaceholder="Rechercher une commande..."
        filterConfig={{
          field: 'status',
          options: [
            { value: 'all', label: 'Toutes' },
            { value: 'pending', label: 'En attente' },
            { value: 'confirmed', label: 'Confirmées' },
            { value: 'processing', label: 'En cours' },
            { value: 'shipped', label: 'Expédiées' },
            { value: 'delivered', label: 'Livrées' },
          ],
        }}
        titleKey="id"
        subtitleKey="userName"
        statusKey="status"
        actions={actions}
        itemsPerPage={10}
      />
    </div>
  );
}
