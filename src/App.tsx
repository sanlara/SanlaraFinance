import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { PageContainer } from './components/layout/PageContainer';
import { TransactionsTable } from './components/TransactionsTable';
import { ResourcesManager } from './components/ResourcesManager';
import { BalanceSummary } from './components/BalanceSummary';
import { FinancialSummaryTable } from './components/FinancialSummaryTable';
import { OverviewDashboard } from './components/OverviewDashboard';
import { WelcomeHeader } from './components/overview/WelcomeHeader';
import { TabType } from './constants/tabs';
import type { DashboardData, Transaction, Category } from './types/transaction';
import type { Institution } from './types/institution';
import { parseCSV, processTransactions } from './utils/csvParser';
import { initialDashboardData } from './constants/initialData';
import { DUMMY_CATEGORIES, DUMMY_SUBCATEGORIES, DUMMY_INSTITUTIONS, DUMMY_TRANSACTIONS } from './constants/dummyData';
import { isWithinRange, parseDate } from './utils/dateUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData);
  const [overviewStartDate, setOverviewStartDate] = useState<Date>(new Date());
  const [overviewEndDate, setOverviewEndDate] = useState<Date>(new Date());
  const [categories, setCategories] = useState<Category[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [cuadreFormula, setCuadreFormula] = useState('=Saldo inicial - (Balance total - ahorro total)');
  const [useDummyData, setUseDummyData] = useState(false);

  // Load dummy data when toggle is enabled
  useEffect(() => {
    if (useDummyData) {
      const processedData = processTransactions(DUMMY_TRANSACTIONS);
      setDashboardData(processedData);
      setCategories([...DUMMY_CATEGORIES, ...DUMMY_SUBCATEGORIES]);
      setInstitutions(DUMMY_INSTITUTIONS);
      
      // Set date range to cover all dummy transactions
      const dates = DUMMY_TRANSACTIONS.map(t => t.rawDate);
      setOverviewStartDate(new Date(Math.min(...dates.map(d => d.getTime()))));
      setOverviewEndDate(new Date(Math.max(...dates.map(d => d.getTime()))));
    } else {
      setDashboardData(initialDashboardData);
      setCategories([]);
      setInstitutions([]);
    }
  }, [useDummyData]);

  const handleCSVData = (csvContent: string, bank: string) => {
    const transactions = parseCSV(csvContent, bank);
    const processedData = processTransactions(transactions);

    // Get the latest transaction for each bank to determine current balance
    const latestTransactions = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.bank] || transaction.rawDate > acc[transaction.bank].rawDate) {
        acc[transaction.bank] = transaction;
      }
      return acc;
    }, {} as Record<string, Transaction>);

    // Update institution balances
    const updatedInstitutions = institutions.map(inst => {
      if (inst.name === bank) {
        return {
          ...inst,
          balance: latestTransactions[bank]?.balance || 0,
          updatedAt: new Date()
        };
      }
      return inst;
    });

    setInstitutions(updatedInstitutions);
    
    setDashboardData(prev => ({
      ...processedData,
      bankBalances: {
        ...prev.bankBalances,
        [bank]: latestTransactions[bank]?.balance || 0
      }
    }));
    
    if (transactions.length > 0) {
      const dates = transactions.map(t => t.rawDate);
      const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
      
      setOverviewStartDate(minDate);
      setOverviewEndDate(maxDate);
    }
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    // If date was updated, update rawDate as well
    if (updatedTransaction.date) {
      updatedTransaction.rawDate = parseDate(updatedTransaction.date);
    }

    setDashboardData(prev => ({
      ...prev,
      transactions: prev.transactions
        .map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
        .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
    }));
  };

  const handleDuplicateTransaction = (transaction: Transaction) => {
    const duplicatedTransaction = {
      ...transaction,
      id: crypto.randomUUID()
    };
    
    setDashboardData(prev => {
      const index = prev.transactions.findIndex(t => t.id === transaction.id);
      const newTransactions = [...prev.transactions];
      newTransactions.splice(index + 1, 0, duplicatedTransaction);
      return {
        ...prev,
        transactions: newTransactions
      };
    });
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setDashboardData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== transactionId)
    }));
  };

  const handleAddCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const handleUpdateCategory = (category: Category) => {
    setCategories(prev => prev.map(c => c.id === category.id ? category : c));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  const handleAddInstitution = (institution: Institution) => {
    setInstitutions(prev => [...prev, institution]);
  };

  const handleUpdateInstitution = (institution: Institution) => {
    setInstitutions(prev => prev.map(i => i.id === institution.id ? institution : i));
  };

  const handleDeleteInstitution = (institutionId: string) => {
    setInstitutions(prev => prev.filter(i => i.id !== institutionId));
  };

  const handleUpdateInstitutionBalance = (institutionId: string, balance: number) => {
    setInstitutions(prev => prev.map(i => 
      i.id === institutionId 
        ? { ...i, balance, updatedAt: new Date() }
        : i
    ));
  };

  const getFilteredTransactions = (startDate: Date, endDate: Date) => {
    return dashboardData.transactions.filter(transaction => 
      isWithinRange(transaction.rawDate, startDate, endDate)
    );
  };

  const overviewTransactions = getFilteredTransactions(overviewStartDate, overviewEndDate);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        useDummyData={useDummyData}
        onToggleDummyData={() => setUseDummyData(!useDummyData)}
      />

      <PageContainer>
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            <WelcomeHeader
              startDate={overviewStartDate}
              endDate={overviewEndDate}
              onStartDateChange={setOverviewStartDate}
              onEndDateChange={setOverviewEndDate}
            />

            <OverviewDashboard 
              transactions={overviewTransactions}
              categories={categories}
            />

            <FinancialSummaryTable 
              transactions={overviewTransactions}
              categories={categories}
            />
          </div>
        ) : activeTab === 'balances' ? (
          <BalanceSummary 
            institutions={institutions}
            onUpdateInstitutionBalance={handleUpdateInstitutionBalance}
            totalSavings={dashboardData.monthlyIncome - dashboardData.monthlyExpenses}
            cuadreFormula={cuadreFormula}
            onUpdateCuadreFormula={setCuadreFormula}
          />
        ) : activeTab === 'transactions' ? (
          <TransactionsTable 
            transactions={dashboardData.transactions}
            categories={categories}
            institutions={institutions}
            onUpdateTransaction={handleUpdateTransaction}
            onDuplicateTransaction={handleDuplicateTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onDataProcessed={handleCSVData}
          />
        ) : (
          <ResourcesManager
            institutions={institutions}
            categories={categories}
            onAddInstitution={handleAddInstitution}
            onUpdateInstitution={handleUpdateInstitution}
            onDeleteInstitution={handleDeleteInstitution}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </PageContainer>

      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#333333',
          color: '#F5E6D3',
          borderRadius: '1rem',
          border: '1px solid rgba(245, 230, 211, 0.1)',
        },
      }} />
    </div>
  );
}