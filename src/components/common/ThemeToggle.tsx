import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    // Cycle through: light → dark → system → light
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);

    // Brief transition class on html for smooth color swap
    document.documentElement.classList.add('transitioning');
    setTimeout(() => document.documentElement.classList.remove('transitioning'), 400);
  };

  const currentLabel = theme === 'light' ? 'Mode clair' : theme === 'dark' ? 'Mode sombre' : 'Thème système';

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-surface-tertiary text-muted hover:text-text hover:bg-surface-hover transition-colors"
      aria-label={currentLabel}
      title={currentLabel}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {theme === 'light' && <Sun size={17} />}
          {theme === 'dark' && <Moon size={17} />}
          {theme === 'system' && <Monitor size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
