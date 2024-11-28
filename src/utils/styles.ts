import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const buttonVariants = {
  base: 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  primary: 'bg-accent text-[#2A2A2A] hover:bg-accent/90 focus:ring-accent',
  secondary: 'border border-accent/20 text-accent bg-transparent hover:bg-accent/10 focus:ring-accent',
  danger: 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500',
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  }
};

export const inputVariants = {
  base: 'w-full bg-[#2A2A2A] text-accent rounded-lg transition-colors focus:outline-none focus:ring-1',
  bordered: 'border border-accent/20 focus:border-accent focus:ring-accent',
  sizes: {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  }
};

export const cardVariants = {
  base: 'bg-[#333333] rounded-2xl border border-accent/10',
  header: 'p-4 border-b border-accent/10',
  body: 'p-6'
};

export const tableVariants = {
  base: 'w-full text-sm',
  header: 'text-xs uppercase bg-white/5',
  headerCell: 'px-4 py-3 text-accent/80',
  row: 'hover:bg-white/5 transition-colors',
  cell: 'px-4 py-3'
};