import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterOptions {
  readonly duration?: number;
  readonly decimals?: number;
  readonly separator?: string;
}

export function useAnimatedCounter(
  target: number,
  { duration = 800, decimals = 0, separator = ' ' }: UseAnimatedCounterOptions = {}
): string {
  const [value, setValue] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    startRef.current = value;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startRef.current + (target - startRef.current) * eased;

      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  const formatted = value.toFixed(decimals);
  if (separator && formatted.includes('.')) {
    const [intPart, decPart] = formatted.split('.');
    return `${Number(intPart).toLocaleString('fr-FR')}.${decPart}`;
  }
  return Number(Math.round(value)).toLocaleString('fr-FR', { useGrouping: true });
}
