import React from 'react';
import { cn, inputVariants } from '../../utils/styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Input({ 
  label,
  size = 'md',
  className,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-accent/80 mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          inputVariants.base,
          inputVariants.bordered,
          inputVariants.sizes[size],
          className
        )}
        {...props}
      />
    </div>
  );
}