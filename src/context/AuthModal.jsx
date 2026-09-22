import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/base';
import { X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigation } from './NavigationContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Field State Parameters
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertPhoneNumber, setAlertPhoneNumber] = useState('');

  const { setCurrentScreen } = useNavigation();

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const endpoint = isLoginView ? '/auth/login' : '/auth/register'; // Fixed forward mapping targets
    const payload = isLoginView 
      ? { email, password } 
      : { email, password, alertPhoneNumber };

    try {
      const result = await apiClient(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (result.status === 'success') {
        login(result.data.token, result.data.tenant);
        setCurrentScreen('dashboard'); // 🚀 REDIRECTS USER INSTANTLY ON AUTH SUCCESS!
        }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-brand-dark/40 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop close layer */}
      <div className="absolute inset-0" onClick={() => setIsAuthModalOpen(false)} />

      {/* The Brutalist Account Access Sheet Panel */}
      <div className="relative w-full max-w-lg bg-brand-canvas border-l-4 border-brand-dark h-full p-8 md:p-12 flex flex-col justify-between shadow-hard animate-slideLeft overflow-y-auto">
        
        <div>
          {/* Header Action Bar */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-brand-mint" />
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-gray-500">Security Gate</span>
            </div>
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1 border-2 border-brand-dark rounded-sm hover:bg-brand-volt transition-colors"
            >
              <X className="w-4 h-4 text-brand-dark" />
            </button>
          </div>

          {/* Dynamic Typography Headers */}
          <h2 className="text-4xl font-black tracking-tighter text-brand-dark mb-2">
            {isLoginView ? 'ACCESS THE CORE.' : 'PROVISION NODE.'}
          </h2>
          <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
            {isLoginView 
              ? 'Initialize secure environment parameters to read active sales stream telemetry pipelines.' 
              : 'Deploy a multi-tenant listener environment to monitor marketplace message clusters.'}
          </p>

          {/* Context Alert Message Output Box */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-brand-dark text-red-900 rounded-premium mb-6 flex items-start gap-2 text-xs font-bold leading-tight shadow-sm">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Secure Transaction Execution Form Grid */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-brand-dark font-bold mb-2">Subscriber Email</label>
              <input 
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-white border-2 border-brand-dark font-sans rounded-premium text-sm font-semibold focus:outline-none focus:bg-brand-canvas focus:ring-2 focus:ring-brand-volt transition-all"
                placeholder="name@domain.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-brand-dark font-bold mb-2">Security Key (Password)</label>
              <input 
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-white border-2 border-brand-dark font-sans rounded-premium text-sm font-semibold focus:outline-none focus:bg-brand-canvas focus:ring-2 focus:ring-brand-volt transition-all"
                placeholder="••••••••"
              />
            </div>

            {!isLoginView && (
              <div className="animate-fadeIn">
                <label className="block text-xs uppercase font-mono tracking-wider text-brand-dark font-bold mb-2">Alert Routing Destination (WhatsApp Number)</label>
                <input 
                  type="text" required
                  value={alertPhoneNumber} onChange={(e) => setAlertPhoneNumber(e.target.value)}
                  className="w-full p-4 bg-white border-2 border-brand-dark font-sans rounded-premium text-sm font-semibold focus:outline-none focus:bg-brand-canvas focus:ring-2 focus:ring-brand-volt transition-all"
                  placeholder="2348039098270"
                />
              </div>
            )}

            <button 
              type="submit" disabled={isSubmitting}
              className="w-full py-4 bg-brand-dark text-white rounded-premium font-bold hover:bg-black hover:shadow-hard-volt transition-all flex items-center justify-center gap-2 group mt-4 active:scale-98 duration-100 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'VALIDATING...' : isLoginView ? 'LOGIN' : 'REGISTER'}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4 text-brand-volt group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        </div>

        {/* Tab Toggle Action Section */}
        <div className="border-t-2 border-gray-200 pt-6 mt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-tight">
            {isLoginView ? 'New Cluster Node? ' : 'Registered Operator? '}
            <button 
              type="button"
              onClick={() => { setIsLoginView(!isLoginView); setError(null); }}
              className="text-brand-dark font-bold underline underline-offset-2 hover:text-brand-muted"
            >
              {isLoginView ? 'Provision Environments Here.' : 'Initialize Terminal Credentials.'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
