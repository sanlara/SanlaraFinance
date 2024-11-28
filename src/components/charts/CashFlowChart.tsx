import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { EmptyState } from '../EmptyState';
import type { Transaction } from '../../types/transaction';

interface CashFlowChartProps {
  transactions: Transaction[];
}

export function CashFlowChart({ transactions }: CashFlowChartProps) {
  // Create data for all months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1);
    return {
      name: date.toLocaleString('es', { month: 'short' }),
      ingresos: 0,
      egresos: 0
    };
  });

  // Group transactions by month across all banks
  transactions.forEach(transaction => {
    const month = transaction.rawDate.getMonth();
    
    if (transaction.type === 'crédito') {
      months[month].ingresos += transaction.amount;
    } else {
      months[month].egresos += transaction.amount;
    }
  });

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="No hay datos de flujo de caja"
        description="Importa transacciones para ver tu flujo de caja anual aquí."
      />
    );
  }

  return (
    <div className="h-[210px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={months} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#F5E6D3', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#F5E6D3', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const ingresos = payload[0].value as number;
                const egresos = payload[1].value as number;
                const balance = ingresos - egresos;
                
                return (
                  <div className="bg-[#2A2A2A] p-3 rounded-lg border border-accent/10">
                    <p className="text-sm font-medium text-accent mb-2">
                      {payload[0].payload.name}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-emerald-400">Ingresos: </span>
                        <span className="text-accent font-medium">${ingresos.toFixed(2)}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-rose-400">Egresos: </span>
                        <span className="text-accent font-medium">${egresos.toFixed(2)}</span>
                      </p>
                      <div className="h-px bg-accent/10 my-1" />
                      <p className="text-sm">
                        <span className="text-accent/70">Balance: </span>
                        <span className={`font-medium ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          ${balance.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="ingresos" 
            fill="#10B981" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar 
            dataKey="egresos" 
            fill="#F43F5E" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}