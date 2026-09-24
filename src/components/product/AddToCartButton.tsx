import { useState, useCallback } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import type { ProductLike } from '../../types/product';
import type { Product } from '../../types';

type CartState = 'idle' | 'loading' | 'success';

interface AddToCartButtonProps {
  readonly product: ProductLike;
  readonly className?: string;
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [cartState, setCartState] = useState<CartState>('idle');

  const handleClick = useCallback(() => {
    if (cartState !== 'idle') return;
    setCartState('loading');
    setTimeout(() => {
      addToCart(product as Product);
      setCartState('success');
      setTimeout(() => setCartState('idle'), 1500);
    }, 400);
  }, [cartState, product, addToCart]);

  const bgClass = clsx(
    cartState === 'idle' && 'bg-primary hover:bg-primary-dark',
    cartState === 'loading' && 'bg-primary/70',
    cartState === 'success' && 'bg-success',
  );

  return (
    <motion.button
      onClick={handleClick}
      disabled={cartState !== 'idle'}
      className={clsx(
        'w-full flex items-center justify-center gap-2 rounded-lg font-semibold text-sm',
        'text-white cursor-pointer relative overflow-hidden',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1',
        bgClass,
        className
      )}
      aria-label={`Ajouter ${product.name} au panier`}
      whileHover={cartState === 'idle' ? { scale: 1.02 } : undefined}
      whileTap={cartState === 'idle' ? { scale: 0.96 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <AnimatePresence mode="wait">
        {cartState === 'loading' && (
          <motion.span
            key="loading"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Ajout...
          </motion.span>
        )}
        {cartState === 'success' && (
          <motion.span
            key="success"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Check size={16} aria-hidden="true" />
            Ajouté !
          </motion.span>
        )}
        {cartState === 'idle' && (
          <motion.span
            key="idle"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            Ajouter au panier
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
