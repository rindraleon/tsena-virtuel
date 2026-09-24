import { useTitle } from '../../hooks';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import ProductImageUploader, { type ImageFile } from '../../components/common/ProductImageUploader';

export default function SellerProductFormPage() {
  useTitle('Nouveau produit | Vendeur');
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [variant, setVariant] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate('/dashboard/vendeur/products');
    }, 1500);
  };

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary mb-4 transition-colors">
        <ArrowLeft size={16} /> Retour aux produits
      </button>

      <h2 className="text-xl font-bold text-primary mb-6">Ajouter un nouveau produit</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold text-text mb-2">Informations du produit</h3>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Nom du produit *</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              placeholder="Entrez le nom du produit" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-text mb-1">Prix (PKR) *</label>
              <input id="price" type="number" required value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                placeholder="0" />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-text mb-1">Stock *</label>
              <input id="stock" type="number" required value={stock} onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                placeholder="0" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text mb-1">Catégorie *</label>
              <select id="category" required value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
                <option value="">Sélectionner une catégorie</option>
                <option value="Épicerie">Épicerie</option>
                <option value="Électronique">Électronique</option>
                <option value="Mode">Mode</option>
                <option value="Maison">Maison</option>
                <option value="Beauté">Beauté</option>
              </select>
            </div>
            <div>
              <label htmlFor="variant" className="block text-sm font-medium text-text mb-1">Variante</label>
              <input id="variant" type="text" value={variant} onChange={(e) => setVariant(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                placeholder="ex. 5kg, M, Noir" />
            </div>
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-text mb-1">Description</label>
            <textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 min-h-[100px] resize-y"
              placeholder="Décrivez votre produit..." />
          </div>
        </div>

        {/* Image uploader */}
        <div className="bg-surface rounded-xl border border-border p-6">
          <ProductImageUploader
            value={images}
            onChange={setImages}
            maxImages={5}
            maxSizeMB={5}
          />
        </div>

        {saved && <p className="text-success text-sm font-medium">✓ Produit créé avec succès !</p>}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Annuler</Button>
          <Button type="submit" icon={Save}>Créer le produit</Button>
        </div>
      </form>
    </div>
  );
}
