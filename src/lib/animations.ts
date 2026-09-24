// Animation variants réutilisables pour framer-motion
// Centralise toutes les animations pour cohérence et fluidité

import type { Variants } from 'framer-motion';

// ─── EASING ─────────────────────────────────────────────
// Courbes d'accélération naturelles
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1] as const,       // default smooth
  out: [0.16, 1, 0.3, 1] as const,              // expo-out (très fluide)
  inOut: [0.65, 0, 0.35, 1] as const,           // smooth in-out
  spring: [0.34, 1.56, 0.64, 1] as const,       // spring-like overshoot
  gentle: [0.4, 0, 0.2, 1] as const,            // very gentle
} as const;

// ─── DURÉES ──────────────────────────────────────────────
export const duration = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  slower: 0.7,
} as const;

// ─── PAGE TRANSITION ─────────────────────────────────────
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.out,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
};

// ─── FADE IN ─────────────────────────────────────────────
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
};

// ─── FADE IN UP ──────────────────────────────────────────
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

// ─── FADE IN DOWN ────────────────────────────────────────
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

// ─── SCALE IN ────────────────────────────────────────────
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.out },
  },
};

// ─── SLIDE IN FROM SIDE ──────────────────────────────────
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

// ─── STAGGER CONTAINER ───────────────────────────────────
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

// ─── STAGGER CHILD ───────────────────────────────────────
export const staggerChild: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.out,
    },
  },
};

export const staggerChildScale: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.out,
    },
  },
};

// ─── HOVER EFFECTS ───────────────────────────────────────
export const hoverLift = {
  y: -4,
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
};

export const hoverScale = {
  scale: 1.02,
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
};

export const tapScale = {
  scale: 0.97,
  transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
};

// ─── BUTTON VARIANTS ─────────────────────────────────────
export const buttonVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.fast, ease: easing.out },
  },
  hover: {
    scale: 1.03,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
  tap: {
    scale: 0.96,
    transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
  },
};

// ─── REVEAL ON SCROLL ────────────────────────────────────
export const revealOnScroll: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: easing.out,
    },
  },
};

// ─── COUNTER ANIMATION ───────────────────────────────────
export const counterVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

// ─── DROPDOWN/MENU ───────────────────────────────────────
export const dropdownVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: -4,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: duration.fast,
      ease: easing.out,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: {
      duration: 0.15,
      ease: easing.smooth,
    },
  },
};
