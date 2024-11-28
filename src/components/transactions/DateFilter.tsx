import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { startOfMonth, endOfMonth } from '../../utils/dateUtils';

interface DateFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

type DatePreset = 'lastMonth' | 'thisMonth' | 'thisYear' | 'custom' | null;

export function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: DateFilterProps) {
  const [activePreset, setActivePreset] = useState<DatePreset>(null);

  const handlePresetChange = (preset: DatePreset) => {
    if (!preset) {
      setActivePreset(null);
      onStartDateChange(null);
      onEndDateChange(null);
      return;
    }

    const now = new Date();
    let start: Date;
    let end: Date;

    switch (preset) {
      case 'lastMonth':
        start = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));
        end = endOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));
        break;
      case 'thisMonth':
        start = startOfMonth(now);
        end = endOfMonth(now);
        break;
      case 'thisYear':
        start = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
        end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        break;
      default:
        return;
    }

    setActivePreset(preset);
    onStartDateChange(start);
    onEndDateChange(end);
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('es', { month: 'long' });
  };

  const now = new Date();
  const lastMonth = getMonthName(new Date(now.getFullYear(), now.getMonth() - 1));
  const thisMonth = getMonthName(now);
  const thisYear = now.getFullYear();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-accent/60" />
        <span className="text-sm font-medium text-accent/80">
          Período
        </span>
      </div>

      <div className="flex items-center gap-2 bg-[#2A2A2A] rounded-lg p-1">
        <Button
          size="sm"
          variant={activePreset === 'lastMonth' ? 'primary' : 'secondary'}
          onClick={() => handlePresetChange('lastMonth')}
        >
          Mes anterior: {lastMonth}
        </Button>
        <Button
          size="sm"
          variant={activePreset === 'thisMonth' ? 'primary' : 'secondary'}
          onClick={() => handlePresetChange('thisMonth')}
        >
          Este mes: {thisMonth}
        </Button>
        <Button
          size="sm"
          variant={activePreset === 'thisYear' ? 'primary' : 'secondary'}
          onClick={() => handlePresetChange('thisYear')}
        >
          Este año: {thisYear}
        </Button>
        {activePreset && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handlePresetChange(null)}
            title="Limpiar filtro"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}