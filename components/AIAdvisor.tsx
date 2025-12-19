
import React, { useState, useEffect } from 'react';
import { Transaction, AIInsight } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AIAdvisorProps {
  transactions: Transaction[];
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ transactions }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    if (transactions.length === 0) return;
    setLoading(true);
    const data = await getFinancialAdvice(transactions);
    setInsight(data);
    setLoading(false);
  };

  useEffect(() => {
    if (transactions.length > 2 && !insight) {
      fetchAdvice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden min-h-[400px]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <i className="fas fa-sparkles text-2xl text-yellow-300"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Financial Advisor</h3>
              <p className="text-indigo-200 text-sm">Personalized insights powered by Gemini</p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-6 animate-pulse mt-10">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
            </div>
          ) : insight ? (
            <div className="space-y-10 mt-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-indigo-100">Financial Health Score</h4>
                  <span className="text-3xl font-black text-white">{insight.healthScore}/100</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-400 via-yellow-400 to-emerald-400 transition-all duration-1000"
                    style={{ width: `${insight.healthScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="font-bold text-indigo-300 uppercase text-xs tracking-widest">Spending Analysis</h4>
                  <p className="text-indigo-50 leading-relaxed text-lg italic">"{insight.summary}"</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-indigo-300 uppercase text-xs tracking-widest">Growth Recommendations</h4>
                  <ul className="space-y-4">
                    {insight.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <i className="fas fa-check text-[10px] text-white"></i>
                        </div>
                        <span className="text-indigo-100">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12 text-center py-20 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
              <i className="fas fa-chart-line text-5xl mb-6 opacity-30"></i>
              <p className="text-indigo-200 max-w-sm mx-auto">Add at least 3 transactions to unlock your first personalized AI insight.</p>
              <button 
                onClick={fetchAdvice}
                className="mt-6 px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
              >
                Refresh Analysis
              </button>
            </div>
          )}
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10"></div>
      </div>
    </div>
  );
};

export default AIAdvisor;
