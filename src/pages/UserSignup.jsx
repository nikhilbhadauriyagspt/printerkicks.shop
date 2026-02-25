import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        alert('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration protocol failed.');
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
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Initialize Account ID</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2 leading-none">Join the Elite.</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Register for professional access</p>
        </div>

        {/* --- SIGNUP MODULE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative"
        >
          <form onSubmit={handleSignup} className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-100 text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} strokeWidth={2.5} />
                  <input 
                    required type="text" placeholder="EX. ARTHUR DENT" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} strokeWidth={2.5} />
                  <input 
                    required type="email" placeholder="NAME@ENTERPRISE.COM" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} strokeWidth={2.5} />
                  <input 
                    required type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} strokeWidth={2.5} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full h-14 pl-14 pr-14 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
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
              className="w-full h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 mt-4 group"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  INITIALIZE ACCOUNT
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Existing identification detected?
              <Link to="/login" className="text-blue-600 font-black hover:underline ml-2">Log In Here</Link>
            </p>
          </div>
        </motion.div>

        {/* --- SYSTEM FOOTER --- */}
        <div className="mt-10 flex flex-col items-center gap-4 opacity-40">
           <ShieldCheck size={16} className="text-slate-900" />
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">
                           SECURE NETWORK PROTOCOL // 2026           </p>
        </div>
      </div>
    </div>
  );
}
