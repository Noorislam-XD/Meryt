import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return score.toLocaleString("en-US");
}

export function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export function clampScore(score: number, min = 0, max = 10000): number {
  return Math.max(min, Math.min(max, score));
}

export function pluralize(count: number, word: string): string {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}
