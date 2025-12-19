
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: TransactionType;
}

export interface FinancialStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  categoryBreakdown: Record<string, number>;
}

export interface AIInsight {
  summary: string;
  tips: string[];
  healthScore: number;
}
