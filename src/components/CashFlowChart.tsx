import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../types/transaction';

interface CashFlowChartProps {
  transactions: Transaction[];
}

export function CashFlowChart({ transactions }: CashFlowChartProps) {
  const dailyTotals = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }
    
    if (transaction.type === 'crédito') {
      acc[date].income += transaction.amount;
    } else {
      acc[date].expense += transaction.amount;
    }
    
    return acc;
  }, {} as Record<string, { date: string; income: number; expense: number; }>);

  const data = Object.values(dailyTotals).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const totalIncome = transactions
    .filter(t => t.type === 'crédito')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'debito')
    .reduce((sum, t) => sum + t.amount, 0);

  const colors = {
    income: '#2A2A2A',
    expense: '#F5E6D3',
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Flujo de Caja</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm font-medium text-primary bg-accent/50 rounded-full">
            Semanal
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-full">
            Diario
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 h-[300px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar
                dataKey="income"
                fill={colors.income}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Bar
                dataKey="expense"
                fill={colors.expense}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:w-72 grid grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium">Ingresos</h3>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">${totalIncome.toFixed(2)}</p>
                <span className="text-primary text-sm bg-accent/50 px-2 py-1 rounded-full">
                  +45.0% ↑
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium">Egresos</h3>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
                <span className="text-primary text-sm bg-accent/50 px-2 py-1 rounded-full">
                  +12.5% ↑
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}