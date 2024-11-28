import { Transaction, DashboardData } from '../types/transaction';
import { parseDate } from './dateUtils';

const PAYMENT_TYPE_MAPPINGS: Record<string, string> = {
  'TRANSF.INTRABANCARIAS': 'Transferencia',
  'TRANSFERENCIA': 'Transferencia',
  'TRANSF.INTERBANCARIAS': 'Transferencia',
  'TRANSFERENCIAS INTERBANCARIAS RECIBIDAS': 'Transferencia',
  'TRANSF. RECIB PAGDIR HD': 'Transferencia',
  'TRANSFERENCIAS RECIBIDAS (LOCALES / INTERNACIONALES)': 'Transferencia',
  'TRANSF.INTERNACIONALES': 'Transferencia Internacional',
  'N/D COMPRA POS VISA DEBIT': 'Tarjeta de Débito',
  'N/D CARGO SERV.F.GASOLI.DEBIT': 'Comisión gasolinera',
  'RETIRO CAJEROS AH-BB': 'Retiro Cajero',
  'CAJ/AUTO.RET.': 'Retiro Cajero',
  'COBROS INMEDIATOS': 'Débito Empresa',
  'DEBITO CONSUMO': 'Consumo',
  'CREDITO CONSUMO': 'Consumo',
  'DEBITO COMPRA': 'Compra',
  'CREDITO COMPRA': 'Compra',
  'RETIRO ATM': 'Retiro ATM',
  'PAGO TARJETA': 'Pago Tarjeta',
  'PAGO SERVICIOS': 'Pago Servicios'
};

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseCSV(csvContent: string, bank: string): Transaction[] {
  const lines = csvContent.split('\n').slice(1); // Skip header
  const uploadId = crypto.randomUUID();
  const uploadDate = new Date();
  let transactionTime = new Date(uploadDate);

  return lines
    .filter(line => line.trim())
    .map((line, index) => {
      const [date, beneficiary, type, amount, balance, paymentType] = line.split(',');
      const normalizedPaymentType = PAYMENT_TYPE_MAPPINGS[paymentType.trim()] || paymentType;
      
      // Set time for each transaction, incrementing by 1 second to maintain order
      transactionTime = new Date(transactionTime.getTime() + 1000);
      const rawDate = parseDate(date);
      rawDate.setHours(transactionTime.getHours());
      rawDate.setMinutes(transactionTime.getMinutes());
      rawDate.setSeconds(transactionTime.getSeconds());
      
      return {
        id: crypto.randomUUID(),
        date,
        rawDate,
        beneficiary: toTitleCase(beneficiary.trim()),
        type: type.toLowerCase() as 'debito' | 'crédito',
        amount: Math.abs(parseFloat(amount)),
        balance: parseFloat(balance),
        paymentType: normalizedPaymentType,
        bank,
        uploadId,
        uploadDate
      };
    })
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime()); // Sort by date descending
}

export function processTransactions(transactions: Transaction[]): DashboardData {
  const monthlyIncome = transactions
    .filter(t => t.type === 'crédito')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'debito')
    .reduce((sum, t) => sum + t.amount, 0);

  const bankBalances: Record<string, number> = {};
  transactions.forEach(t => {
    if (!bankBalances[t.bank] || t.rawDate > transactions.find(tr => tr.bank === t.bank)?.rawDate!) {
      bankBalances[t.bank] = t.balance;
    }
  });

  return {
    totalBalance: Object.values(bankBalances).reduce((sum, balance) => sum + balance, 0),
    monthlyIncome,
    monthlyExpenses,
    transactions: transactions.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime()),
    bankBalances: {
      'Banco Bolivariano': bankBalances['Banco Bolivariano'] || 0,
      'Banco Guayaquil': bankBalances['Banco Guayaquil'] || 0
    }
  };
}