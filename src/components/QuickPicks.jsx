import { motion } from "framer-motion";
import { Plus, ArrowRight, Check, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import 'swiper/css';

export default function QuickPicks({ products = [] }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  
  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 lg:py-20 bg-slate-50 font-urbanist relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-slate-200" />
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- PROFESSIONAL CENTERED HEADER --- */}
        <div className="relative z-10 flex flex-col items-center text-center mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase">
                Essential Add-ons
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              QUICK <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">PICKS.</span>
            </h2>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ prevEl: '.qp-prev', nextEl: '.qp-next' }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1440: { slidesPerView: 4.5 },
              1600: { slidesPerView: 5.5 },
            }}
            className="!overflow-visible"
          >
            {products.map((p, i) => (
              <SwiperSlide key={p.id}>
                <motion.div 
                  onClick={() => navigate(`/product/${p.slug || p.id}`)}
                  whileHover={{ y: -4 }}
                  className="flex flex-col p-5 bg-white border border-slate-200 rounded-[2rem] transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 group cursor-pointer h-full"
                >
                  <div className="relative aspect-square bg-slate-50 rounded-[1.5rem] overflow-hidden mb-5 p-6 flex items-center justify-center">
                    <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500" />
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                       <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{p.brand_name || 'Electronics'}</span>
                       <div className="flex items-center gap-1.5">
                          <div className="h-1 w-1 rounded-full bg-emerald-500" />
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">In Stock</span>
                       </div>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                    
                    <div className="mt-4 flex items-center justify-between">
                       <p className="text-base font-black text-slate-900">${p.price}</p>
                       <button 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          addToCart(p);
                        }}
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500",
                          cart.find(i => i.id === p.id) 
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                            : "bg-slate-900 text-white group-hover:bg-blue-600 shadow-lg shadow-slate-900/10"
                        )}
                      >
                        {cart.find(i => i.id === p.id) ? <Check size={16} strokeWidth={3} /> : <Plus size={20} strokeWidth={2.5} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Symmetrical Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <button className="qp-prev h-12 w-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="qp-next h-12 w-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
