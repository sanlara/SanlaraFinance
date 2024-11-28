import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Transaction, Category } from '../types/transaction';
import { Institution } from '../types/institution';
import { Modal } from './ui/Modal';
import { CSVUploader } from './CSVUploader';
import { DateFilter } from './transactions/DateFilter';
import { TransactionHeader } from './transactions/TransactionHeader';
import { TransactionRow } from './transactions/TransactionRow';
import { EmptyTransactions } from './transactions/EmptyTransactions';
import { isWithinRange } from '../utils/dateUtils';
import toast from 'react-hot-toast';

interface TransactionsTableProps {
  transactions: Transaction[];
  categories: Category[];
  institutions: Institution[];
  onUpdateTransaction: (transaction: Transaction) => void;
  onDuplicateTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transactionId: string) => void;
  onDataProcessed: (data: string, bank: string) => void;
}

type SortField = 'date' | 'amount' | 'type' | 'bank' | 'category';
type SortDirection = 'asc' | 'desc';

interface EditingCell {
  transactionId: string;
  field: 'beneficiary' | 'categoryId' | 'amount' | 'date' | 'paymentType';
  value: string;
}

export function TransactionsTable({ 
  transactions, 
  categories, 
  institutions,
  onUpdateTransaction,
  onDuplicateTransaction,
  onDeleteTransaction,
  onDataProcessed
}: TransactionsTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [openCategorySelect, setOpenCategorySelect] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter transactions by date range if dates are set
  const filteredTransactions = transactions.filter(transaction => {
    if (!startDate || !endDate) return true;
    return isWithinRange(transaction.rawDate, startDate, endDate);
  });

  const displayedTransactions = [...filteredTransactions].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;

    switch (sortField) {
      case 'date':
        return multiplier * (a.rawDate.getTime() - b.rawDate.getTime());
      case 'amount':
        return multiplier * (a.amount - b.amount);
      case 'type':
        return multiplier * a.type.localeCompare(b.type);
      case 'bank':
        return multiplier * a.bank.localeCompare(b.bank);
      case 'category': {
        const categoryA = categories.find(c => c.id === a.categoryId)?.name || '';
        const categoryB = categories.find(c => c.id === b.categoryId)?.name || '';
        return multiplier * categoryA.localeCompare(categoryB);
      }
      default:
        return 0;
    }
  });

  const handleStartEdit = (transaction: Transaction, field: EditingCell['field']) => {
    let value = '';
    switch (field) {
      case 'amount':
        value = transaction.amount.toString();
        break;
      case 'date':
        value = transaction.date;
        break;
      case 'beneficiary':
        value = transaction.beneficiary;
        break;
      case 'paymentType':
        value = transaction.paymentType;
        break;
      default:
        value = transaction[field] || '';
    }
    
    setEditingCell({ transactionId: transaction.id, field, value });
  };

  const handleSaveEdit = (transaction: Transaction) => {
    if (!editingCell) return;

    let updatedValue: any = editingCell.value;
    let isValid = true;

    switch (editingCell.field) {
      case 'amount':
        const amount = parseFloat(editingCell.value);
        if (isNaN(amount) || amount <= 0) {
          toast.error('El valor debe ser un número positivo');
          isValid = false;
        }
        updatedValue = amount;
        break;
      case 'date':
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(editingCell.value)) {
          toast.error('Formato de fecha inválido (DD/MM/YYYY)');
          isValid = false;
        }
        break;
    }

    if (!isValid) return;

    const updatedTransaction = {
      ...transaction,
      [editingCell.field]: updatedValue
    };

    onUpdateTransaction(updatedTransaction);
    setEditingCell(null);
    toast.success('Transacción actualizada');
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
  };

  const handleCategorySelect = (transaction: Transaction, categoryId: string) => {
    onUpdateTransaction({
      ...transaction,
      categoryId
    });
    setOpenCategorySelect(null);
    toast.success('Categoría asignada');
  };

  if (transactions.length === 0) {
    return (
      <>
        <EmptyTransactions onImport={() => setShowImportModal(true)} />
        <Modal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          title="Importar Transacciones"
        >
          <CSVUploader
            onDataProcessed={(data, bank) => {
              onDataProcessed(data, bank);
              setShowImportModal(false);
            }}
            institutions={institutions}
          />
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="p-4 border-b border-accent/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-accent">Transacciones</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-[#2A2A2A] bg-accent hover:bg-accent/90 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar Transacciones
              </button>
            </div>
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <TransactionHeader
            sortField={sortField}
            onSort={handleSort}
          />
          <tbody className="divide-y divide-accent/10">
            {displayedTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                categories={categories}
                institutions={institutions}
                editingCell={editingCell}
                openCategorySelect={openCategorySelect}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onCategorySelect={handleCategorySelect}
                onSetOpenCategorySelect={setOpenCategorySelect}
                onDuplicate={onDuplicateTransaction}
                onDelete={onDeleteTransaction}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Importar Transacciones"
      >
        <CSVUploader
          onDataProcessed={(data, bank) => {
            onDataProcessed(data, bank);
            setShowImportModal(false);
          }}
          institutions={institutions}
        />
      </Modal>
    </>
  );
}