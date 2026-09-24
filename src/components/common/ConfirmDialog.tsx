import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface ConfirmDialogProps {
  readonly open: boolean;
  readonly title: string;
  readonly description?: string;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly variant?: 'default' | 'destructive';
  readonly loading?: boolean;
  readonly children?: ReactNode;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'default',
  loading = false,
  children,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onCancel} />

      {/* Dialog */}
      <div
        className="relative bg-surface rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface-tertiary text-muted transition-colors"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            variant === 'destructive' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'
          }`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {variant === 'destructive' ? (
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
              ) : (
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              )}
            </svg>
          </div>
          <div>
            <h2 id="confirm-title" className="text-lg font-bold text-text">{title}</h2>
            {description && <p className="text-sm text-muted mt-1">{description}</p>}
            {children}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            className={variant === 'destructive' ? '!bg-red-600 hover:!bg-red-700' : undefined}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
