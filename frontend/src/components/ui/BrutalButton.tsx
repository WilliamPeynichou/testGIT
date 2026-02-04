import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface BrutalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'mauve' | 'orange' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

const variantStyles = {
  mauve: 'bg-mauve text-deep-black',
  orange: 'bg-dark-orange text-white',
  yellow: 'bg-pale-yellow text-deep-black',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function BrutalButton({
  variant = 'mauve',
  size = 'md',
  children,
  isLoading,
  className,
  disabled,
  ...props
}: BrutalButtonProps) {
  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { x: -2, y: -2 } : undefined}
      whileTap={!disabled && !isLoading ? { x: 2, y: 2 } : undefined}
      className={cn(
        'btn-brutal font-bold select-none',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 border-3 border-current border-t-transparent rounded-full animate-spin-thick" />
          Chargement...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
