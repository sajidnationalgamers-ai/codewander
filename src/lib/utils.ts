import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const CATEGORIES = ['All', 'AI', 'Web Dev', 'Apps', 'Cybersecurity', 'DevOps'] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  AI: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Web Dev': 'bg-brand-500/10 text-brand-400 border-brand-500/20',
  Apps: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Cybersecurity: 'bg-red-500/10 text-red-400 border-red-500/20',
  DevOps: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};
