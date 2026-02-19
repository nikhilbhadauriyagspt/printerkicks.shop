import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowRight, Check, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 lg:py-20 bg-white font-urbanist relative">
      
      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <div className="relative z-10 flex flex-col items-center text-center mb-20">
        <div className="max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase">
              Latest Inventory
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            NEW <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">ARRIVALS.</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px bg-slate-100 border border-slate-100">
        {products.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group bg-white p-6 transition-all duration-500 hover:z-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col relative h-full border-y border-slate-50"
            >
              {/* Top Bar Indicators */}
              <div className="flex justify-between items-start mb-6">
                 <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                   {p.brand_name || 'AUTHENTIC'}
                 </span>
                 <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className={cn(
                      "transition-all duration-300 transform",
                      isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2.5} />
                  </button>
              </div>

              {/* Product Visual */}
              <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col">
                <div className="relative aspect-square mb-8 flex items-center justify-center p-4">
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight line-clamp-3 leading-tight min-h-[3rem] group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-end justify-between">
                    <span className="text-base font-black text-slate-900">${p.price}</span>
                  </div>
                </div>
              </Link>

              {/* Quick Action Overlay */}
              <div className="mt-6 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                  disabled={addedItems[p.id]}
                  className={cn(
                    "w-full h-10 flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-widest transition-all duration-300",
                    addedItems[p.id] 
                      ? "bg-emerald-500 text-white" 
                      : "bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-900/10"
                  )}
                >
                  {addedItems[p.id] ? <><Check size={14} /> ADDED</> : <><Plus size={14} /> ADD TO CART</>}
                </button>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Explore All Bottom Link */}
      <div className="mt-16 flex justify-center">
         <Link to="/shop" className="h-14 px-12 border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white rounded-full flex items-center gap-4 transition-all duration-500 text-[11px] font-black uppercase tracking-widest shadow-sm">
            INITIALIZE FULL CATALOG <ArrowRight size={16} />
         </Link>
      </div>
    </section>
  );
}
