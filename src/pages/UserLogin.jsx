import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Terminal, Activity } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Authentication protocol failed.');
      }
    } catch (err) {
      setError('Connection timeout: Unable to reach terminal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-urbanist px-6 py-20 relative overflow-hidden">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* --- BRAND HEADER --- */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-8 transition-transform hover:scale-105">
            <img src="/logo/printerkicks.png" alt="PRINTERKICKS" className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
             <div className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Secure Access Hub</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2 leading-none">Welcome Back.</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        {/* --- LOGIN MODULE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative"
        >
          {/* HUD Corner Marker */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-slate-200 m-8" />

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-100 text-center flex items-center justify-center gap-2"
                >
                  <Activity size={14} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} strokeWidth={2.5} />
                  <input 
                    required type="email" placeholder="NAME@ENTERPRISE.COM" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner placeholder:text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} strokeWidth={2.5} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-14 pr-14 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner placeholder:text-slate-200"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 group"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  INITIALIZE ACCESS
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-50 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              No identification yet?
              <Link to="/signup" className="text-blue-600 font-black hover:underline ml-2">Request Access ID</Link>
            </p>
          </div>
        </motion.div>

        {/* --- SYSTEM FOOTER --- */}
        <div className="mt-12 flex flex-col items-center gap-6 opacity-40">
           <div className="flex items-center gap-6">
              <ShieldCheck size={16} className="text-slate-900" />
              <div className="h-4 w-px bg-slate-300" />
              <Terminal size={16} className="text-slate-900" />
           </div>
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] text-center leading-relaxed">
             PrinterKicks Infrastructure // Global Operations <br /> Authentication Node Louisiana Node
           </p>
        </div>
      </div>
    </div>
  );
}
