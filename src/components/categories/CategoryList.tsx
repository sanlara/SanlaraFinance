import React from 'react';
import { ChevronDown, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Category } from '../../types/transaction';

interface CategoryListProps {
  categories: Category[];
  expandedCategories: Set<string>;
  onToggleExpand: (categoryId: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

function CategoryTag({ label, variant }: { label: string; variant: 'income' | 'expense' | 'main' | 'sub' }) {
  const baseClasses = "px-2 py-0.5 rounded-full text-xs font-medium";
  const variantClasses = {
    income: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    expense: "bg-rose-50 text-rose-700 border border-rose-200",
    main: "bg-accent/10 text-accent border border-accent/20",
    sub: "bg-accent/5 text-accent/80 border border-accent/10"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}

function CategoryItem({ 
  category,
  categories,
  expandedCategories,
  onToggleExpand,
  onEdit,
  onDelete
}: CategoryListProps & { category: Category }) {
  const subcategories = categories.filter(cat => cat.parentId === category.id);
  const isExpanded = expandedCategories.has(category.id);

  return (
    <div className="border-b border-accent/10 last:border-b-0">
      <div className="flex items-center justify-between p-4 hover:bg-accent/5 transition-colors">
        <div className="flex items-center gap-3">
          {subcategories.length > 0 && (
            <button
              onClick={() => onToggleExpand(category.id)}
              className="p-1 hover:bg-accent/10 rounded-md transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-accent/70" />
              ) : (
                <ChevronRight className="w-4 h-4 text-accent/70" />
              )}
            </button>
          )}
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-accent font-medium">{category.name}</h3>
              <div className="flex gap-1.5">
                <CategoryTag 
                  label={category.type === 'income' ? 'Ingreso' : 'Egreso'} 
                  variant={category.type}
                />
                <CategoryTag 
                  label={category.isSubcategory ? 'Secundaria' : 'Principal'} 
                  variant={category.isSubcategory ? 'sub' : 'main'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-accent/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-accent/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {isExpanded && subcategories.length > 0 && (
        <div className="ml-8 border-l border-accent/10">
          {subcategories.map(subcat => (
            <CategoryItem
              key={subcat.id}
              category={subcat}
              categories={categories}
              expandedCategories={expandedCategories}
              onToggleExpand={onToggleExpand}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CategoryList({
  categories,
  expandedCategories,
  onToggleExpand,
  onEdit,
  onDelete
}: CategoryListProps) {
  const mainCategories = {
    income: categories.filter(cat => !cat.parentId && cat.type === 'income'),
    expense: categories.filter(cat => !cat.parentId && cat.type === 'expense')
  };

  const CategorySection = ({ title, items }: { title: string; items: Category[] }) => {
    if (items.length === 0) return null;
    
    return (
      <div>
        <div className="px-4 py-3 bg-accent/5">
          <h3 className="text-sm font-medium text-accent/80">{title}</h3>
        </div>
        {items.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            categories={categories}
            expandedCategories={expandedCategories}
            onToggleExpand={onToggleExpand}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <div className="divide-y divide-accent/10">
        <CategorySection title="Categorías de Ingresos" items={mainCategories.income} />
        <CategorySection title="Categorías de Egresos" items={mainCategories.expense} />
        {categories.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-accent/60">No hay categorías creadas</p>
          </div>
        )}
      </div>
    </Card>
  );
}