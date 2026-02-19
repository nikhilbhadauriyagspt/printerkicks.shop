import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ArrowRight, ShieldCheck, Activity, Plus, Sparkles, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <div className="h-24 w-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-10 mx-auto shadow-sm group hover:scale-110 transition-transform duration-500">
            <Heart size={40} className="text-slate-200 group-hover:text-red-400 transition-colors duration-500" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Wishlist Empty.</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-12 max-w-xs mx-auto leading-relaxed">Your professional curation is awaiting its first acquisition.</p>
          <Link to="/shop" className="h-16 px-12 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-4 mx-auto w-fit">
            INITIALIZE DISCOVERY <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 pt-32 pb-20 font-urbanist relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* --- REFINED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">Curated Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-slate-400 italic">WISHLIST.</span>
            </h1>
          </div>
          <div className="flex flex-col items-end gap-2">
             <span className="text-2xl font-black text-slate-900">{wishlistCount}</span>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Marked Units</span>
          </div>
        </div>

        {/* --- FLOATING GALLERY GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, i) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-white rounded-[3rem] p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 h-full overflow-hidden"
              >
                {/* Internal HUD Detail */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.02] rounded-full blur-2xl -m-10" />
                
                {/* Visual Area */}
                <div className="relative aspect-square bg-slate-50/50 rounded-[2.2rem] flex items-center justify-center p-10 overflow-hidden mb-8 transition-all duration-700 group-hover:bg-white border border-transparent group-hover:border-slate-100">
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    className="absolute top-4 right-4 h-11 w-11 bg-white text-slate-300 hover:text-red-500 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center z-20 transition-all hover:scale-110 active:scale-95"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>

                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center relative z-10">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                </div>

                {/* Info Area */}
                <div className="px-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="text-[9px] font-black text-red-500 bg-red-50 px-2.5 py-1 rounded-lg uppercase tracking-widest">{p.brand_name || 'ELITE'}</span>
                     <div className="h-px flex-1 bg-slate-100" />
                  </div>
                  
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-red-500 transition-colors uppercase tracking-tight leading-[1.1] mb-4 line-clamp-2 min-h-[2.4rem]">
                      {p.name}
                    </h3>
                  </Link>

                  <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-slate-50">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Value</span>
                       <span className="text-xl font-black text-slate-900">${p.price.toLocaleString()}</span>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(p)}
                      className="h-12 px-6 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-xl active:scale-95 group/btn"
                    >
                      <Plus size={16} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
                      ADD TO BAG
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-all">
            <ChevronLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> 
            Continue Strategic Procurement
          </Link>
          <div className="flex items-center gap-10">
             <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-blue-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Listings Only</span>
             </div>
             <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-blue-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Logistics Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
