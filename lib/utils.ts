import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names. Add clsx + tailwind-merge if you need to resolve conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format price for display (e.g. 0 → "Free", 20 → "$20/mo")
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === 0) return "Free";
  return `$${price}/mo`;
}

/**
 * Estimate reading time in minutes from word count.
 */
export function readingTimeMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}
