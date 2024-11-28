import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Institution, InstitutionType, InstitutionFormData } from '../types/institution';

interface InstitutionsManagerProps {
  institutions: Institution[];
  institutionType: 'banks' | 'policies' | 'bonds';
  onAddInstitution: (institution: Institution) => void;
  onUpdateInstitution: (institution: Institution) => void;
  onDeleteInstitution: (institutionId: string) => void;
}

const TYPE_LABELS = {
  banks: 'Banco',
  policies: 'Póliza',
  bonds: 'Fianza'
} as const;

const TYPE_MAPPING = {
  banks: 'bank',
  policies: 'policy',
  bonds: 'bond'
} as const;

const initialFormData: InstitutionFormData = {
  name: '',
  type: 'bank',
  balance: 0,
  color: '#F5E6D3',
  description: ''
};

export function InstitutionsManager({
  institutions,
  institutionType,
  onAddInstitution,
  onUpdateInstitution,
  onDeleteInstitution
}: InstitutionsManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InstitutionFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('El nombre de la institución es requerido');
      return;
    }

    const institutionData: Institution = {
      id: editingId || crypto.randomUUID(),
      ...formData,
      type: TYPE_MAPPING[institutionType],
      name: formData.name.trim(),
      balance: 0, // Balance siempre será 0 al crear/editar
      createdAt: editingId ? institutions.find(i => i.id === editingId)?.createdAt || new Date() : new Date(),
      updatedAt: new Date()
    };

    if (editingId) {
      onUpdateInstitution(institutionData);
      toast.success('Institución actualizada exitosamente');
    } else {
      onAddInstitution(institutionData);
      toast.success('Institución creada exitosamente');
    }

    setFormData(initialFormData);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (institution: Institution) => {
    setFormData({
      name: institution.name,
      type: institution.type,
      balance: 0,
      color: institution.color,
      description: institution.description
    });
    setEditingId(institution.id);
    setIsAdding(true);
  };

  const handleDelete = (institutionId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta institución?')) {
      onDeleteInstitution(institutionId);
      toast.success('Institución eliminada exitosamente');
    }
  };

  return (
    <div className="space-y-6">
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-[#333333] rounded-2xl p-6 border border-accent/10">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-accent/80 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#2A2A2A] border border-accent/20 rounded-lg py-2 px-3 text-accent placeholder-accent/40 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                placeholder={`Nombre del ${TYPE_LABELS[institutionType].toLowerCase()}`}
              />
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-accent/80 mb-1">
                Color
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="block bg-[#2A2A2A] border border-accent/20 rounded-lg h-10 w-20"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}` })}
                  className="w-32 bg-[#2A2A2A] border border-accent/20 rounded-lg py-2 px-3 text-accent placeholder-accent/40 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  placeholder="#F5E6D3"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-accent/80 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#2A2A2A] border border-accent/20 rounded-lg py-2 px-3 text-accent placeholder-accent/40 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                placeholder="Descripción opcional"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-[#2A2A2A] bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormData);
                setIsAdding(false);
                setEditingId(null);
              }}
              className="inline-flex items-center px-4 py-2 border border-accent/20 rounded-lg text-sm font-medium text-accent bg-transparent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-[#333333] rounded-2xl border border-accent/10">
        <div className="p-4 border-b border-accent/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-accent">{TYPE_LABELS[institutionType]}s</h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-[#2A2A2A] bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo {TYPE_LABELS[institutionType]}
            </button>
          )}
        </div>
        <div className="divide-y divide-accent/10">
          {institutions.length === 0 ? (
            <div className="px-4 py-6 text-center text-accent/50">
              No hay {TYPE_LABELS[institutionType].toLowerCase()}s registrados
            </div>
          ) : (
            institutions.map(institution => (
              <div
                key={institution.id}
                className="px-4 py-3 flex items-center justify-between hover:bg-accent/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: institution.color }}
                  />
                  <div>
                    <h4 className="text-accent font-medium">
                      {institution.name}
                    </h4>
                    {institution.description && (
                      <p className="text-sm text-accent/50">
                        {institution.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(institution)}
                    className="p-2 text-accent/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                    title={`Editar ${TYPE_LABELS[institutionType].toLowerCase()}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(institution.id)}
                    className="p-2 text-accent/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                    title={`Eliminar ${TYPE_LABELS[institutionType].toLowerCase()}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}