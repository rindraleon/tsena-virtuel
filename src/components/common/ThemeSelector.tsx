import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

type Theme = 'light' | 'dark' | 'system';

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Clair', icon: Sun },
  { value: 'dark', label: 'Sombre', icon: Moon },
  { value: 'system', label: 'Système', icon: Monitor },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (value: Theme) => {
    setTheme(value);
    setOpen(false);

    // Brief transition class for smooth color swap
    document.documentElement.classList.add('transitioning');
    setTimeout(() => document.documentElement.classList.remove('transitioning'), 400);
  };

  const currentOption = themeOptions.find((o) => o.value === theme) ?? themeOptions[2];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-tertiary text-muted hover:text-text hover:bg-surface-hover transition-colors"
        aria-label="Changer le thème"
        aria-expanded={open}
        aria-haspopup="listbox"
        title={`Thème : ${currentOption.label}`}
      >
        <CurrentIcon size={17} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-1.5 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50 min-w-[150px]"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            aria-label="Sélection du thème"
          >
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text hover:bg-surface-hover'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <Icon size={15} />
                  {option.label}
                  {isSelected && (
                    <motion.span
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      layoutId="theme-indicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
