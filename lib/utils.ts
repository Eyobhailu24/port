import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Staggered delay (seconds) for the Nth item in a scroll-reveal list. */
export function staggerDelay(index: number, step = 0.08) {
  return index * step;
}
