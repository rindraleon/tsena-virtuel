import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  readonly delay?: number;
  readonly duration?: number;
  readonly threshold?: number;
  readonly once?: boolean;
}

const directionMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { y: 0, x: -30 },
  right: { y: 0, x: 30 },
  none: { y: 0, x: 0 },
};

export default function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: RevealProps) {
  const { ref, isInView } = useInView({ threshold, triggerOnce: once });

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // expo-out
      }}
    >
      {children}
    </motion.div>
  );
}
