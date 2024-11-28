import React from 'react';
import { Check, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Category } from '../../types/transaction';

interface CategoryFormData {
  name: string;
  color: string;
  type: 'income' | 'expense';
  parentId: string | null;
}

interface CategoryFormProps {
  formData: CategoryFormData;
  mainCategories: {
    income: Category[];
    expense: Category[];
  };
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<CategoryFormData>) => void;
  onCancel: () => void;
}

export function CategoryForm({
  formData,
  mainCategories,
  isEditing,
  onSubmit,
  onChange,
  onCancel
}: CategoryFormProps) {
  return (
    <Card>
      <form onSubmit={onSubmit} className="p-6">
        <div className="space-y-4">
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Nombre de la categoría"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-accent/80 mb-1">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => onChange({ type: e.target.value as 'income' | 'expense' })}
                className="w-full bg-[#2A2A2A] border border-accent/20 rounded-lg py-2 px-3 text-accent placeholder-accent/40 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              >
                <option value="income">Ingreso</option>
                <option value="expense">Egreso</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-accent/80 mb-1">
                Categoría Principal
              </label>
              <select
                value={formData.parentId || ''}
                onChange={(e) => onChange({ parentId: e.target.value || null })}
                className="w-full bg-[#2A2A2A] border border-accent/20 rounded-lg py-2 px-3 text-accent placeholder-accent/40 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
              >
                <option value="">Ninguna (Categoría Principal)</option>
                {mainCategories[formData.type].map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-accent/80 mb-1">
              Color
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => onChange({ color: e.target.value })}
                className="block bg-[#2A2A2A] border border-accent/20 rounded-lg h-10 w-20"
              />
              <Input
                value={formData.color}
                onChange={(e) => onChange({ color: e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}` })}
                placeholder="#F5E6D3"
                pattern="^#[0-9A-Fa-f]{6}$"
                className="w-32"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button type="submit">
            <Check className="w-4 h-4 mr-2" />
            {isEditing ? 'Actualizar' : 'Crear'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}