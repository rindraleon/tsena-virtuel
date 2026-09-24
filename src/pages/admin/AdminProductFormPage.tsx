import { useTitle } from '../../hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { mockProducts, mockCategories } from '../../shared/data/mockData';
import Button from '../../components/common/Button';

export default function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  useTitle(isEdit ? 'Modifier produit | Administration' : 'Nouveau produit | Administration');
  const navigate = useNavigate();

  const existingProduct = id ? mockProducts.find((p) => p.id === id) : null;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [stock, setStock] = useState('');
  const [variant, setVariant] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setCategory(existingProduct.category);
      setPrice(String(existingProduct.price));
      setOldPrice(existingProduct.oldPrice ? String(existingProduct.oldPrice) : '');
      setStock(String(existingProduct.stock));
      setVariant(existingProduct.variant || '');
      setSellerName(existingProduct.sellerName);
      setStatus(existingProduct.status);
    }
  }, [existingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/admin/produits');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard/admin/produits" className="p-2 rounded-lg hover:bg-surface-tertiary text-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-primary">{isEdit ? 'Modifier le produit' : 'Nouveau produit'}</h2>
          <p className="text-sm text-muted mt-0.5">{isEdit ? `Modification de ${existingProduct?.name ?? ''}` : 'Ajouter un nouveau produit à la plateforme'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-border p-6 space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text mb-1.5">
            <Package size={14} className="text-muted" /> Nom du produit
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ex : Basmati Rice 5kg" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Catégorie</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
              <option value="">Sélectionner...</option>
              {mockCategories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Variante</label>
            <input type="text" value={variant} onChange={(e) => setVariant(e.target.value)} placeholder="Ex : 5kg" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Prix (PKR)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Ancien prix (PKR)</label>
            <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} min="0" placeholder="Optionnel" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1.5 block">Vendeur</label>
          <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} placeholder="Nom du vendeur" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1.5 block">Statut</label>
          <div className="flex gap-3">
            {(['active', 'inactive'] as const).map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="status" value={s} checked={status === s} onChange={() => setStatus(s)} className="text-primary border-border" />
                <span className="capitalize">{s === 'active' ? 'Actif' : 'Inactif'}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard/admin/produits')}>Annuler</Button>
          <Button type="submit" icon={Save}>{isEdit ? 'Enregistrer' : 'Créer le produit'}</Button>
        </div>
      </form>
    </div>
  );
}
