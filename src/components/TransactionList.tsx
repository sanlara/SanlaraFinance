import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              transaction.type === 'crédito' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {transaction.type === 'crédito' ? 
                <ArrowUpRight className="w-4 h-4" /> : 
                <ArrowDownRight className="w-4 h-4" />
              }
            </div>
            <div>
              <p className="font-medium text-gray-900">{transaction.beneficiary}</p>
              <p className="text-sm text-gray-500">{transaction.paymentType}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-medium ${
              transaction.type === 'crédito' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'crédito' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {transaction.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}