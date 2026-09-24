import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../../lib/animations';

interface AnimatedPageProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Wrapper pour les pages avec animation d'entrée/sortie fluide.
 * Utilise framer-motion pour des transitions de page cohérentes.
 */
export default function AnimatedPage({ children, className = '' }: AnimatedPageProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}
