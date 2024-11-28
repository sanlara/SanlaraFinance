import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="bg-accent/10 p-3 rounded-full mb-4">
        <Icon className="w-6 h-6 text-accent/60" />
      </div>
      <h3 className="text-lg font-medium text-accent mb-1">
        {title}
      </h3>
      <p className="text-sm text-accent/70 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
}