import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, X } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/styles';
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeFilterProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  variant?: 'overview' | 'transactions';
}

type DatePreset = 'lastMonth' | 'thisMonth' | 'thisYear' | 'custom' | null;

export function DateRangeFilter({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange,
  variant = 'overview'
}: DateRangeFilterProps) {
  const [activePreset, setActivePreset] = useState<DatePreset>('thisYear');
  const [showCustomDates, setShowCustomDates] = useState(false);

  // Set initial preset to 'thisYear'
  useEffect(() => {
    handlePresetChange('thisYear');
  }, []);

  const handlePresetChange = (preset: DatePreset) => {
    if (!preset) {
      setActivePreset(null);
      setShowCustomDates(false);
      onStartDateChange(new Date(0));
      onEndDateChange(new Date(8640000000000000));
      return;
    }

    const now = new Date();
    let start: Date;
    let end: Date;

    switch (preset) {
      case 'lastMonth':
        // Previous month
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'thisMonth':
        // Current month
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'thisYear':
        // Current year
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case 'custom':
        setShowCustomDates(true);
        return;
    }

    setActivePreset(preset);
    setShowCustomDates(preset === 'custom');
    onStartDateChange(start);
    onEndDateChange(end);
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('es', { month: 'long' });
  };

  if (variant === 'transactions') {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent/60" />
          <span className="text-sm font-medium text-accent/80">
            Rango de fechas
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => date && onStartDateChange(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha inicial"
              className={cn(
                "w-36 bg-[#2A2A2A] text-accent",
                "px-3 py-2 text-sm",
                "rounded-lg border border-accent/20",
                "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
                "placeholder:text-accent/40"
              )}
              wrapperClassName="date-picker"
              popperClassName="react-datepicker-left"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <Calendar className="w-4 h-4 text-accent/40" />
            </div>
          </div>

          <span className="text-accent/40">→</span>

          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => date && onEndDateChange(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha final"
              className={cn(
                "w-36 bg-[#2A2A2A] text-accent",
                "px-3 py-2 text-sm",
                "rounded-lg border border-accent/20",
                "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
                "placeholder:text-accent/40"
              )}
              wrapperClassName="date-picker"
              popperClassName="react-datepicker-right"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <Calendar className="w-4 h-4 text-accent/40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const now = new Date();
  const lastMonth = getMonthName(new Date(now.getFullYear(), now.getMonth() - 1));
  const thisMonth = getMonthName(now);
  const thisYear = now.getFullYear();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-accent/60" />
        <span className="text-sm font-medium text-accent/80">
          Período de análisis
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
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
          <Button
            size="sm"
            variant={activePreset === 'custom' ? 'primary' : 'secondary'}
            onClick={() => handlePresetChange('custom')}
          >
            Personalizado
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

        {showCustomDates && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    onStartDateChange(date);
                    setActivePreset('custom');
                  }
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha inicial"
                className={cn(
                  "w-36 bg-[#2A2A2A] text-accent",
                  "px-3 py-2 text-sm",
                  "rounded-lg border border-accent/20",
                  "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
                  "placeholder:text-accent/40"
                )}
                wrapperClassName="date-picker"
                popperClassName="react-datepicker-left"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <Calendar className="w-4 h-4 text-accent/40" />
              </div>
            </div>

            <span className="text-accent/40">→</span>

            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  if (date) {
                    onEndDateChange(date);
                    setActivePreset('custom');
                  }
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha final"
                className={cn(
                  "w-36 bg-[#2A2A2A] text-accent",
                  "px-3 py-2 text-sm",
                  "rounded-lg border border-accent/20",
                  "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
                  "placeholder:text-accent/40"
                )}
                wrapperClassName="date-picker"
                popperClassName="react-datepicker-right"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <Calendar className="w-4 h-4 text-accent/40" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}