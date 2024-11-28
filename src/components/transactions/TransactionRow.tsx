import React from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronDown, Copy, Trash2, Edit2, Clock } from 'lucide-react';
import type { Transaction, Category } from '../../types/transaction';
import type { Institution } from '../../types/institution';
import { EditableCell } from './EditableCell';
import { formatDateTime } from '../../utils/dateUtils';

interface TransactionRowProps {
  transaction: Transaction;
  categories: Category[];
  institutions: Institution[];
  editingCell: {
    transactionId: string;
    field: 'beneficiary' | 'categoryId' | 'amount' | 'date' | 'paymentType';
    value: string;
  } | null;
  openCategorySelect: string | null;
  onStartEdit: (transaction: Transaction, field: 'beneficiary' | 'categoryId' | 'amount' | 'date' | 'paymentType') => void;
  onSaveEdit: (transaction: Transaction) => void;
  onCancelEdit: () => void;
  onCategorySelect: (transaction: Transaction, categoryId: string) => void;
  onSetOpenCategorySelect: (id: string | null) => void;
  onDuplicate: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

export function TransactionRow({
  transaction,
  categories,
  institutions,
  editingCell,
  openCategorySelect,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onCategorySelect,
  onSetOpenCategorySelect,
  onDuplicate,
  onDelete
}: TransactionRowProps) {
  const currentCategory = categories.find(c => c.id === transaction.categoryId);
  const institution = institutions.find(i => i.name === transaction.bank);
  const availableCategories = categories.filter(cat => {
    const type = transaction.type === 'crédito' ? 'income' : 'expense';
    return cat.type === type;
  });
  const isSelectOpen = openCategorySelect === transaction.id;

  return (
    <tr className="hover:bg-accent/5 transition-colors">
      <td className="px-4 py-3 whitespace-nowrap">
        <EditableCell
          transaction={transaction}
          field="date"
          value={transaction.date}
          editingCell={editingCell}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      </td>
      <td className="px-4 py-3 max-w-[200px]">
        <EditableCell
          transaction={transaction}
          field="beneficiary"
          value={transaction.beneficiary}
          editingCell={editingCell}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="flex items-center gap-1">
          <span className={`p-1 rounded-md ${
            transaction.type === 'crédito' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'
          }`}>
            {transaction.type === 'crédito' ? 
              <ArrowUpRight className="w-3 h-3" /> : 
              <ArrowDownRight className="w-3 h-3" />
            }
          </span>
          <span className={`${
            transaction.type === 'crédito' ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {transaction.type}
          </span>
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <EditableCell
          transaction={transaction}
          field="amount"
          value={`${transaction.type === 'crédito' ? '+' : '-'}$${transaction.amount.toFixed(2)}`}
          type="number"
          editingCell={editingCell}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      </td>
      <td className="px-4 py-3 max-w-[150px]">
        <EditableCell
          transaction={transaction}
          field="paymentType"
          value={transaction.paymentType}
          editingCell={editingCell}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      </td>
      <td className="px-4 py-3 text-accent/70 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {institution && (
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: institution.color }}
            />
          )}
          <span>{transaction.bank}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-accent/70 relative">
        <div className="relative">
          <button
            onClick={() => onSetOpenCategorySelect(isSelectOpen ? null : transaction.id)}
            className={`
              w-full flex items-center justify-between gap-2
              px-2 py-1.5 text-sm rounded-lg
              ${currentCategory ? 'text-accent' : 'text-accent/50'}
              ${isSelectOpen ? 'bg-accent/10' : 'hover:bg-accent/5'}
              transition-colors
            `}
          >
            <div className="flex items-center gap-2 min-w-0">
              {currentCategory && (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: currentCategory.color }}
                />
              )}
              <span className="truncate">
                {currentCategory ? currentCategory.name : 'Sin categoría'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${
              isSelectOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {isSelectOpen && (
            <div className="
              absolute z-10 mt-1 w-48 right-0
              bg-[#2A2A2A] rounded-lg shadow-lg
              border border-accent/10
              py-1
            ">
              {availableCategories.length === 0 ? (
                <div className="px-3 py-2 text-sm text-accent/50">
                  No hay categorías disponibles
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onCategorySelect(transaction, '')}
                    className="w-full px-3 py-2 text-left text-sm text-accent/70 hover:bg-accent/5"
                  >
                    Sin categoría
                  </button>
                  {availableCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => onCategorySelect(transaction, category.id)}
                      className="
                        w-full px-3 py-2 text-left
                        flex items-center gap-2
                        text-sm text-accent
                        hover:bg-accent/5
                      "
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="truncate">{category.name}</span>
                      {category.isSubcategory && (
                        <span className="text-xs text-accent/50 ml-auto">
                          Subcategoría
                        </span>
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDuplicate(transaction)}
            className="p-1.5 text-accent/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
            title="Duplicar transacción"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-1.5 text-accent/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
            title="Eliminar transacción"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
      <td className="px-4 py-3 text-accent/50 text-xs whitespace-nowrap">
        {transaction.uploadDate && (
          <div className="flex items-center gap-1" title="Fecha de importación">
            <Clock className="w-3 h-3" />
            <span>{formatDateTime(transaction.uploadDate)}</span>
          </div>
        )}
      </td>
    </tr>
  );
}