/**
 * Shared animation constants and variant factories.
 *
 * Centralises values that were previously duplicated across 8+ component files
 * so that a single change propagates everywhere.
 */

/** Shared easing curve used across the entire site. */
export const ease = [0.33, 1, 0.68, 1] as [number, number, number, number];

/**
 * A "fade-up" motion variant.
 *
 * Currently configured as a no-op (instant show) — keeping the variant object
 * so it can be swapped for a real animation later without touching every file.
 */
export const fadeUp = {
  hidden: { y: 0, opacity: 1 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0,
    },
  }),
};
