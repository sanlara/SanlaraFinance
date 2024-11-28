import type { Transaction, Category } from '../types/transaction';
import type { Institution } from '../types/institution';

// Categories
export const DUMMY_CATEGORIES: Category[] = [
  // Income Categories
  {
    id: 'inc-1',
    name: 'Salario',
    type: 'income',
    color: '#34D399', // Emerald-400
    isSubcategory: false
  },
  {
    id: 'inc-2',
    name: 'Inversiones',
    type: 'income',
    color: '#60A5FA', // Blue-400
    isSubcategory: false
  },
  
  // Expense Categories
  {
    id: 'exp-1',
    name: 'Comida',
    type: 'expense',
    color: '#F87171', // Red-400
    isSubcategory: false
  },
  {
    id: 'exp-2',
    name: 'Transporte',
    type: 'expense',
    color: '#FBBF24', // Amber-400
    isSubcategory: false
  },
  {
    id: 'exp-3',
    name: 'Servicios',
    type: 'expense',
    color: '#A78BFA', // Violet-400
    isSubcategory: false
  },
  {
    id: 'exp-4',
    name: 'Entretenimiento',
    type: 'expense',
    color: '#EC4899', // Pink-500
    isSubcategory: false
  },
  {
    id: 'exp-5',
    name: 'Salud',
    type: 'expense',
    color: '#14B8A6', // Teal-500
    isSubcategory: false
  },
  {
    id: 'exp-6',
    name: 'Educación',
    type: 'expense',
    color: '#8B5CF6', // Violet-500
    isSubcategory: false
  }
];

// Subcategories
export const DUMMY_SUBCATEGORIES: Category[] = [
  // Food Subcategories
  {
    id: 'exp-1-1',
    name: 'Delivery',
    type: 'expense',
    color: '#FCA5A5', // Red-300
    parentId: 'exp-1',
    isSubcategory: true
  },
  {
    id: 'exp-1-2',
    name: 'Restaurantes',
    type: 'expense',
    color: '#FEE2E2', // Red-100
    parentId: 'exp-1',
    isSubcategory: true
  },
  {
    id: 'exp-1-3',
    name: 'Supermercado',
    type: 'expense',
    color: '#EF4444', // Red-500
    parentId: 'exp-1',
    isSubcategory: true
  },
  
  // Transport Subcategories
  {
    id: 'exp-2-1',
    name: 'Taxi',
    type: 'expense',
    color: '#FCD34D', // Amber-300
    parentId: 'exp-2',
    isSubcategory: true
  },
  {
    id: 'exp-2-2',
    name: 'Gasolina',
    type: 'expense',
    color: '#FDE68A', // Amber-200
    parentId: 'exp-2',
    isSubcategory: true
  },
  
  // Services Subcategories
  {
    id: 'exp-3-1',
    name: 'Luz',
    type: 'expense',
    color: '#C4B5FD', // Violet-300
    parentId: 'exp-3',
    isSubcategory: true
  },
  {
    id: 'exp-3-2',
    name: 'Agua',
    type: 'expense',
    color: '#DDD6FE', // Violet-200
    parentId: 'exp-3',
    isSubcategory: true
  },
  {
    id: 'exp-3-3',
    name: 'Internet',
    type: 'expense',
    color: '#8B5CF6', // Violet-500
    parentId: 'exp-3',
    isSubcategory: true
  },

  // Entertainment Subcategories
  {
    id: 'exp-4-1',
    name: 'Cine',
    type: 'expense',
    color: '#F9A8D4', // Pink-300
    parentId: 'exp-4',
    isSubcategory: true
  },
  {
    id: 'exp-4-2',
    name: 'Streaming',
    type: 'expense',
    color: '#FBCFE8', // Pink-200
    parentId: 'exp-4',
    isSubcategory: true
  },

  // Health Subcategories
  {
    id: 'exp-5-1',
    name: 'Farmacia',
    type: 'expense',
    color: '#5EEAD4', // Teal-300
    parentId: 'exp-5',
    isSubcategory: true
  },
  {
    id: 'exp-5-2',
    name: 'Consultas',
    type: 'expense',
    color: '#99F6E4', // Teal-200
    parentId: 'exp-5',
    isSubcategory: true
  },

  // Education Subcategories
  {
    id: 'exp-6-1',
    name: 'Cursos',
    type: 'expense',
    color: '#A78BFA', // Violet-400
    parentId: 'exp-6',
    isSubcategory: true
  },
  {
    id: 'exp-6-2',
    name: 'Libros',
    type: 'expense',
    color: '#C4B5FD', // Violet-300
    parentId: 'exp-6',
    isSubcategory: true
  }
];

