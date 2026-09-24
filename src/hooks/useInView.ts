import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly triggerOnce?: boolean;
}

interface UseInViewReturn {
  readonly ref: React.RefObject<HTMLElement | null>;
  readonly isInView: boolean;
}

export function useInView({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseInViewOptions = {}): UseInViewReturn {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (!triggerOnce || !hasTriggered.current) {
          setIsInView(true);
          hasTriggered.current = true;
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleIntersect, threshold, rootMargin]);

  return { ref, isInView };
}
