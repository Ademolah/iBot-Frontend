import { Sparkles, Terminal, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-brand-dark text-white border-t-4 border-brand-mint mt-24 px-6 md:p-16 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-brand-muted pb-12">
        
        {/* Core Column Definition */}
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-volt flex items-center justify-center text-brand-dark font-black text-base rounded-sm">
              i
            </div>
            <span className="font-display font-bold text-lg tracking-tighter uppercase text-white">iBot Systems</span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-medium">
            High-performance intent matching pipelines scanning continuous network payloads. Built with absolute cryptographic multi-tenant data isolation.
          </p>
        </div>

        {/* Secondary Navigation System Links */}
        <div className="md:col-span-3 col-span-6 flex flex-col gap-3 text-sm">
          <div className="font-mono text-xs uppercase text-brand-volt tracking-widest mb-1">System Core</div>
          <a href="#api" className="text-gray-300 hover:text-brand-mint transition-colors">API Documentation</a>
          <a href="#security" className="text-gray-300 hover:text-brand-mint transition-colors">Security Manifest</a>
          <a href="#status" className="text-gray-300 hover:text-brand-mint transition-colors flex items-center gap-2">
            <span>Cluster Status</span>
            <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
          </a>
        </div>

        {/* Technical Ledger Information Column */}
        <div className="md:col-span-4 col-span-6 flex flex-col gap-3 text-sm font-mono text-gray-400">
          <div className="font-mono text-xs uppercase text-brand-mint tracking-widest mb-1">Corporate Ledger</div>
          <div className="flex items-center gap-2 text-xs">
            <Terminal className="w-3.5 h-3.5 text-brand-volt" />
            <span>Process ID: node_cluster_v24</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-mint" />
            <span>Encrypted Environment State Validated</span>
          </div>
        </div>
      </div>

      {/* Bottom Technical Credit Line */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <div>© 2026 iBot Systems Corporate International. All rights reserved.</div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Sparkles className="w-3 h-3 text-brand-volt" />
          <span>Engineered for Ultimate Execution Speed</span>
        </div>
      </div>
    </footer>
  );
}
