import React from 'react';
import { badge } from '../../styles/components';

interface BadgeProps {
  variant?: 'success' | 'error';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ 
  variant = 'success',
  children,
  className = ''
}: BadgeProps) {
  return (
    <span className={`${badge.base} ${badge.variants[variant]} ${className}`}>
      {children}
    </span>
  );
}