import React, { useState } from 'react';
import { Settings, Check, X, Edit2, ChevronDown } from 'lucide-react';
import type { Institution } from '../types/institution';

interface BalanceSummaryProps {
  institutions: Institution[];
  onUpdateInstitutionBalance: (institutionId: string, balance: number) => void;
  totalSavings?: number;
  cuadreFormula?: string;
  onUpdateCuadreFormula?: (formula: string) => void;
}

interface BalanceItem {
  id: string;
  label: string;
  amount: number;
  isEditable?: boolean;
  isBold?: boolean;
  isTotal?: boolean;
  institutionId?: string;
}

interface Section {
  title: string;
  items: BalanceItem[];
  total: number;
}

export function BalanceSummary({ 
  institutions,
  onUpdateInstitutionBalance,
  totalSavings = 0,
  cuadreFormula = '=Saldo inicial - (Balance total - ahorro total)',
  onUpdateCuadreFormula
}: BalanceSummaryProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editingFormula, setEditingFormula] = useState(false);
  const [formulaValue, setFormulaValue] = useState(cuadreFormula);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [saldoInicial, setSaldoInicial] = useState(0);

  const handleStartEdit = (id: string, amount: number) => {
    setEditingField(id);
    setEditValue(amount.toString());
  };

  const handleSaveEdit = () => {
    if (!editingField) return;

    const newAmount = parseFloat(editValue);
    if (isNaN(newAmount)) return;

    if (editingField === 'saldoInicial') {
      setSaldoInicial(newAmount);
    } else {
      const institution = institutions.find(i => i.id === editingField);
      if (institution) {
        onUpdateInstitutionBalance(institution.id, newAmount);
      }
    }

    setEditingField(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleSaveFormula = () => {
    if (onUpdateCuadreFormula) {
      onUpdateCuadreFormula(formulaValue);
    }
    setEditingFormula(false);
  };

  const handleCancelFormula = () => {
    setFormulaValue(cuadreFormula);
    setEditingFormula(false);
  };

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  // Group institutions by type
  const bankInstitutions = institutions.filter(i => i.type === 'bank');
  const policyInstitutions = institutions.filter(i => i.type === 'policy');
  const bondInstitutions = institutions.filter(i => i.type === 'bond');

  // Calculate totals
  const bankTotal = bankInstitutions.reduce((sum, i) => sum + i.balance, 0);
  const policyTotal = policyInstitutions.reduce((sum, i) => sum + i.balance, 0);
  const bondTotal = bondInstitutions.reduce((sum, i) => sum + i.balance, 0);
  const balanceTotal = bankTotal + policyTotal + bondTotal;

  // Calculate cuadre
  const cuadre = saldoInicial - (balanceTotal - totalSavings);

  // Only create sections that have institutions
  const sections: Section[] = [
    {
      title: 'Saldo Inicial',
      total: saldoInicial,
      items: [
        { id: 'saldoInicial', label: 'Saldo Inicial', amount: saldoInicial, isEditable: true }
      ]
    }
  ];

  if (bankInstitutions.length > 0) {
    sections.push({
      title: 'Bancos',
      total: bankTotal,
      items: bankInstitutions.map(inst => ({
        id: inst.id,
        label: inst.name,
        amount: inst.balance,
        isEditable: true,
        institutionId: inst.id
      }))
    });
  }

  if (policyInstitutions.length > 0) {
    sections.push({
      title: 'Pólizas',
      total: policyTotal,
      items: policyInstitutions.map(inst => ({
        id: inst.id,
        label: inst.name,
        amount: inst.balance,
        isEditable: true,
        institutionId: inst.id
      }))
    });
  }

  if (bondInstitutions.length > 0) {
    sections.push({
      title: 'Fianzas',
      total: bondTotal,
      items: bondInstitutions.map(inst => ({
        id: inst.id,
        label: inst.name,
        amount: inst.balance,
        isEditable: true,
        institutionId: inst.id
      }))
    });
  }

  sections.push({
    title: 'Cuadre',
    total: cuadre,
    items: [
      { id: 'cuadre', label: 'Cuadre', amount: cuadre }
    ]
  });

  return (
    <div className="bg-[#333333] rounded-2xl border border-accent/10">
      <div className="p-4 border-b border-accent/10">
        <h2 className="text-xl font-semibold text-accent">Resumen de Balances</h2>
      </div>
      <div className="divide-y divide-accent/10">
        {sections.map((section, index) => (
          <div key={section.title} className={index === sections.length - 1 ? '' : 'border-b border-accent/20'}>
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full px-4 py-2 bg-accent/5 flex items-center justify-between hover:bg-accent/10 transition-colors"
            >
              <h3 className="text-sm font-medium text-accent/80">{section.title}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-accent/70 text-sm">$</span>
                  <span className="text-accent font-medium w-32 text-right text-sm">{section.total.toFixed(2)}</span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-accent/50 transition-transform ${
                    !collapsedSections.has(section.title) ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            {!collapsedSections.has(section.title) && section.items.length > 0 && (
              <table className="w-full text-sm">
                <tbody className="divide-y divide-accent/10">
                  {section.items.map((item) => (
                    <tr 
                      key={item.id}
                      className={`
                        group hover:bg-accent/5
                        ${item.isTotal ? 'border-t-2 border-t-accent/20' : ''}
                      `}
                    >
                      <td className={`py-2 px-4 ${item.isBold ? 'font-semibold' : ''} text-accent text-sm`}>
                        <div className="flex items-center gap-2">
                          {item.label}
                          {item.id === 'cuadre' && (
                            <button
                              onClick={() => setEditingFormula(true)}
                              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-accent/10 rounded-md transition-all duration-200"
                              title="Editar fórmula de cuadre"
                            >
                              <Settings className="w-4 h-4 text-accent/50 hover:text-accent" />
                            </button>
                          )}
                        </div>
                        {item.id === 'cuadre' && editingFormula && (
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="text"
                              value={formulaValue}
                              onChange={(e) => setFormulaValue(e.target.value)}
                              className="w-full bg-[#2A2A2A] text-accent px-2 py-1 rounded border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm"
                              placeholder="Fórmula de cuadre"
                            />
                            <button
                              onClick={handleSaveFormula}
                              className="p-1 hover:bg-accent/10 rounded-md text-accent"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelFormula}
                              className="p-1 hover:bg-accent/10 rounded-md text-accent/70"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {editingField === item.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-accent/70 text-sm">$</span>
                              <input
                                type="number"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-32 bg-[#2A2A2A] text-accent px-2 py-1 rounded border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-right text-sm"
                                autoFocus
                              />
                              <button
                                onClick={handleSaveEdit}
                                className="p-1 hover:bg-accent/10 rounded-md text-accent"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 hover:bg-accent/10 rounded-md text-accent/70"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <span className="text-accent/70 text-sm">$</span>
                                <span className={`w-32 text-right ${item.isBold ? 'font-semibold' : ''} text-accent text-sm`}>
                                  {item.amount.toFixed(2)}
                                </span>
                              </div>
                              {item.isEditable && (
                                <button
                                  onClick={() => handleStartEdit(item.id, item.amount)}
                                  className="p-1 opacity-0 group-hover:opacity-100 hover:bg-accent/10 rounded-md transition-all duration-200"
                                >
                                  <Edit2 className="w-4 h-4 text-accent/50 hover:text-accent" />
                                </button>
                              )}
                              {!item.isEditable && <div className="w-[26px]" />}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}