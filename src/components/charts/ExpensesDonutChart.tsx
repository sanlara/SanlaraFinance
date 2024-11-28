import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CircleDollarSign } from 'lucide-react';
import { EmptyState } from '../EmptyState';
import type { Transaction, Category } from '../../types/transaction';

interface ExpensesDonutChartProps {
  transactions: Transaction[];
  categories: Category[];
}

export function ExpensesDonutChart({ transactions, categories }: ExpensesDonutChartProps) {
  const totalExpenses = transactions
    .filter(t => t.type === 'debito')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate expense categories data for donut chart
  const expensesByCategory = transactions
    .filter(t => t.type === 'debito' && t.categoryId)
    .reduce((acc, transaction) => {
      // Find the category for this transaction
      const category = categories.find(c => c.id === transaction.categoryId);
      if (!category) return acc;

      // If it's a subcategory, get its parent
      const parentId = category.parentId;
      const mainCategoryId = parentId || category.id;
      
      if (!acc[mainCategoryId]) {
        const mainCategory = categories.find(c => c.id === mainCategoryId);
        if (!mainCategory || mainCategory.isSubcategory) return acc;
        
        acc[mainCategoryId] = {
          categoryId: mainCategoryId,
          name: mainCategory.name,
          color: mainCategory.color,
          value: 0
        };
      }
      
      acc[mainCategoryId].value += transaction.amount;
      return acc;
    }, {} as Record<string, { categoryId: string; name: string; color: string; value: number; }>);

  // Sort categories by value and calculate percentages
  const allCategoriesData = Object.values(expensesByCategory)
    .map(({ categoryId, name, color, value }) => ({
      categoryId,
      name,
      color,
      value,
      percentage: ((value / totalExpenses) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value);

  // Split into top 6 and others
  const topCategories = allCategoriesData.slice(0, 6);
  const otherCategories = allCategoriesData.slice(6);
  
  // Calculate others total
  const othersTotal = otherCategories.reduce((sum, cat) => sum + cat.value, 0);
  const othersPercentage = ((othersTotal / totalExpenses) * 100).toFixed(1);

  // Add others to donut data if there are other categories
  const donutData = othersTotal > 0 
    ? [...topCategories, {
        categoryId: 'others',
        name: 'Otras categorías',
        color: '#4B5563', // Gray-600
        value: othersTotal,
        percentage: othersPercentage
      }]
    : topCategories;

  if (donutData.length === 0) {
    return (
      <EmptyState
        icon={CircleDollarSign}
        title="No hay datos de categorías"
        description="Asigna categorías a tus transacciones para ver la distribución de tus gastos aquí."
      />
    );
  }

  return (
    <>
      <div className="h-[210px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {donutData.map((entry) => (
                <Cell 
                  key={entry.categoryId}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#2A2A2A] p-2 rounded-lg border border-accent/10">
                      <p className="text-sm text-accent">{data.name}</p>
                      <p className="text-sm font-medium text-accent">
                        ${data.value.toFixed(2)} ({data.percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {topCategories.map((category) => (
            <div key={category.categoryId} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-accent truncate">{category.name}</span>
              </div>
              <div className="text-sm text-accent/70 ml-2">
                {category.percentage}%
              </div>
            </div>
          ))}
        </div>

        {othersTotal > 0 && (
          <>
            <div className="h-px bg-accent/10 my-2" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#4B5563' }}
                />
                <span className="text-sm text-accent">Otras categorías ({otherCategories.length})</span>
              </div>
              <div className="text-sm text-accent/70">
                {othersPercentage}%
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}