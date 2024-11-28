import React from 'react';
import { cn, buttonVariants } from '../../utils/styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants.base,
        buttonVariants[variant],
        buttonVariants.sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}