import React from 'react';

interface ExpenseChartProps {
  expenses: {
    category: string;
    amount: number;
    color: string;
  }[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.category} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{expense.category}</span>
            <span className="font-medium text-gray-900">
              ${expense.amount.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${expense.color}`}
              style={{ width: `${(expense.amount / total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
      
      <div className="pt-4 mt-4 border-t">
        <div className="flex justify-between">
          <span className="font-medium text-gray-900">Total Gastos</span>
          <span className="font-bold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}