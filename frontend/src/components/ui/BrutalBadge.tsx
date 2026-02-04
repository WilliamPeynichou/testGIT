import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BrutalBadgeProps {
  children: ReactNode;
  variant?: 'mauve' | 'orange' | 'yellow' | 'black';
  className?: string;
}

const variants = {
  mauve: 'bg-mauve text-deep-black border-deep-black',
  orange: 'bg-dark-orange text-white border-deep-black',
  yellow: 'bg-pale-yellow text-deep-black border-deep-black',
  black: 'bg-deep-black text-white border-deep-black',
};

export function BrutalBadge({ children, variant = 'mauve', className }: BrutalBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full border-2 font-bold text-xs uppercase tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
