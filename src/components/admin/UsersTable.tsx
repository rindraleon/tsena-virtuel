import { Edit2, Ban, UserCheck } from 'lucide-react';
import StatusBadge from '../../shared/components/StatusBadge';
import type { User } from '../../types';

interface UsersTableProps {
  users: User[];
  onToggleStatus: (id: string) => void;
}

export default function UsersTable({ users, onToggleStatus }: UsersTableProps) {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Utilisateur</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Téléphone</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Rôle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Inscription</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-hover">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">{user.name.charAt(0)}</div>
                    <span className="font-medium text-text">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{user.email}</td>
                <td className="px-4 py-3 text-muted">{user.phone}</td>
                <td className="px-4 py-3"><span className="capitalize text-sm font-medium text-text">{user.role === 'client' ? 'Client' : user.role === 'seller' ? 'Vendeur' : 'Admin'}</span></td>
                <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                <td className="px-4 py-3 text-muted">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Modifier"><Edit2 size={14} /></button>
                    <button onClick={() => onToggleStatus(user.id)} className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Changer le statut">
                      {user.status === 'active' ? <Ban size={14} /> : <UserCheck size={14} />}
                    </button>
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