// Institutions
export const DUMMY_INSTITUTIONS: Institution[] = [
  {
    id: 'bank-1',
    name: 'Banco Bolivariano',
    type: 'bank',
    balance: 4500.00,
    color: '#2DD4BF', // Teal-400
    description: 'Cuenta principal',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'bank-2',
    name: 'Banco Guayaquil',
    type: 'bank',
    balance: 2800.00,
    color: '#F472B6', // Pink-400
    description: 'Cuenta secundaria',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'policy-1',
    name: 'Póliza Bolivariano',
    type: 'policy',
    balance: 10000.00,
    color: '#818CF8', // Indigo-400
    description: 'Inversión a 12 meses',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'bond-1',
    name: 'Fianza Vehicular',
    type: 'bond',
    balance: 5000.00,
    color: '#FB923C', // Orange-400
    description: 'Fianza para vehículo',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Helper function to create a transaction with timestamp
const createTransaction = (
  date: string,
  time: string,
  beneficiary: string,
  type: 'crédito' | 'debito',
  amount: number,
  bank: string,
  categoryId?: string,
  balance: number = 0
): Transaction => {
  const [day, month, year] = date.split('/').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const rawDate = new Date(year, month - 1, day, hours, minutes);

  return {
    id: crypto.randomUUID(),
    date,
    rawDate,
    beneficiary,
    type,
    amount,
    balance,
    paymentType: type === 'crédito' ? 'Transferencia' : 'Consumo',
    bank,
    categoryId,
    uploadDate: new Date(rawDate)
  };
};

// Generate transactions for Aug, Sep, Oct, Nov, Dec 2024
export const DUMMY_TRANSACTIONS: Transaction[] = [
  // August 2024
  createTransaction('01/08/2024', '09:00', 'Salario Agosto', 'crédito', 3500.00, 'Banco Bolivariano', 'inc-1', 3500.00),
  createTransaction('02/08/2024', '10:15', 'Dividendos', 'crédito', 500.00, 'Banco Guayaquil', 'inc-2', 2800.00),
  createTransaction('05/08/2024', '11:30', 'Supermaxi', 'debito', 220.45, 'Banco Bolivariano', 'exp-1-3', 3279.55),
  createTransaction('07/08/2024', '14:20', 'Cine', 'debito', 25.00, 'Banco Bolivariano', 'exp-4-1', 3254.55),
  createTransaction('08/08/2024', '15:45', 'Netflix', 'debito', 15.99, 'Banco Bolivariano', 'exp-4-2', 3238.56),
  createTransaction('10/08/2024', '16:30', 'Farmacia Fybeca', 'debito', 45.30, 'Banco Bolivariano', 'exp-5-1', 3193.26),
  createTransaction('12/08/2024', '17:10', 'Curso Udemy', 'debito', 12.99, 'Banco Bolivariano', 'exp-6-1', 3180.27),
  createTransaction('15/08/2024', '18:25', 'Dr. Martinez', 'debito', 60.00, 'Banco Bolivariano', 'exp-5-2', 3120.27),
  createTransaction('18/08/2024', '19:40', 'Amazon Books', 'debito', 35.50, 'Banco Bolivariano', 'exp-6-2', 3084.77),
  createTransaction('20/08/2024', '20:15', 'Netlife', 'debito', 45.00, 'Banco Bolivariano', 'exp-3-3', 3039.77),

  // September 2024
  createTransaction('01/09/2024', '09:00', 'Salario Septiembre', 'crédito', 3500.00, 'Banco Bolivariano', 'inc-1', 6539.77),
  createTransaction('02/09/2024', '10:30', 'Dividendos', 'crédito', 500.00, 'Banco Guayaquil', 'inc-2', 2800.00),
  createTransaction('04/09/2024', '11:45', 'Mi Comisariato', 'debito', 198.75, 'Banco Bolivariano', 'exp-1-3', 6341.02),
  createTransaction('06/09/2024', '13:20', 'Cinemark', 'debito', 30.00, 'Banco Bolivariano', 'exp-4-1', 6311.02),
  createTransaction('08/09/2024', '14:15', 'Disney+', 'debito', 12.99, 'Banco Bolivariano', 'exp-4-2', 6298.03),
  createTransaction('10/09/2024', '15:30', 'Farmacia Cruz Azul', 'debito', 28.50, 'Banco Bolivariano', 'exp-5-1', 6269.53),
  createTransaction('12/09/2024', '16:45', 'Platzi', 'debito', 29.99, 'Banco Bolivariano', 'exp-6-1', 6239.54),
  createTransaction('15/09/2024', '17:20', 'Consulta Dental', 'debito', 80.00, 'Banco Bolivariano', 'exp-5-2', 6159.54),
  createTransaction('18/09/2024', '18:10', 'Librería LEA', 'debito', 42.30, 'Banco Bolivariano', 'exp-6-2', 6117.24),
  createTransaction('20/09/2024', '19:30', 'Netlife', 'debito', 45.00, 'Banco Bolivariano', 'exp-3-3', 6072.24),
  
  // October 2024
  createTransaction('01/10/2024', '09:00', 'Salario Octubre', 'crédito', 3500.00, 'Banco Bolivariano', 'inc-1', 9572.24),
  createTransaction('02/10/2024', '10:15', 'Dividendos', 'crédito', 500.00, 'Banco Guayaquil', 'inc-2', 2800.00),
  createTransaction('05/10/2024', '11:30', 'Supermaxi', 'debito', 245.30, 'Banco Bolivariano', 'exp-1-3', 9326.94),
  createTransaction('08/10/2024', '13:45', 'Gasolina Primax', 'debito', 35.00, 'Banco Bolivariano', 'exp-2-2', 9291.94),
  createTransaction('10/10/2024', '14:20', 'Sweet & Coffee', 'debito', 12.50, 'Banco Bolivariano', 'exp-1-2', 9279.44),
  createTransaction('12/10/2024', '15:30', 'CNEL', 'debito', 45.80, 'Banco Bolivariano', 'exp-3-1', 9233.64),
  createTransaction('15/10/2024', '16:15', 'El Manabita', 'debito', 35.80, 'Banco Bolivariano', 'exp-1-2', 9197.84),
  createTransaction('18/10/2024', '17:40', 'Interagua', 'debito', 22.40, 'Banco Bolivariano', 'exp-3-2', 9175.44),
  createTransaction('20/10/2024', '18:25', 'Pedidos Ya', 'debito', 25.40, 'Banco Bolivariano', 'exp-1-1', 9150.04),
  createTransaction('25/10/2024', '19:10', 'Netlife', 'debito', 45.00, 'Banco Bolivariano', 'exp-3-3', 9105.04),
  
  // November 2024
  createTransaction('01/11/2024', '09:00', 'Salario Noviembre', 'crédito', 3500.00, 'Banco Bolivariano', 'inc-1', 12605.04),
  createTransaction('02/11/2024', '10:30', 'Dividendos', 'crédito', 500.00, 'Banco Guayaquil', 'inc-2', 2800.00),
  createTransaction('03/11/2024', '11:45', 'Supermaxi', 'debito', 189.75, 'Banco Bolivariano', 'exp-1-3', 12415.29),
  createTransaction('06/11/2024', '13:20', 'Gasolina Primax', 'debito', 35.00, 'Banco Bolivariano', 'exp-2-2', 12380.29),
  createTransaction('08/11/2024', '14:30', 'Juan Valdez', 'debito', 15.30, 'Banco Bolivariano', 'exp-1-2', 12364.99),
  createTransaction('10/11/2024', '15:45', 'CNEL', 'debito', 48.60, 'Banco Bolivariano', 'exp-3-1', 12316.39),
  createTransaction('12/11/2024', '16:20', 'Puerto Moro', 'debito', 42.60, 'Banco Bolivariano', 'exp-1-2', 12273.79),
  createTransaction('15/11/2024', '17:10', 'Interagua', 'debito', 24.80, 'Banco Bolivariano', 'exp-3-2', 12248.99),
  createTransaction('18/11/2024', '18:30', 'Uber Eats', 'debito', 28.90, 'Banco Bolivariano', 'exp-1-1', 12220.09),
  createTransaction('20/11/2024', '19:15', 'Netlife', 'debito', 45.00, 'Banco Bolivariano', 'exp-3-3', 12175.09),
  
  // December 2024
  createTransaction('01/12/2024', '09:00', 'Salario Diciembre', 'crédito', 3500.00, 'Banco Bolivariano', 'inc-1', 15675.09),
  createTransaction('02/12/2024', '10:15', 'Dividendos', 'crédito', 500.00, 'Banco Guayaquil', 'inc-2', 2800.00),
  createTransaction('04/12/2024', '11:30', 'Mi Comisariato', 'debito', 276.40, 'Banco Bolivariano', 'exp-1-3', 15398.69),
  createTransaction('06/12/2024', '13:45', 'Gasolina Primax', 'debito', 35.00, 'Banco Bolivariano', 'exp-2-2', 15363.69),
  createTransaction('09/12/2024', '14:20', 'Café de Casa', 'debito', 18.75, 'Banco Bolivariano', 'exp-1-2', 15344.94),
  createTransaction('11/12/2024', '15:30', 'CNEL', 'debito', 52.30, 'Banco Bolivariano', 'exp-3-1', 15292.64),
  createTransaction('14/12/2024', '16:45', 'Lo Nuestro', 'debito', 52.30, 'Banco Bolivariano', 'exp-1-2', 15240.34),
  createTransaction('16/12/2024', '17:20', 'Interagua', 'debito', 26.50, 'Banco Bolivariano', 'exp-3-2', 15213.84),
  createTransaction('19/12/2024', '18:10', 'Rappi', 'debito', 32.15, 'Banco Bolivariano', 'exp-1-1', 15181.69),
  createTransaction('21/12/2024', '19:30', 'Netlife', 'debito', 45.00, 'Banco Bolivariano', 'exp-3-3', 15136.69)
];