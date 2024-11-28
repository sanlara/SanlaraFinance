import React from 'react';
import { ArrowUpDown, Clock } from 'lucide-react';

type SortField = 'date' | 'amount' | 'type' | 'bank' | 'category';

interface TransactionHeaderProps {
  sortField: SortField | null;
  onSort: (field: SortField) => void;
}

export function TransactionHeader({ sortField, onSort }: TransactionHeaderProps) {
  const SortableHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th 
      className="px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors whitespace-nowrap"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1 text-accent/80">
        {label}
        <ArrowUpDown className={`w-4 h-4 ${sortField === field ? 'text-accent' : 'text-accent/50'}`} />
      </div>
    </th>
  );

  return (
    <thead className="text-xs uppercase bg-white/5">
      <tr>
        <SortableHeader field="date" label="Fecha" />
        <th className="px-4 py-3 text-accent/80">Beneficiario</th>
        <SortableHeader field="type" label="Tipo" />
        <SortableHeader field="amount" label="Valor" />
        <th className="px-4 py-3 text-accent/80">Tipo de Pago</th>
        <SortableHeader field="bank" label="Institución" />
        <SortableHeader field="category" label="Categoría" />
        <th className="px-4 py-3 text-accent/80">Acciones</th>
        <th className="px-4 py-3 text-accent/80">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Importación</span>
          </div>
        </th>
      </tr>
    </thead>
  );
}