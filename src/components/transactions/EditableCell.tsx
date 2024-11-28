import React from 'react';
import { Check, X, Edit2 } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { parseDate } from '../../utils/dateUtils';

interface EditableCellProps {
  transaction: Transaction;
  field: 'beneficiary' | 'categoryId' | 'amount' | 'date' | 'paymentType';
  value: string | number;
  type?: 'text' | 'number' | 'date';
  editingCell: {
    transactionId: string;
    field: 'beneficiary' | 'categoryId' | 'amount' | 'date' | 'paymentType';
    value: string;
  } | null;
  onStartEdit: (transaction: Transaction, field: 'beneficiary' | 'categoryId' | 'amount' | 'date' | 'paymentType') => void;
  onSaveEdit: (transaction: Transaction) => void;
  onCancelEdit: () => void;
}

export function EditableCell({
  transaction,
  field,
  value,
  type = 'text',
  editingCell,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}: EditableCellProps) {
  const isEditing = editingCell?.transactionId === transaction.id && editingCell.field === field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // If it's a date field, update both date and rawDate
    if (field === 'date') {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (dateRegex.test(newValue)) {
        const rawDate = parseDate(newValue);
        onStartEdit({
          ...transaction,
          date: newValue,
          rawDate
        }, field);
      } else {
        onStartEdit({
          ...transaction,
          date: newValue
        }, field);
      }
    } else {
      onStartEdit({
        ...transaction,
        [field]: newValue
      }, field);
    }
  };

  return isEditing ? (
    <div className="flex items-center gap-2">
      <input
        type={type}
        value={editingCell.value}
        onChange={handleChange}
        className="bg-[#2A2A2A] text-accent px-2 py-1 rounded border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
        autoFocus
      />
      <button
        onClick={() => onSaveEdit(transaction)}
        className="p-1 hover:bg-accent/10 rounded-md text-accent"
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        onClick={onCancelEdit}
        className="p-1 hover:bg-accent/10 rounded-md text-accent/70"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2 group">
      <span className="text-accent truncate" title={value.toString()}>
        {value}
      </span>
      <button
        onClick={() => onStartEdit(transaction, field)}
        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-accent/10 rounded-md transition-opacity"
      >
        <Edit2 className="w-4 h-4 text-accent/50" />
      </button>
    </div>
  );
}