import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent } from 'lucide-react';
import type { Transaction, Category } from '../types/transaction';
import { CashFlowChart } from './charts/CashFlowChart';
import { ExpensesDonutChart } from './charts/ExpensesDonutChart';

interface OverviewDashboardProps {
  transactions: Transaction[];
  categories: Category[];
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-[#2A2A2A] rounded-xl p-4 border border-accent/10">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-accent/10 rounded-xl">
          {icon}
        </div>
      </div>
      <h3 className="text-xs font-medium text-accent/70 mb-0.5">{title}</h3>
      <p className="text-xl font-bold text-accent">{value}</p>
    </div>
  );
}

export function OverviewDashboard({ transactions, categories }: OverviewDashboardProps) {
  // Calculate totals for the filtered period across all banks
  const totalIncome = transactions
    .filter(t => t.type === 'crédito')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'debito')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavings = totalIncome - totalExpenses;
  const savingsPercentage = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  // Format values
  const formatValue = (value: number) => {
    if (value === 0) return '-';
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ingresos"
          value={formatValue(totalIncome)}
          icon={<ArrowUpRight className="w-4 h-4 text-emerald-400" />}
        />
        <StatCard
          title="Egresos"
          value={formatValue(totalExpenses)}
          icon={<ArrowDownRight className="w-4 h-4 text-rose-400" />}
        />
        <StatCard
          title="Ahorro Total"
          value={formatValue(totalSavings)}
          icon={<DollarSign className="w-4 h-4 text-accent" />}
        />
        <StatCard
          title="Porcentaje de Ahorro"
          value={totalIncome === 0 ? '-' : `${savingsPercentage.toFixed(1)}%`}
          icon={<Percent className="w-4 h-4 text-accent" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#2A2A2A] rounded-xl p-4 border border-accent/10">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-medium text-accent">Flujo de Caja Anual</h2>
          </div>
          <CashFlowChart transactions={transactions} />
        </div>

        <div className="bg-[#2A2A2A] rounded-xl p-4 border border-accent/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-accent">Egresos por Categoría</h2>
            <span className="text-sm text-accent/70">
              Total: {formatValue(totalExpenses)}
            </span>
          </div>
          <ExpensesDonutChart 
            transactions={transactions}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}