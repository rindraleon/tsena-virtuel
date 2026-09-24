import { useTitle } from '../../hooks';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockCategories } from '../../shared/data/mockData';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import { Edit2, Trash2, Plus, ToggleLeft, ToggleRight } from 'lucide-react';
import type { Category } from '../../types';

export default function AdminCategoriesPage() {
  useTitle('Catégories | Administration');
  const navigate = useNavigate();
  const [categories, setCategories] = useState(mockCategories);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');

  const toggleStatus = (id: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c)));
  };

  const addCategory = () => {
    if (!newName.trim() || !newSlug.trim()) return;
    setCategories((prev) => [...prev, { id: `c${prev.length + 1}`, name: newName, icon: '', slug: newSlug, productCount: 0, status: 'active' }]);
    setNewName('');
    setNewSlug('');
    setShowForm(false);
  };

  const columns = [
    { header: 'Icône', accessor: (c: Category) => <span className="text-lg">{c.icon || '—'}</span> },
    { header: 'Nom', accessor: 'name' as keyof Category, mobile: true },
    { header: 'Slug', accessor: (c: Category) => <span className="text-xs font-mono text-muted">{c.slug}</span> },
    { header: 'Produits', accessor: (c: Category) => <span className="text-muted">{c.productCount}</span> },
    {
      header: 'Statut',
      accessor: (c: Category) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${
          c.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {c.status === 'active' ? 'Actif' : 'Inactif'}
        </span>
      ),
    },
  ];

  const actions = (cat: Category) => (
    <div className="flex items-center gap-1">
      <button onClick={() => navigate(`/dashboard/admin/categories/${cat.id}/modifier`)} className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Modifier"><Edit2 size={14} /></button>
      <button onClick={() => toggleStatus(cat.id)} className="p-1.5 rounded hover:bg-surface-tertiary text-muted" aria-label="Changer le statut">
        {cat.status === 'active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
      </button>
      <button className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-danger" aria-label="Supprimer"><Trash2 size={14} /></button>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-primary">Catégories</h2>
        <Button icon={Plus} onClick={() => setShowForm(!showForm)}>{showForm ? 'Annuler' : 'Ajouter une catégorie'}</Button>
      </div>

      {showForm && (
        <div className="bg-surface rounded-xl border border-border p-5 mb-6 animate-fade-in-up">
          <h3 className="font-semibold text-text mb-3">Nouvelle catégorie</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nom de la catégorie"
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="Slug (ex. epicerie)"
              className="px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
          <div className="flex justify-end mt-3">
            <Button onClick={addCategory} size="sm">Créer</Button>
          </div>
        </div>
      )}

      <DataTable
        data={categories}
        columns={columns}
        searchFields={['name', 'slug']}
        searchPlaceholder="Rechercher une catégorie..."
        filterConfig={{
          field: 'status',
          options: [
            { value: 'all', label: 'Toutes' },
            { value: 'active', label: 'Actives' },
            { value: 'inactive', label: 'Inactives' },
          ],
        }}
        titleKey="name"
        subtitleKey="slug"
        statusKey="status"
        actions={actions}
        headerContent={
          <Link to="nouveau">
            <Button icon={Plus} size="sm">Ajouter une catégorie</Button>
          </Link>
        }
        itemsPerPage={10}
      />
    </div>
  );
}
