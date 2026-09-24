import { useTitle } from '../../hooks';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockUsers } from '../../shared/data/mockData';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import { Edit2, Ban, UserCheck, Eye, Plus } from 'lucide-react';
import type { User } from '../../types';

export default function AdminUsersPage() {
  useTitle('Utilisateurs | Administration');
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);

  const toggleStatus = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u)));
  };

  const columns = [
    {
      header: 'Utilisateur',
      accessor: (u: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">{u.name.charAt(0)}</div>
          <span className="font-medium text-text">{u.name}</span>
        </div>
      ),
    },
    { header: 'Email', accessor: 'email' as keyof User, className: 'text-muted' },
    { header: 'Téléphone', accessor: 'phone' as keyof User, className: 'text-muted' },
    {
      header: 'Rôle',
      accessor: (u: User) => (
        <span className="capitalize text-sm font-medium">
          {u.role === 'client' ? 'Client' : u.role === 'seller' ? 'Vendeur' : 'Admin'}
        </span>
      ),
    },
    {
      header: 'Statut',
      accessor: (u: User) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${
          u.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {u.status === 'active' ? 'Actif' : 'Inactif'}
        </span>
      ),
    },
    {
      header: 'Inscription',
      accessor: (u: User) => new Date(u.createdAt).toLocaleDateString('fr-FR'),
      className: 'text-muted',
    },
  ];

  const actions = (user: User) => (
    <div className="flex items-center gap-1">
      <button onClick={() => navigate(`/dashboard/admin/utilisateurs/${user.id}/modifier`)} className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Voir"><Eye size={14} /></button>
      <button onClick={() => navigate(`/dashboard/admin/utilisateurs/${user.id}/modifier`)} className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Modifier"><Edit2 size={14} /></button>
      <button onClick={() => toggleStatus(user.id)} className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Changer le statut">
        {user.status === 'active' ? <Ban size={14} /> : <UserCheck size={14} />}
      </button>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Gestion des utilisateurs</h2>

      <DataTable
        data={users}
        columns={columns}
        searchFields={['name', 'email', 'phone']}
        searchPlaceholder="Rechercher un utilisateur..."
        filterConfig={{
          field: 'role',
          options: [
            { value: 'all', label: 'Tous' },
            { value: 'client', label: 'Clients' },
            { value: 'seller', label: 'Vendeurs' },
            { value: 'admin', label: 'Admins' },
          ],
        }}
        titleKey="name"
        subtitleKey="email"
        statusKey="status"
        actions={actions}
        headerContent={
          <Link to="nouveau">
            <Button icon={Plus} size="sm">Ajouter un utilisateur</Button>
          </Link>
        }
        itemsPerPage={10}
      />
    </div>
  );
}
