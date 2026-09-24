import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../../components/common/AnimatedCounter';

interface StatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon: LucideIcon;
  readonly trend?: { readonly value: string; readonly positive: boolean };
  readonly color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  readonly index?: number;
}

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-yellow-50 text-yellow-600',
  danger: 'bg-red-50 text-red-600',
  info: 'bg-blue-50 text-blue-600',
};

export default function StatCard({ title, value, icon: Icon, trend, color = 'primary', index = 0 }: StatCardProps) {
  const isNumeric = typeof value === 'number';

  return (
    <motion.div
      className="bg-surface rounded-xl border border-border p-5 hover:shadow-md transition-shadow cursor-default"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -3,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted mb-1">{title}</p>
          {isNumeric ? (
            <p className="text-2xl font-bold text-text">
              <AnimatedCounter value={value} duration={700} />
            </p>
          ) : (
            <motion.p
              className="text-2xl font-bold text-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
            >
              {value}
            </motion.p>
          )}
          {trend && (
            <motion.p
              className={`text-xs mt-2 font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
            >
              {trend.positive ? '↑' : '↓'} {trend.value}
            </motion.p>
          )}
        </div>
        <motion.div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.08 + 0.1,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
        >
          <Icon size={22} aria-hidden="true" />
        </motion.div>
      </div>
    </motion.div>
  );
}
