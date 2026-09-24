import { CheckCircle, XCircle, Eye } from 'lucide-react';
import StatusBadge from '../../shared/components/StatusBadge';
import type { SellerApplication } from '../../types';

interface SellersTableProps {
  sellers: SellerApplication[];
  onUpdateStatus: (id: string, status: SellerApplication['status']) => void;
}

export default function SellersTable({ sellers, onUpdateStatus }: SellersTableProps) {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Boutique</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Propriétaire</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Téléphone</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sellers.map((app) => (
              <tr key={app.id} className="hover:bg-surface-hover">
                <td className="px-4 py-3 font-medium text-text">{app.storeName}</td>
                <td className="px-4 py-3 text-muted">{app.name}</td>
                <td className="px-4 py-3 text-muted">{app.email}</td>
                <td className="px-4 py-3 text-muted">{app.phone}</td>
                <td className="px-4 py-3 text-muted">{new Date(app.appliedAt).toLocaleDateString('fr-FR')}</td>
                <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Voir"><Eye size={14} /></button>
                    {app.status === 'pending' && (
                      <>
                        <button onClick={() => onUpdateStatus(app.id, 'approved')} className="p-1.5 rounded hover:bg-green-50 text-green-600" aria-label="Approuver"><CheckCircle size={14} /></button>
                        <button onClick={() => onUpdateStatus(app.id, 'rejected')} className="p-1.5 rounded hover:bg-red-50 text-red-600" aria-label="Rejeter"><XCircle size={14} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
