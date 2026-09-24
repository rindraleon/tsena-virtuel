import { useTitle } from '../../hooks';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Store, Mail, Phone, Calendar, CheckCircle, XCircle, Eye } from 'lucide-react';
import { mockSellerApplications } from '../../shared/data/mockData';
import { useState } from 'react';
import Button from '../../components/common/Button';
import type { SellerStatus } from '../../types';

export default function AdminSellerDetailPage() {
  const { id } = useParams<{ id: string }>();
  useTitle('Détail vendeur | Administration');
  const navigate = useNavigate();

  const application = id ? mockSellerApplications.find((a) => a.id === id) : null;
  const [status, setStatus] = useState<SellerStatus>(application?.status ?? 'pending');

  if (!application) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Vendeur introuvable</p>
        <Link to="/dashboard/admin/vendeurs" className="text-primary text-sm font-medium hover:underline mt-3 inline-block">
          Retour à la liste
        </Link>
      </div>
    );
  }

  const statusLabels: Record<SellerStatus, string> = {
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    suspended: 'Suspendu',
  };

  const statusColors: Record<SellerStatus, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    suspended: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard/admin/vendeurs" className="p-2 rounded-lg hover:bg-surface-tertiary text-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-primary">Détail du vendeur</h2>
          <p className="text-sm text-muted mt-0.5">{application.storeName}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6 space-y-6">
        {/* Status badge */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-text">Informations</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
            <Store size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted">Boutique</p>
              <p className="text-sm font-medium text-text">{application.storeName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
            <Eye size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted">Propriétaire</p>
              <p className="text-sm font-medium text-text">{application.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
            <Mail size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-medium text-text">{application.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
            <Phone size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted">Téléphone</p>
              <p className="text-sm font-medium text-text">{application.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg sm:col-span-2">
            <Calendar size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted">Date de candidature</p>
              <p className="text-sm font-medium text-text">{new Date(application.appliedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {status === 'pending' && (
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              icon={CheckCircle}
              onClick={() => setStatus('approved')}
              className="!bg-green-600 hover:!bg-green-700"
            >
              Approuver
            </Button>
            <Button
              variant="outline"
              icon={XCircle}
              onClick={() => setStatus('rejected')}
              className="!text-red-600 !border-red-200 hover:!bg-red-50"
            >
              Rejeter
            </Button>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/dashboard/admin/vendeurs')}>
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
}
