import { LayoutDashboard, WalletCards, Receipt, CircleDollarSign } from 'lucide-react';

export const TABS = [
  { id: 'overview', label: 'Vista General', icon: LayoutDashboard },
  { id: 'balances', label: 'Balances', icon: WalletCards },
  { id: 'transactions', label: 'Transacciones', icon: Receipt },
  { id: 'resources', label: 'Recursos', icon: CircleDollarSign }
] as const;

export type TabType = typeof TABS[number]['id'];