import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsStateOpen] = useState(false);

  return (
    <nav className="w-full bg-brand-canvas border-b-2 border-brand-dark sticky top-0 z-50 px-6 md:p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        
        {/* Core Identity Branding */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-dark flex items-center justify-center text-brand-volt font-bold text-lg rounded-sm shadow-sm">
            i
          </div>
          <span className="font-display font-bold text-xl tracking-tighter uppercase">
            iBot<span className="text-brand-mint">.</span>
          </span>
        </div>

        {/* Desktop Technical Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-tight text-gray-500">
          <a href="#infrastructure" className="hover:text-brand-dark transition-colors">Infrastructure</a>
          <a href="#pipeline" className="hover:text-brand-dark transition-colors">Data Pipeline</a>
          <a href="#pricing" className="hover:text-brand-dark transition-colors">Pricing Ledger</a>
        </div>

        {/* Desktop Non-Conventional Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-bold tracking-tight text-brand-dark hover:underline underline-offset-4">
            Terminal Access
          </button>
          <button className="px-5 py-2.5 bg-brand-dark text-white text-sm font-bold rounded-premium hover:bg-black hover:shadow-hard-volt transition-all flex items-center gap-2 group active:scale-95 duration-100">
            <span>Register Node</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Functional Trigger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsStateOpen(!isOpen)}
            className="text-brand-dark focus:outline-none p-1 border-2 border-brand-dark rounded-sm"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer Override Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full bg-brand-canvas border-b-4 border-brand-dark px-6 py-8 flex flex-col gap-6 animate-fadeIn shadow-hard">
          <a href="#infrastructure" onClick={() => setIsStateOpen(false)} className="text-lg font-bold tracking-tight text-brand-dark">Infrastructure</a>
          <a href="#pipeline" onClick={() => setIsStateOpen(false)} className="text-lg font-bold tracking-tight text-brand-dark">Data Pipeline</a>
          <a href="#pricing" onClick={() => setIsStateOpen(false)} className="text-lg font-bold tracking-tight text-brand-dark">Pricing Ledger</a>
          
          <div className="w-full h-0.5 bg-gray-200 my-2"></div>
          
          <div className="flex flex-col gap-4">
            <button className="w-full py-3 bg-white border-2 border-brand-dark font-bold text-brand-dark rounded-premium active:scale-95 transition-transform">
              Terminal Access
            </button>
            <button className="w-full py-3 bg-brand-dark text-white font-bold rounded-premium flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <span>Register Node</span>
              <ArrowUpRight className="w-4 h-4 text-brand-volt" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
