import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CategoryGuide } from './categories/CategoryGuide';
import { CategoryForm } from './categories/CategoryForm';
import { CategoryList } from './categories/CategoryList';
import type { Category } from '../types/transaction';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

interface FormData {
  name: string;
  color: string;
  type: 'income' | 'expense';
  parentId: string | null;
}

const initialFormData: FormData = {
  name: '',
  color: '#F5E6D3',
  type: 'expense',
  parentId: null
};

export function CategoryManager({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const mainCategories = {
    income: categories.filter(cat => !cat.parentId && cat.type === 'income'),
    expense: categories.filter(cat => !cat.parentId && cat.type === 'expense')
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('El nombre de la categoría es requerido');
      return;
    }

    if (!/^#[0-9A-F]{6}$/i.test(formData.color)) {
      toast.error('El color debe ser un código hexadecimal válido (ej: #F5E6D3)');
      return;
    }

    const categoryData: Category = {
      id: editingId || crypto.randomUUID(),
      name: formData.name.trim(),
      color: formData.color,
      type: formData.type,
      parentId: formData.parentId,
      isSubcategory: !!formData.parentId
    };

    if (editingId) {
      onUpdateCategory(categoryData);
      toast.success('Categoría actualizada exitosamente');
    } else {
      onAddCategory(categoryData);
      toast.success('Categoría creada exitosamente');
    }

    handleCancel();
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      color: category.color,
      type: category.type,
      parentId: category.parentId || null
    });
    setEditingId(category.id);
    setIsAdding(true);
  };

  const handleDelete = (categoryId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      onDeleteCategory(categoryId);
      toast.success('Categoría eliminada exitosamente');
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsAdding(false);
    setEditingId(null);
  };

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

  return (
    <div className="space-y-6">
      <CategoryGuide />

      {isAdding && (
        <CategoryForm
          formData={formData}
          mainCategories={mainCategories}
          isEditing={!!editingId}
          onSubmit={handleSubmit}
          onChange={changes => setFormData(prev => ({ ...prev, ...changes }))}
          onCancel={handleCancel}
        />
      )}

      <Card>
        <div className="p-4 border-b border-accent/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-accent">Categorías</h2>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Categoría
            </Button>
          )}
        </div>
        <CategoryList
          categories={categories}
          expandedCategories={expandedCategories}
          onToggleExpand={toggleCategory}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
}