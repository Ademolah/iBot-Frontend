import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowUpRight, Zap, Target, Shield, Server } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-canvas flex flex-col justify-between">
      
      {/* 1. Global Navigation Inject */}
      <Navbar />

      {/* 2. Hero Presentation Canvas */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex-grow">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-8">
          
          {/* Heavy Content Typography Stack */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-brand-dark rounded-sm text-xs font-bold tracking-tight text-brand-dark shadow-sm">
              <Zap className="w-3.5 h-3.5 text-brand-mint fill-brand-mint" />
              <span>Multi-Tenant WhatsApp Monitoring Active</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.92] tracking-tighter text-brand-dark">
              Capture every buy request <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark via-blue-900 to-brand-mint font-display italic font-light">live inside groups.</span>
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
              A high-end tracking engine that monitors vendor marketplaces, cleans conversational text payloads, and sends validated sales matches directly to your phone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <button className="px-8 py-4 bg-brand-dark text-white rounded-premium font-bold hover:bg-black hover:shadow-hard-volt transition-all flex items-center justify-center gap-2 group active:scale-95 duration-100">
                <span>Launch Dashboard Terminal</span>
                <ArrowUpRight className="w-4 h-4 text-brand-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-brand-dark text-brand-dark rounded-premium font-bold hover:bg-gray-50 hover:shadow-hard transition-all active:scale-95 duration-100">
                Data Infrastructure
              </button>
            </div>
          </div>

          {/* Telemetry Visual Canvas */}
          <div className="lg:col-span-5 w-full aspect-[4/3] bg-brand-dark text-white p-8 rounded-premium shadow-hard border-2 border-brand-dark flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-volt rounded-full opacity-10 blur-2xl"></div>
            
            <div className="flex justify-between items-start">
              <Server className="w-8 h-8 text-brand-volt" />
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-muted border border-gray-700 rounded-sm font-mono text-[10px] tracking-wider text-brand-mint uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse"></span>
                <span>Cluster Live</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs text-gray-400">
              <div className="text-brand-volt uppercase font-bold text-[10px] tracking-widest">Active Stream Interceptor</div>
              <div className="text-gray-100 font-sans text-xl font-bold tracking-tight leading-snug">
                "who get macbook m2 for sell?" ➔ Match found: Apple MacBook Pro M2
              </div>
              <div className="text-[10px] text-gray-500">
                redis_cache: hit (0.4ms) | dispatch_target: 2348039xxxx
              </div>
            </div>
          </div>
        </section>

        {/* 3. Tactical Architecture Metrics Section */}
        <section id="infrastructure" className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 border-t-2 border-brand-dark mt-16">
          
          {/* Card Module 1 */}
          <div className="p-8 bg-white border-2 border-brand-dark rounded-premium shadow-sm hover:shadow-hard transition-all group">
            <div className="w-12 h-12 bg-brand-canvas border-2 border-brand-dark rounded-sm flex items-center justify-center mb-6 group-hover:bg-brand-volt transition-colors">
              <Target className="w-6 h-6 text-brand-dark" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2 text-brand-dark">Fuzzy Intersection</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Advanced multi-token text filtering that matches conversational text patterns and typos instantly against cached catalogs.
            </p>
          </div>

          {/* Card Module 2 */}
          <div className="p-8 bg-white border-2 border-brand-dark rounded-premium shadow-sm hover:shadow-hard transition-all group">
            <div className="w-12 h-12 bg-brand-canvas border-2 border-brand-dark rounded-sm flex items-center justify-center mb-6 group-hover:bg-brand-mint transition-colors">
              <Shield className="w-6 h-6 text-brand-dark" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2 text-brand-dark">Tenant Isolation</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Every data session runs inside encapsulated pipeline variables. Your catalog parameters are strictly protected by access encryption keys.
            </p>
          </div>

          {/* Card Module 3 */}
          <div className="p-8 bg-white border-2 border-brand-dark rounded-premium shadow-sm hover:shadow-hard transition-all group">
            <div className="w-12 h-12 bg-brand-canvas border-2 border-brand-dark rounded-sm flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Zap className="w-6 h-6 text-brand-dark group-hover:text-white" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2 text-brand-dark">RAM Cache Speeds</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Built on an integrated Redis datastore memory layer to prevent high-traffic chat loops from slowing down your workflow.
            </p>
          </div>
        </section>
      </main>

      {/* 4. Global Footer Inject */}
      <Footer />
    </div>
  );
}
