import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { 
  User, 
  Lock, 
  ShoppingBag, 
  Package, 
  ChevronRight, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2,
  Terminal,
  Activity,
  Box
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully!");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Password changed successfully!");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Security update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-20 font-urbanist">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase">
              Authenticated Member Portal
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-4">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">DASHBOARD.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- SIDEBAR MODULE --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-2xl shadow-slate-200/20 sticky top-32">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="relative group">
                   <div className="h-28 w-24 bg-slate-900 flex items-center justify-center text-white text-4xl font-black shadow-xl group-hover:scale-105 transition-transform duration-500 uppercase">
                     {user.name.charAt(0)}
                   </div>
                   <div className="absolute -inset-4 bg-blue-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">{user.name}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2 border-t border-slate-50 pt-2">{user.email}</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Identity Module', icon: User },
                  { id: 'orders', label: 'Operation Logs', icon: Package },
                  { id: 'security', label: 'Security Access', icon: Lock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group",
                      activeTab === tab.id 
                      ? "bg-slate-900 text-white shadow-xl translate-x-2" 
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-4">
                       <tab.icon size={16} />
                       {tab.label}
                    </div>
                    <ChevronRight size={14} className={cn("transition-transform", activeTab === tab.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
                  </button>
                ))}
                
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={16} />
                    Terminate Session
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTENT HUB --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-slate-100 p-8 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/10"
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
                      <User size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Identity Parameters</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Configure personal data nodes</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Full Identity Name</label>
                        <input 
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Voice Comm Node</label>
                        <input 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Logistics Destination</label>
                      <textarea 
                        rows="4" value={profileForm.address}
                        onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                        className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all resize-none shadow-inner"
                      ></textarea>
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-16 px-12 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-2xl disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Commit Changes"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-900 text-white rounded-[3rem] p-10 lg:p-16 relative overflow-hidden flex items-center justify-between group">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <Terminal size={100} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                         <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">Inventory History</span>
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none mb-2">Operation Logs.</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{orders.length} successful deployments executed</p>
                    </div>
                    <Link to="/shop" className="h-12 px-8 bg-blue-600 text-white rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all relative z-10">Deploy New Order</Link>
                  </div>

                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <div className="bg-white border border-slate-100 rounded-[3rem] p-32 text-center shadow-xl shadow-slate-200/10">
                        <Box size={64} strokeWidth={1} className="text-slate-100 mx-auto mb-8" />
                        <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em]">Zero operational records detected.</p>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden group hover:border-blue-600/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/5">
                          <div className="p-10 flex items-center justify-between border-b border-slate-50">
                            <div className="flex items-center gap-8">
                               <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                  <Activity size={24} />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Deployment ID</p>
                                  <h4 className="text-xl font-black text-slate-900 uppercase">#PFX-{order.id}</h4>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-2xl font-black text-slate-900 tracking-tighter">${order.total_amount.toLocaleString()}</p>
                               <span className={cn(
                                 "mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all",
                                 order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                               )}>
                                 <div className={cn("h-1 w-1 rounded-full animate-pulse", order.status === 'delivered' ? "bg-emerald-500" : "bg-blue-500")} />
                                 {order.status}
                               </span>
                            </div>
                          </div>
                          <div className="p-8 bg-slate-50/30 flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <Mail size={14} className="text-slate-300" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol Date: {new Date(order.created_at).toLocaleDateString()}</span>
                             </div>
                             <Link to="/orders" className="flex items-center gap-3 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-5 transition-all">
                               Track Shipment Hub <ArrowRight size={16} />
                             </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-slate-100 p-8 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/10"
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-14 w-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100 shadow-sm">
                      <Lock size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Security Protocol</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Configure account access keys</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">New Access Key</label>
                      <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.password}
                          onChange={(e) => setSecurityForm({...securityForm, password: e.target.value})}
                          className="w-full h-16 pl-14 pr-14 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Confirm Access Key</label>
                      <div className="relative group">
                        <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                          className="w-full h-16 pl-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-16 px-12 bg-red-500 text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Re-Initialize Access Keys"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
