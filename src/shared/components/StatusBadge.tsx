import clsx from 'clsx';
import type { OrderStatus, SellerStatus, AccountStatus } from '../types';

type BadgeStatus = OrderStatus | SellerStatus | AccountStatus;

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-indigo-100 text-indigo-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  suspended: 'bg-orange-100 text-orange-700',
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-surface-tertiary text-gray-500',
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  processing: 'En cours',
  shipped: 'Expédié',
  delivered: 'Livré',
  cancelled: 'Annulé',
  approved: 'Approuvé',
  rejected: 'Rejeté',
  suspended: 'Suspendu',
  active: 'Actif',
  inactive: 'Inactif',
};

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', statusStyles[status] || 'bg-surface-tertiary text-gray-600', className)}>
      {statusLabels[status] || status}
    </span>
  );
}
