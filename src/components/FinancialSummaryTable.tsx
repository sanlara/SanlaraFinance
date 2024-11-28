import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText } from 'lucide-react';
import { Transaction, Category } from '../types/transaction';
import { EmptyState } from './EmptyState';

interface FinancialSummaryTableProps {
  transactions: Transaction[];
  categories: Category[];
}

interface MonthlyTotal {
  [key: string]: number;
}

export function FinancialSummaryTable({ transactions, categories }: FinancialSummaryTableProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  const currentYear = new Date().getFullYear();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  // Separate categories by type and hierarchy
  const categoriesByType = {
    income: categories.filter(c => c.type === 'income' && !c.isSubcategory),
    expense: categories.filter(c => c.type === 'expense' && !c.isSubcategory)
  };

  // Format amount
  const formatAmount = (amount: number) => {
    return amount === 0 ? '-' : `$${amount.toFixed(2)}`;
  };

  // Calculate totals by category and month
  const calculateTotals = (categories: Category[], type: 'crédito' | 'debito') => {
    const categoryTotals: { [key: string]: MonthlyTotal } = {};
    const monthlyTotals: MonthlyTotal = {};

    // Initialize all months with zero
    months.forEach(month => {
      monthlyTotals[month] = 0;
      categories.forEach(category => {
        if (!categoryTotals[category.id]) {
          categoryTotals[category.id] = {};
        }
        categoryTotals[category.id][month] = 0;
      });
    });

    // Calculate actual totals
    transactions
      .filter(t => t.type === type && t.rawDate.getFullYear() === currentYear && t.categoryId)
      .forEach(transaction => {
        const month = months[transaction.rawDate.getMonth()];
        const category = categories.find(c => c.id === transaction.categoryId);
        
        if (!category) return;

        // Add to category total
        categoryTotals[category.id][month] += transaction.amount;
        monthlyTotals[month] += transaction.amount;

        // If it's a subcategory, also add to parent category
        if (category.parentId) {
          if (!categoryTotals[category.parentId]) {
            categoryTotals[category.parentId] = months.reduce((acc, m) => ({ ...acc, [m]: 0 }), {});
          }
          categoryTotals[category.parentId][month] += transaction.amount;
        }
      });

    return { categoryTotals, monthlyTotals };
  };

  const renderCategoryRow = (
    category: Category,
    categoryTotals: { [key: string]: MonthlyTotal },
    type: 'income' | 'expense',
    depth: number = 0
  ) => {
    const subcategories = categories.filter(c => c.parentId === category.id);
    const hasSubcategories = subcategories.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const total = Object.values(categoryTotals[category.id] || {}).reduce((sum, val) => sum + val, 0);
    const totalColor = type === 'income' ? 'text-emerald-400' : 'text-rose-400';

    return (
      <React.Fragment key={category.id}>
        <tr className="hover:bg-accent/5">
          <td className="p-2 sticky left-0 bg-[#333333] font-medium text-accent">
            <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 1.5}rem` }}>
              {hasSubcategories && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1 hover:bg-accent/10 rounded-md transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-accent/70" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-accent/70" />
                  )}
                </button>
              )}
              {!hasSubcategories && <div className="w-6" />}
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: category.color }}
              />
              <span className="truncate">{category.name}</span>
            </div>
          </td>
          {months.map(month => (
            <td key={`${category.id}-${month}`} className="p-2 text-right text-accent">
              {formatAmount(categoryTotals[category.id]?.[month] || 0)}
            </td>
          ))}
          <td className={`p-2 text-right bg-accent/5 font-medium ${totalColor}`}>
            {formatAmount(total)}
          </td>
        </tr>
        {isExpanded && subcategories.map(subcat => 
          renderCategoryRow(subcat, categoryTotals, type, depth + 1)
        )}
      </React.Fragment>
    );
  };

  const renderTable = (title: string, mainCategories: Category[], type: 'income' | 'expense', transactionType: 'crédito' | 'debito') => {
    const { categoryTotals, monthlyTotals } = calculateTotals(categories, transactionType);
    const totalAmount = Object.values(monthlyTotals).reduce((sum, val) => sum + val, 0);
    const totalColor = type === 'income' ? 'text-emerald-400' : 'text-rose-400';

    if (mainCategories.length === 0) {
      return (
        <div className="bg-[#333333] rounded-2xl border border-accent/10 mt-6">
          <div className="p-4 border-b border-accent/10">
            <h2 className="text-xl font-semibold text-accent">{title}</h2>
          </div>
          <EmptyState
            icon={FileText}
            title={`No hay ${type === 'income' ? 'categorías de ingresos' : 'categorías de egresos'}`}
            description={`Crea ${type === 'income' ? 'categorías de ingresos' : 'categorías de egresos'} en la sección de Recursos para visualizar el detalle aquí.`}
          />
        </div>
      );
    }

    return (
      <div className="bg-[#333333] rounded-2xl border border-accent/10 mt-6">
        <div className="p-4 border-b border-accent/10">
          <h2 className="text-xl font-semibold text-accent">{title}</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-accent/70">
                <th className="text-left p-2 sticky left-0 bg-[#333333] z-10 min-w-[180px]">Categoría</th>
                {months.map(month => (
                  <th key={month} className="p-2 text-right min-w-[80px] whitespace-nowrap">{month}</th>
                ))}
                <th className="p-2 text-right bg-accent/5 min-w-[100px]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/10">
              {mainCategories.map(category => 
                renderCategoryRow(category, categoryTotals, type)
              )}
            </tbody>
            <tfoot className="border-t-2 border-accent/20">
              <tr className="font-medium bg-accent/5">
                <td className="p-2 sticky left-0 bg-accent/5 text-accent">Total</td>
                {months.map(month => (
                  <td key={`total-${month}`} className={`p-2 text-right ${totalColor}`}>
                    {formatAmount(monthlyTotals[month])}
                  </td>
                ))}
                <td className={`p-2 text-right font-medium ${totalColor}`}>
                  {formatAmount(totalAmount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  const renderSummaryTable = () => {
    const { monthlyTotals: incomeTotals } = calculateTotals(categories, 'crédito');
    const { monthlyTotals: expenseTotals } = calculateTotals(categories, 'debito');

    const totalIncome = Object.values(incomeTotals).reduce((sum, val) => sum + val, 0);
    const totalExpenses = Object.values(expenseTotals).reduce((sum, val) => sum + val, 0);
    const totalSavings = totalIncome - totalExpenses;

    if (transactions.length === 0) {
      return (
        <div className="bg-[#333333] rounded-2xl border border-accent/10 mt-6">
          <div className="p-4 border-b border-accent/10">
            <h2 className="text-xl font-semibold text-accent">Resumen Financiero</h2>
          </div>
          <EmptyState
            icon={FileText}
            title="No hay transacciones"
            description="Importa transacciones en la sección de Transacciones para visualizar tu resumen financiero aquí."
          />
        </div>
      );
    }

    return (
      <div className="bg-[#333333] rounded-2xl border border-accent/10 mt-6">
        <div className="p-4 border-b border-accent/10">
          <h2 className="text-xl font-semibold text-accent">Resumen Financiero</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-accent/70">
                <th className="text-left p-2 sticky left-0 bg-[#333333] z-10">Tipo</th>
                {months.map(month => (
                  <th key={month} className="p-2 text-right min-w-[80px] whitespace-nowrap">{month}</th>
                ))}
                <th className="p-2 text-right bg-accent/5 min-w-[100px]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/10">
              <tr className="hover:bg-accent/5">
                <td className="p-2 sticky left-0 bg-[#333333] font-medium text-accent">Ingresos</td>
                {months.map(month => (
                  <td key={`income-${month}`} className="p-2 text-right text-emerald-400">
                    {formatAmount(incomeTotals[month] || 0)}
                  </td>
                ))}
                <td className="p-2 text-right bg-accent/5 font-medium text-emerald-400">
                  {formatAmount(totalIncome)}
                </td>
              </tr>
              <tr className="hover:bg-accent/5">
                <td className="p-2 sticky left-0 bg-[#333333] font-medium text-accent">Egresos</td>
                {months.map(month => (
                  <td key={`expenses-${month}`} className="p-2 text-right text-rose-400">
                    {formatAmount(expenseTotals[month] || 0)}
                  </td>
                ))}
                <td className="p-2 text-right bg-accent/5 font-medium text-rose-400">
                  {formatAmount(totalExpenses)}
                </td>
              </tr>
              <tr className="hover:bg-accent/5">
                <td className="p-2 sticky left-0 bg-[#333333] font-medium text-accent">Ahorro</td>
                {months.map(month => {
                  const savings = (incomeTotals[month] || 0) - (expenseTotals[month] || 0);
                  return (
                    <td key={`savings-${month}`} className={`p-2 text-right ${
                      savings >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {formatAmount(savings)}
                    </td>
                  );
                })}
                <td className={`p-2 text-right bg-accent/5 font-medium ${
                  totalSavings >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {formatAmount(totalSavings)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderSummaryTable()}
      {renderTable('Ingresos por Categoría', categoriesByType.income, 'income', 'crédito')}
      {renderTable('Egresos por Categoría', categoriesByType.expense, 'expense', 'debito')}
    </div>
  );
}