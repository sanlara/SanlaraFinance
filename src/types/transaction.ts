export interface Transaction {
  id: string;
  date: string;
  rawDate: Date;
  beneficiary: string;
  type: 'debito' | 'crédito';
  amount: number;
  balance: number;
  paymentType: string;
  bank: string;
  categoryId?: string;
  uploadId?: string;
  uploadDate?: Date;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  parentId?: string | null;
  isSubcategory: boolean;
}

export interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  transactions: Transaction[];
  bankBalances: {
    [key: string]: number;
  };
}