import { useTitle } from '../../hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, Shield } from 'lucide-react';
import { mockUsers } from '../../shared/data/mockData';
import Button from '../../components/common/Button';
import type { UserRole, AccountStatus } from '../../types';

export default function AdminUserFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  useTitle(isEdit ? 'Modifier utilisateur | Administration' : 'Nouvel utilisateur | Administration');
  const navigate = useNavigate();

  const existingUser = id ? mockUsers.find((u) => u.id === id) : null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [status, setStatus] = useState<AccountStatus>('active');

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.name);
      setEmail(existingUser.email);
      setPhone(existingUser.phone || '');
      setRole(existingUser.role);
      setStatus(existingUser.status);
    }
  }, [existingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app: save to API
    navigate('/dashboard/admin/utilisateurs');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard/admin/utilisateurs" className="p-2 rounded-lg hover:bg-surface-tertiary text-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-primary">{isEdit ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}</h2>
          <p className="text-sm text-muted mt-0.5">{isEdit ? `Modification de ${existingUser?.name ?? ''}` : 'Ajouter un nouvel utilisateur à la plateforme'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-border p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
            <User size={14} className="text-muted" /> Nom complet
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ex : Ahmed Khan"
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
            <Mail size={14} className="text-muted" /> Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="exemple@email.com"
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
            <Phone size={14} className="text-muted" /> Téléphone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+261 34 00 000 00"
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* Role */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
            <Shield size={14} className="text-muted" /> Rôle
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            <option value="client">Client</option>
            <option value="seller">Vendeur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-text mb-1.5 block">Statut</label>
          <div className="flex gap-3">
            {(['active', 'inactive', 'suspended'] as AccountStatus[]).map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={status === s}
                  onChange={() => setStatus(s)}
                  className="text-primary border-border"
                />
                <span className="capitalize">{s === 'active' ? 'Actif' : s === 'inactive' ? 'Inactif' : 'Suspendu'}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard/admin/utilisateurs')}>
            Annuler
          </Button>
          <Button type="submit" icon={Save}>
            {isEdit ? 'Enregistrer' : 'Créer l\'utilisateur'}
          </Button>
        </div>
      </form>
    </div>
  );
}
