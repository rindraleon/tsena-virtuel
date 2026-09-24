import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

export interface ImageFile {
  readonly id: string;
  readonly file: File;
  readonly url: string;
  readonly isMain: boolean;
}

interface ProductImageUploaderProps {
  readonly value?: ImageFile[];
  readonly onChange: (images: ImageFile[]) => void;
  readonly maxImages?: number;
  readonly maxSizeMB?: number;
  readonly label?: string;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.webp';

function generateId() {
  return `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function ProductImageUploader({
  value = [],
  onChange,
  maxImages = 5,
  maxSizeMB = 5,
  label = 'Images du produit',
}: ProductImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  // Clean up object URLs on unmount or when images change
  useEffect(() => {
    return () => {
      value.forEach((img) => {
        if (img.url.startsWith('blob:')) URL.revokeObjectURL(img.url);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setError('');
      const fileArray = Array.from(files);
      const remaining = maxImages - value.length;

      if (remaining <= 0) {
        setError(`Vous pouvez ajouter au maximum ${maxImages} images.`);
        return;
      }

      const newImages: ImageFile[] = [];

      for (let i = 0; i < Math.min(fileArray.length, remaining); i++) {
        const file = fileArray[i];

        if (!ACCEPTED_TYPES.includes(file.type)) {
          setError('Le format de cette image n\'est pas pris en charge (JPG, PNG, WEBP uniquement).');
          continue;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(`L'image "${file.name}" dépasse la taille maximale de ${maxSizeMB} Mo.`);
          continue;
        }

        try {
          const url = URL.createObjectURL(file);
          newImages.push({
            id: generateId(),
            file,
            url,
            isMain: value.length + newImages.length === 0,
          });
        } catch {
          setError('Impossible de lire cette image.');
        }
      }

      if (newImages.length > 0) {
        onChange([...value, ...newImages]);
      }
    },
    [value, onChange, maxImages, maxSizeMB]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeImage = (id: string) => {
    const img = value.find((i) => i.id === id);
    if (img?.url.startsWith('blob:')) URL.revokeObjectURL(img.url);
    const updated = value.filter((i) => i.id !== id);
    // Ensure first image is main
    if (updated.length > 0 && !updated.some((i) => i.isMain)) {
      onChange(updated.map((item, idx) => idx === 0 ? { ...item, isMain: true } : item));
    } else {
      onChange(updated);
    }
  };

  const setMainImage = (id: string) => {
    onChange(value.map((i) => ({ ...i, isMain: i.id === id })));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">{label}</label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-gray-50'
        } ${value.length >= maxImages ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          onChange={handleInputChange}
          className="hidden"
          aria-label="Sélectionner des images"
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload size={22} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text">
              {dragActive ? 'Déposez vos images ici' : 'Glissez vos images ici'}
            </p>
            <p className="text-xs text-muted mt-1">
              ou <span className="text-primary font-medium underline">parcourir les fichiers</span>
            </p>
            <p className="text-xs text-muted mt-1">
              JPG, PNG, WEBP · Max {maxSizeMB} Mo · {value.length}/{maxImages} images
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 mt-3 text-sm text-danger" role="alert">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {value.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-border bg-gray-50">
              <img
                src={img.url}
                alt="Aperçu"
                className="w-full aspect-square object-cover"
              />
              {/* Main badge */}
              {img.isMain && (
                <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Principale
                </div>
              )}
              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!img.isMain && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setMainImage(img.id); }}
                    className="px-3 py-1.5 bg-surface/90 rounded-lg text-xs font-medium text-text hover:bg-surface"
                    title="Définir comme principale"
                  >
                    Principale
                  </button>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                  className="p-1.5 bg-danger/90 rounded-lg text-white hover:bg-danger"
                  aria-label="Supprimer l'image"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
