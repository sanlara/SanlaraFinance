import React from 'react';
import { FileSpreadsheet, Upload } from 'lucide-react';

interface EmptyTransactionsProps {
  onImport: () => void;
}

export function EmptyTransactions({ onImport }: EmptyTransactionsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-accent/10 p-3 rounded-full mb-4">
        <FileSpreadsheet className="w-6 h-6 text-accent/60" />
      </div>
      <h3 className="text-lg font-medium text-accent mb-1">
        No hay transacciones
      </h3>
      <p className="text-sm text-accent/70 text-center max-w-sm mb-6">
        Importa un archivo CSV de tu institución financiera para ver tus transacciones aquí.
      </p>
      <button
        onClick={onImport}
        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-[#2A2A2A] bg-accent hover:bg-accent/90 transition-colors"
      >
        <Upload className="w-4 h-4 mr-2" />
        Importar Transacciones
      </button>
    </div>
  );
}