import { useState } from 'react';
import { Menu, X, ArrowUpRight, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // 🌟 Import Auth Context hooks

export default function Navbar() {
  const [isOpen, setIsStateOpen] = useState(false);
  const { tenant, logout, setIsAuthModalOpen } = useAuth(); // 🌟 Extract Auth States

  return (
    <nav className="w-full bg-brand-canvas border-b-2 border-brand-dark sticky top-0 z-50 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-dark flex items-center justify-center text-brand-volt font-bold text-lg rounded-sm shadow-sm">i</div>
          <span className="font-display font-bold text-xl tracking-tighter uppercase">iBot<span className="text-brand-mint">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-tight text-gray-500">
          <a href="#infrastructure" className="hover:text-brand-dark transition-colors">Infrastructure</a>
          <a href="#pipeline" className="hover:text-brand-dark transition-colors">Data Pipeline</a>
        </div>

        {/* 🚀 DYNAMIC AUTHENTICATION ACTION BAR COUPLING */}
        <div className="hidden md:flex items-center gap-6">
          {tenant ? (
            <>
              <span className="text-xs font-mono font-bold text-brand-mint bg-brand-dark px-2.5 py-1 rounded-sm uppercase tracking-wide">
                ● {tenant.email.split('@')[0]}
              </span>
              <button className="text-sm font-bold tracking-tight text-brand-dark hover:underline flex items-center gap-1">
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button onClick={logout} className="text-sm font-bold tracking-tight text-red-600 hover:underline">
                Disconnect Node
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsAuthModalOpen(true)} 
                className="text-sm font-bold tracking-tight text-brand-dark hover:underline underline-offset-4"
              >
                Terminal Access
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2.5 bg-brand-dark text-white text-sm font-bold rounded-premium hover:bg-black hover:shadow-hard-volt transition-all flex items-center gap-2 group active:scale-95 duration-100"
              >
                <span>Register Business</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsStateOpen(!isOpen)} className="text-brand-dark focus:outline-none p-1 border-2 border-brand-dark rounded-sm">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Code Interface */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full bg-brand-canvas border-b-4 border-brand-dark px-6 py-8 flex flex-col gap-6 shadow-hard">
          <div className="flex flex-col gap-4">
            {tenant ? (
              <>
                <div className="text-xs font-mono text-gray-500">OPERATOR: {tenant.email}</div>
                <button className="w-full py-3 bg-brand-dark text-white font-bold rounded-premium">Dashboard</button>
                <button onClick={() => { logout(); setIsStateOpen(false); }} className="w-full py-3 bg-red-50 text-red-600 font-bold border-2 border-red-600 rounded-premium">Disconnect Node</button>
              </>
            ) : (
              <>
                <button onClick={() => { setIsAuthModalOpen(true); setIsStateOpen(false); }} className="w-full py-3 bg-white border-2 border-brand-dark font-bold text-brand-dark rounded-premium">Terminal Access</button>
                <button onClick={() => { setIsAuthModalOpen(true); setIsStateOpen(false); }} className="w-full py-3 bg-brand-dark text-white font-bold rounded-premium flex items-center justify-center gap-2">
                  <span>Register Business</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-volt" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
