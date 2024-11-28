import React from 'react';
import { tab } from '../../styles/components';

interface TabProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Tab({
  active = false,
  onClick,
  children,
  className = '',
}: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`${tab.base} ${active ? tab.variants.active : tab.variants.inactive} ${className}`}
    >
      {children}
    </button>
  );
}