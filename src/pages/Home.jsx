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
<div className="lg:col-span-5 w-full aspect-[4/3] bg-brand-dark text-white p-6 rounded-premium shadow-hard border-2 border-brand-dark flex flex-col justify-between relative overflow-hidden group font-mono selection:bg-brand-volt selection:text-brand-dark">
  {/* Cyber Radar Grid Background lines */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#161F24_1px,transparent_1px),linear-gradient(to_bottom,#161F24_1px,transparent_1px)] bg-[size:20px_24px] opacity-40"></div>
  <div className="absolute top-0 right-0 w-40 h-48 bg-brand-mint rounded-full opacity-5 blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity duration-700"></div>

  {/* Top Control Bar Panel */}
  <div className="flex justify-between items-center relative z-10 border-b border-brand-muted pb-4">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-brand-volt animate-ping"></div>
      <span className="text-[10px] tracking-widest text-brand-volt uppercase font-bold">iBot_Core_v4.0</span>
    </div>
    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-muted border border-gray-800 rounded-sm text-[9px] tracking-wider text-brand-mint uppercase font-bold">
      <span className="w-1 h-1 rounded-full bg-brand-mint animate-pulse"></span>
      <span>Cluster: Active</span>
    </div>
  </div>

  {/* Main Live Stream Matrix Terminal */}
  <div className="flex-grow my-4 flex flex-col gap-3 justify-center relative z-10 text-[11px] leading-relaxed">
    
    {/* Log Stream Line 1 */}
    <div className="flex flex-col gap-0.5 text-gray-500">
      <div className="text-[9px] text-gray-600">TIMESTAMP: 1789927761 // INBOUND_STREAM</div>
      <div>[PACKET_RECV] FROM: <span className="text-gray-400">1203634292@g.us</span> (Premium Marketplace)</div>
    </div>

    {/* Log Stream Line 2 (The Intercepted Message Block) */}
    <div className="p-3 bg-brand-muted/50 border border-brand-muted rounded-sm text-gray-300 font-sans italic relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-mint"></div>
      "who get clean macbook m2 pro for buy inside lagos?"
    </div>

    {/* Log Stream Line 3 (The Real-Time Processing Assessment) */}
    <div className="flex flex-col gap-1 text-gray-400">
      <div className="flex items-center gap-2 text-brand-mint font-bold uppercase text-[10px] tracking-wider animate-pulse">
        <span>⚡ TARGET IDENTIFIED</span>
        <span className="text-[9px] bg-brand-mint/10 text-brand-mint px-1 rounded-sm">100% INTENT</span>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] border-t border-brand-muted/40 pt-2 mt-1">
        <div><span className="text-gray-600">KEY_MATCH :</span> <span className="text-brand-volt font-bold">"macbook m2"</span></div>
        <div><span className="text-gray-600">DB_CATALOG:</span> <span className="text-gray-300">Apple_MacBook_M2</span></div>
        <div><span className="text-gray-600">SPEED_VAL :</span> <span className="text-gray-500">0.24ms (CACHE_HIT)</span></div>
        <div><span className="text-gray-600">TENANT_ID :</span> <span className="text-gray-500">tn_user_883a</span></div>
      </div>
    </div>

  </div>

  {/* Bottom Telemetry Metrics Line */}
  <div className="flex justify-between items-center relative z-10 border-t border-brand-muted/40 pt-3 text-[9px] font-bold text-gray-500 tracking-wider">
    <div className="flex items-center gap-4">
      <div>RAM: <span className="text-gray-300">14.2MB</span></div>
      <div>ROUTING_TO: <span className="text-brand-mint font-mono">2348039XXXX</span></div>
    </div>
    <div className="text-right text-gray-600">
      SYS_OK // SECURE_ISO
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
