
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import AIAdvisor from './components/AIAdvisor';
import { Transaction, TransactionType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('zenfinance_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('zenfinance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Transaction) => {
    setTransactions(prev => [t, ...prev]);
    setActiveTab('dashboard');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard transactions={transactions} />
      )}

      {activeTab === 'transactions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <TransactionForm onAdd={addTransaction} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[600px]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800">History</h3>
                <span className="text-sm text-slate-400">{transactions.length} entries total</span>
              </div>
              
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-slate-100 transition-all group">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                          t.type === TransactionType.INCOME ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <i className={`fas ${t.type === TransactionType.INCOME ? 'fa-arrow-down' : 'fa-arrow-up'} text-lg`}></i>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg">{t.description}</p>
                          <p className="text-sm text-slate-500 font-medium">{t.category} • {new Date(t.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className={`text-xl font-black ${
                          t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-slate-800'
                        }`}>
                          {t.type === TransactionType.INCOME ? '+' : '-'}₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </p>
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <i className="fas fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                    <i className="fas fa-folder-open text-6xl mb-4 opacity-20"></i>
                    <p className="font-medium">No transactions found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <AIAdvisor transactions={transactions} />
      )}
    </Layout>
  );
};

export default App;
