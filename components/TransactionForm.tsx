
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void;
}

const CATEGORIES = [
  'Food & Drink', 'Rent', 'Salary', 'Entertainment', 'Shopping', 
  'Transport', 'Utilities', 'Healthcare', 'Education', 'Investment', 'Others'
];

const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(amount),
      description,
      category,
      type,
      date
    };

    onAdd(newTransaction);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6">New Entry</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setType(TransactionType.EXPENSE)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              type === TransactionType.EXPENSE ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType(TransactionType.INCOME)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              type === TransactionType.INCOME ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Income
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Amount (₹)</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-xl font-bold text-slate-800"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this for?"
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-colors shadow-lg shadow-slate-200"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
