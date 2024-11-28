import React from 'react';
import { Database } from 'lucide-react';

interface DummyDataToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function DummyDataToggle({ enabled, onToggle }: DummyDataToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg
        transition-colors
        ${enabled ? 'bg-accent/10 text-accent' : 'text-accent/50 hover:bg-accent/5'}
      `}
      title={enabled ? 'Usando datos de prueba' : 'Usar datos de prueba'}
    >
      <Database className="w-4 h-4" />
      <span className="text-sm">Datos de prueba</span>
    </button>
  );
}