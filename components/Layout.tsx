
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <i className="fas fa-leaf text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-slate-800">ZenFinance</h1>
        </div>

        <div className="space-y-2">
          <NavItem 
            icon="fa-chart-pie" 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon="fa-list-ul" 
            label="Transactions" 
            active={activeTab === 'transactions'} 
            onClick={() => setActiveTab('transactions')} 
          />
          <NavItem 
            icon="fa-robot" 
            label="AI Insights" 
            active={activeTab === 'ai'} 
            onClick={() => setActiveTab('ai')} 
          />
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="p-4 bg-indigo-50 rounded-xl">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Pro Tip</p>
            <p className="text-sm text-slate-600">Sync your bank account for real-time tracking.</p>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-4 z-50">
        <MobileNavItem icon="fa-chart-pie" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <MobileNavItem icon="fa-list-ul" active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
        <MobileNavItem icon="fa-robot" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 mb-20 md:mb-0">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
            <p className="text-slate-500">Welcome back to your financial calm.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'
    }`}
  >
    <i className={`fas ${icon} ${active ? 'text-white' : 'text-slate-400'}`}></i>
    <span className="font-medium">{label}</span>
  </button>
);

const MobileNavItem = ({ icon, active, onClick }: { icon: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`p-2 ${active ? 'text-indigo-600' : 'text-slate-400'}`}>
    <i className={`fas ${icon} text-xl`}></i>
  </button>
);

export default Layout;
