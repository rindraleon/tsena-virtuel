import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductRating from './ProductRating';
import ProductPrice from './ProductPrice';
import AddToCartButton from './AddToCartButton';
import type { ProductLike } from '../../types/product';

interface ProductCardProps {
  readonly product: ProductLike;
  readonly onClickDetail?: () => void;
  readonly index?: number;
}

export default function ProductCard({ product, onClickDetail, index = 0 }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClickDetail?.();
    navigate(`/produits/${product.id}`);
  };

  return (
    <motion.div
      className="bg-surface rounded-xl border border-border overflow-hidden group"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12)',
        transition: { type: 'spring', stiffness: 350, damping: 22 },
      }}
      whileTap={{ scale: 0.97 }}
      layout
    >
      {/* Image - clickable */}
      <div className="relative p-4 pb-2 cursor-pointer" onClick={handleClick}>
        {product.discount && (
          <motion.div
            className="absolute top-6 left-6 bg-danger text-white text-xs font-bold px-2 py-1 rounded-md z-10"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05 + 0.2, type: 'spring', stiffness: 300, damping: 15 }}
          >
            -{product.discount}%
          </motion.div>
        )}
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            width={300}
            height={300}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-2">
        <h3
          className="font-semibold text-sm text-text line-clamp-2 mb-1 min-h-[2.5rem] cursor-pointer hover:text-primary transition-colors"
          onClick={handleClick}
        >
          {product.name}
        </h3>
        {product.variant && (
          <p className="text-xs text-muted mb-2">{product.variant}</p>
        )}
        <ProductPrice price={product.price} oldPrice={product.oldPrice} className="mb-2" />
        <ProductRating rating={product.rating || 0} reviews={product.reviews} className="mb-3" />
        <AddToCartButton product={product} />
      </div>
    </motion.div>
  );
}
