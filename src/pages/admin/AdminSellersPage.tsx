import { useTitle } from '../../hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSellerApplications } from '../../shared/data/mockData';
import DataTable from '../../components/common/DataTable';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import type { SellerApplication, SellerStatus } from '../../types';

export default function AdminSellersPage() {
  useTitle('Vendeurs | Administration');
  const navigate = useNavigate();
  const [applications, setApplications] = useState(mockSellerApplications);

  const updateStatus = (id: string, newStatus: SellerStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  const columns = [
    { header: 'Boutique', accessor: 'storeName' as keyof SellerApplication, mobile: true },
    { header: 'Propriétaire', accessor: 'name' as keyof SellerApplication, className: 'text-muted' },
    { header: 'Email', accessor: 'email' as keyof SellerApplication, className: 'text-muted' },
    { header: 'Téléphone', accessor: 'phone' as keyof SellerApplication, className: 'text-muted' },
    {
      header: 'Date',
      accessor: (a: SellerApplication) => new Date(a.appliedAt).toLocaleDateString('fr-FR'),
      className: 'text-muted',
    },
    {
      header: 'Statut',
      accessor: (a: SellerApplication) => {
        const statusMap: Record<SellerStatus, { label: string; class: string }> = {
          pending: { label: 'En attente', class: 'bg-amber-50 text-amber-700 border-amber-200' },
          approved: { label: 'Approuvé', class: 'bg-green-50 text-green-700 border-green-200' },
          rejected: { label: 'Rejeté', class: 'bg-red-50 text-red-700 border-red-200' },
          suspended: { label: 'Suspendu', class: 'bg-blue-50 text-blue-700 border-blue-200' },
        };
        const config = statusMap[a.status];
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.class}`}>
            {config.label}
          </span>
        );
      },
    },
  ];

  const actions = (app: SellerApplication) => (
    <div className="flex items-center gap-1">
      <button onClick={() => navigate(`/dashboard/admin/vendeurs/${app.id}`)} className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Voir"><Eye size={14} /></button>
      {app.status === 'pending' && (
        <>
          <button onClick={() => updateStatus(app.id, 'approved')} className="p-1.5 rounded hover:bg-green-50 text-green-600" aria-label="Approuver"><CheckCircle size={14} /></button>
          <button onClick={() => updateStatus(app.id, 'rejected')} className="p-1.5 rounded hover:bg-red-50 text-red-600" aria-label="Rejeter"><XCircle size={14} /></button>
        </>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Gestion des vendeurs</h2>

      <DataTable
        data={applications}
        columns={columns}
        searchFields={['storeName', 'name', 'email']}
        searchPlaceholder="Rechercher un vendeur..."
        filterConfig={{
          field: 'status',
          options: [
            { value: 'all', label: 'Tous' },
            { value: 'pending', label: 'En attente' },
            { value: 'approved', label: 'Approuvés' },
            { value: 'rejected', label: 'Rejetés' },
            { value: 'suspended', label: 'Suspendus' },
          ],
        }}
        titleKey="storeName"
        subtitleKey="name"
        actions={actions}
        itemsPerPage={10}
      />
    </div>
  );
}
