import React from 'react';
import { Building2, CreditCard, Landmark, CircleDollarSign } from 'lucide-react';

interface BankBalanceCardProps {
  bankName: string;
  balance: number;
}

const BANK_ICONS: Record<string, {
  Icon: typeof Building2,
  label: string,
  colors: {
    bg: string,
    icon: string,
    trend: string,
    trendBg: string
  }
}> = {
  'Banco Bolivariano': {
    Icon: Landmark,
    label: 'Bolivariano',
    colors: {
      bg: 'bg-accent/10',
      icon: 'text-accent',
      trend: 'text-accent',
      trendBg: 'bg-accent/10'
    }
  },
  'Banco Guayaquil': {
    Icon: CircleDollarSign,
    label: 'Guayaquil',
    colors: {
      bg: 'bg-accent/10',
      icon: 'text-accent',
      trend: 'text-accent',
      trendBg: 'bg-accent/10'
    }
  },
  'American Express': {
    Icon: CreditCard,
    label: 'Amex',
    colors: {
      bg: 'bg-accent/10',
      icon: 'text-accent',
      trend: 'text-accent',
      trendBg: 'bg-accent/10'
    }
  },
  'Bankard Infinite': {
    Icon: CreditCard,
    label: 'Bankard',
    colors: {
      bg: 'bg-accent/10',
      icon: 'text-accent',
      trend: 'text-accent',
      trendBg: 'bg-accent/10'
    }
  }
};

export function BankBalanceCard({ bankName, balance }: BankBalanceCardProps) {
  const bankConfig = BANK_ICONS[bankName] || {
    Icon: Building2,
    label: bankName,
    colors: {
      bg: 'bg-accent/10',
      icon: 'text-accent',
      trend: 'text-accent',
      trendBg: 'bg-accent/10'
    }
  };

  const { Icon, colors, label } = bankConfig;

  return (
    <div className="bg-[#333333] rounded-2xl p-6 border border-accent/10 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-2.5 rounded-xl ${colors.bg}`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.trendBg} ${colors.trend}`}>
          +12.3% ↑
        </div>
      </div>
      
      <div className="mt-auto">
        <h3 className="text-sm font-medium text-accent/70 mb-1">Saldo {label}</h3>
        <p className="text-2xl font-bold text-accent">
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}