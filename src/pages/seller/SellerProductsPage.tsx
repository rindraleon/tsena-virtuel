import { useTitle } from '../../hooks';
import { mockProducts } from '../../shared/data/mockData';
import DataTable from '../../components/common/DataTable';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import Button from '../../components/common/Button';
import type { Product } from '../../types';

export default function SellerProductsPage() {
  useTitle('Mes produits | Vendeur');
  const { user } = useAuth();

  const myProducts = mockProducts.filter((p) => p.sellerId === user?.id);

  const columns = [
    {
      header: 'Produit',
      accessor: (p: Product) => (
        <div className="flex items-center gap-3">
          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" width={40} height={40} />
          <div>
            <p className="font-medium text-text">{p.name}</p>
            <p className="text-xs text-muted">{p.variant || ''}</p>
          </div>
        </div>
      ),
      mobile: true,
    },
    { header: 'Catégorie', accessor: 'category' as keyof Product, className: 'text-muted' },
    {
      header: 'Prix',
      accessor: (p: Product) => <span className="font-semibold">{p.price.toLocaleString('fr-FR')} PKR</span>,
      mobile: true,
    },
    {
      header: 'Stock',
      accessor: (p: Product) => (
        <span className={p.stock === 0 ? 'text-danger font-medium' : p.stock < 10 ? 'text-amber-600 font-medium' : ''}>
          {p.stock} unités
        </span>
      ),
    },
    {
      header: 'Statut',
      accessor: (p: Product) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${
          p.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {p.status === 'active' ? 'Actif' : 'Inactif'}
        </span>
      ),
    },
  ];

  const actions = (product: Product) => (
    <div className="flex items-center gap-1">
      <Link
        to={`/produits/${product.id}`}
        className="p-1.5 rounded hover:bg-surface-tertiary text-muted"
        aria-label="Voir"
      >
        <Eye size={14} />
      </Link>
      <Link
        to={`/dashboard/vendeur/produits/${product.id}/modifier`}
        className="p-1.5 rounded hover:bg-surface-tertiary text-muted"
        aria-label="Modifier"
      >
        <Edit2 size={14} />
      </Link>
      <button className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-danger" aria-label="Supprimer">
        <Trash2 size={14} />
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary">Mes produits</h2>
          <p className="text-muted text-sm mt-1">{myProducts.length} produit{myProducts.length > 1 ? 's' : ''}</p>
        </div>
        <Link to="/dashboard/vendeur/produits/nouveau">
          <Button icon={Plus}>Ajouter un produit</Button>
        </Link>
      </div>

      <DataTable
        data={myProducts}
        columns={columns}
        searchFields={['name', 'category']}
        searchPlaceholder="Rechercher un produit..."
        filterConfig={{
          field: 'status',
          options: [
            { value: 'all', label: 'Tous' },
            { value: 'active', label: 'Actifs' },
            { value: 'inactive', label: 'Inactifs' },
          ],
        }}
        titleKey="name"
        subtitleKey="category"
        statusKey="status"
        imageKey="image"
        actions={actions}
        itemsPerPage={10}
      />
    </div>
  );
}
