import { useTitle } from '../../hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Tag } from 'lucide-react';
import { mockCategories } from '../../shared/data/mockData';
import Button from '../../components/common/Button';

export default function AdminCategoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  useTitle(isEdit ? 'Modifier catégorie | Administration' : 'Nouvelle catégorie | Administration');
  const navigate = useNavigate();

  const existingCategory = id ? mockCategories.find((c) => c.id === id) : null;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    if (existingCategory) {
      setName(existingCategory.name);
      setSlug(existingCategory.slug);
      setStatus(existingCategory.status);
    }
  }, [existingCategory]);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isEdit) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/admin/categories');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard/admin/categories" className="p-2 rounded-lg hover:bg-surface-tertiary text-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-primary">{isEdit ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h2>
          <p className="text-sm text-muted mt-0.5">{isEdit ? `Modification de ${existingCategory?.name ?? ''}` : 'Ajouter une nouvelle catégorie'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-border p-6 space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
            <Tag size={14} className="text-muted" /> Nom de la catégorie
          </label>
          <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} required placeholder="Ex : Épicerie" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1.5 block">Slug (URL)</label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="ex : epicerie" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          <p className="text-xs text-muted mt-1">Utilisé dans l'URL de la catégorie</p>
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1.5 block">Statut</label>
          <div className="flex gap-3">
            {(['active', 'inactive'] as const).map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="status" value={s} checked={status === s} onChange={() => setStatus(s)} className="text-primary border-border" />
                <span className="capitalize">{s === 'active' ? 'Active' : 'Inactive'}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard/admin/categories')}>Annuler</Button>
          <Button type="submit" icon={Save}>{isEdit ? 'Enregistrer' : 'Créer la catégorie'}</Button>
        </div>
      </form>
    </div>
  );
}
