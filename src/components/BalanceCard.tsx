import React from 'react';

interface BalanceCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  trend: number;
  color: string;
}

export function BalanceCard({ title, amount, icon, color }: BalanceCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} bg-opacity-10 p-3 rounded-xl`}>
          <div className={`${color.replace('bg-', 'text-')}`}>
            {icon}
          </div>
        </div>
        <div className={`text-xs px-3 py-1.5 rounded-full ${
          amount >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {amount >= 0 ? '+' : ''}{((amount / 1000) * 100).toFixed(1)}%
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        ${Math.abs(amount).toFixed(2)}
      </p>
    </div>
  );
}