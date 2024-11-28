import React, { useState } from 'react';
import { Building2, Tags, CircleDollarSign, ShieldCheck } from 'lucide-react';
import { InstitutionsManager } from './InstitutionsManager';
import { CategoryManager } from './CategoryManager';
import type { Institution } from '../types/institution';
import type { Category } from '../types/transaction';

interface ResourcesManagerProps {
  institutions: Institution[];
  categories: Category[];
  onAddInstitution: (institution: Institution) => void;
  onUpdateInstitution: (institution: Institution) => void;
  onDeleteInstitution: (institutionId: string) => void;
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

type ResourceTab = 'banks' | 'policies' | 'bonds' | 'categories';

const RESOURCE_TABS = [
  { id: 'banks' as ResourceTab, label: 'Bancos', icon: Building2 },
  { id: 'policies' as ResourceTab, label: 'Pólizas', icon: CircleDollarSign },
  { id: 'bonds' as ResourceTab, label: 'Fianzas', icon: ShieldCheck },
  { id: 'categories' as ResourceTab, label: 'Categorías', icon: Tags }
] as const;

export function ResourcesManager({
  institutions,
  categories,
  onAddInstitution,
  onUpdateInstitution,
  onDeleteInstitution,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}: ResourcesManagerProps) {
  const [activeTab, setActiveTab] = useState<ResourceTab>('banks');

  const filteredInstitutions = institutions.filter(inst => {
    switch (activeTab) {
      case 'banks':
        return inst.type === 'bank';
      case 'policies':
        return inst.type === 'policy';
      case 'bonds':
        return inst.type === 'bond';
      default:
        return false;
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#333333] rounded-2xl border border-accent/10">
        <div className="p-4 border-b border-accent/10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-accent">Recursos</h2>
              <nav className="flex gap-2">
                {RESOURCE_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 text-sm rounded-lg
                      ${activeTab === tab.id 
                        ? 'bg-accent/10 text-accent' 
                        : 'text-accent/70 hover:bg-accent/5'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="px-1 text-sm text-accent/70">
              Gestiona tus recursos financieros en un solo lugar. Aquí puedes:
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Crear y administrar cuentas bancarias para el seguimiento de transacciones</li>
                <li>Registrar y dar seguimiento a tus pólizas de inversión</li>
                <li>Mantener un registro de tus fianzas activas</li>
                <li>Personalizar las categorías para clasificar tus ingresos y gastos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'categories' ? (
        <CategoryManager
          categories={categories}
          onAddCategory={onAddCategory}
          onUpdateCategory={onUpdateCategory}
          onDeleteCategory={onDeleteCategory}
        />
      ) : (
        <InstitutionsManager
          institutions={filteredInstitutions}
          institutionType={activeTab}
          onAddInstitution={onAddInstitution}
          onUpdateInstitution={onUpdateInstitution}
          onDeleteInstitution={onDeleteInstitution}
        />
      )}
    </div>
  );
}