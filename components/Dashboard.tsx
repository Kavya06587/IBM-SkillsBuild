
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DashboardProps {
  transactions: Transaction[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Prepare chart data
  const categoryDataMap = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(categoryDataMap).map(([name, value]) => ({ name, value }));

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Balance" amount={balance} color="indigo" icon="fa-wallet" />
        <StatCard label="Total Income" amount={totalIncome} color="emerald" icon="fa-arrow-trend-up" />
        <StatCard label="Total Expenses" amount={totalExpenses} color="rose" icon="fa-arrow-trend-down" />
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Spending by Category</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 italic">
              Add some expenses to see a breakdown.
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-4 overflow-y-auto h-72 pr-2 custom-scrollbar">
            {transactions.length > 0 ? (
              transactions.slice(0, 6).map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      t.type === TransactionType.INCOME ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      <i className={`fas ${t.type === TransactionType.INCOME ? 'fa-plus' : 'fa-minus'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{t.description}</p>
                      <p className="text-xs text-slate-500">{t.category} • {t.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${
                    t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-slate-800'
                  }`}>
                    {t.type === TransactionType.INCOME ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400">No transactions yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, amount, color, icon }: { label: string, amount: number, color: 'indigo' | 'emerald' | 'rose', icon: string }) => {
  const colors = {
    indigo: 'bg-indigo-600 shadow-indigo-100',
    emerald: 'bg-emerald-600 shadow-emerald-100',
    rose: 'bg-rose-600 shadow-rose-100'
  };

  return (
    <div className={`p-6 rounded-3xl text-white shadow-xl ${colors[color]} relative overflow-hidden`}>
      <div className="relative z-10">
        <p className="text-indigo-100 text-sm font-medium mb-1 opacity-80">{label}</p>
        <h3 className="text-3xl font-bold">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
      </div>
      <i className={`fas ${icon} absolute bottom-[-10px] right-[-10px] text-7xl opacity-10 rotate-12`}></i>
    </div>
  );
};

export default Dashboard;
