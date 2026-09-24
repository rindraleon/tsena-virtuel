import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface AnimatedCounterProps {
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly duration?: number;
  readonly decimals?: number;
  readonly className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 800,
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView({ triggerOnce: true });
  const displayValue = useAnimatedCounter(isInView ? value : 0, { duration, decimals });

  return (
    <motion.span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={className}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
