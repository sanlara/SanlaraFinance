import React, { useEffect } from 'react';
import { DateRangeFilter } from '../DateRangeFilter';

interface WelcomeHeaderProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

export function WelcomeHeader({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange 
}: WelcomeHeaderProps) {
  // Set initial date range to current year
  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31);
    
    onStartDateChange(startOfYear);
    onEndDateChange(endOfYear);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-medium text-accent mb-1">Hey Ricardo, Welcome back! 👋</h2>
        <p className="text-sm text-accent/70">Here's what's happening with your finances today.</p>
      </div>
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        variant="overview"
      />
    </div>
  );
}