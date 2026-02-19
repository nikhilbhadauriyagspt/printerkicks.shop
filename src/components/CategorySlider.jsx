import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowRight, Loader2, Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import API_BASE_URL from "../config";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { cn } from "../lib/utils";

export default function CategorySlider({ title, subtitle, products = [], bgColor = "bg-white" }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (products.length === 0) return null;

  return (
    <section className={cn("px-6 md:px-10 lg:px-12 py-16 lg:py-20 font-urbanist overflow-hidden relative", bgColor)}>
      
      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <div className="max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase">
              {subtitle}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">{title.split(' ').slice(1).join(' ')}.</span>
          </h2>
        </div>
      </div>

      <div className="relative group/carousel">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {products.map((p, i) => (
              <CarouselItem key={p.id} className="pl-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6">
                <motion.div 
                  className="bg-white border-r border-slate-100 p-6 transition-all duration-500 hover:z-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col h-full relative border-y border-slate-50"
                >
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className={cn(
                      "absolute top-4 right-4 z-20 p-2 transition-all duration-300",
                      isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2.5} />
                  </button>

                  <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col">
                    <div className="relative aspect-square mb-6 flex items-center justify-center p-4">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-tight line-clamp-3 leading-tight min-h-[3.3rem]">
                        {p.name}
                      </h3>
                      <span className="text-sm font-black text-slate-900 block">${p.price}</span>
                    </div>
                  </Link>

                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                      disabled={addedItems[p.id]}
                      className={cn(
                        "w-full h-10 flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-widest transition-all duration-300",
                        addedItems[p.id] 
                          ? "bg-emerald-500 text-white" 
                          : "bg-slate-900 text-white hover:bg-blue-600 shadow-sm"
                      )}
                    >
                      {addedItems[p.id] ? <><Check size={14} /> ADDED</> : <><Plus size={14} /> QUICK ADD</>}
                    </button>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Professional Minimal Controls */}
          <div className="flex justify-center gap-3 mt-12">
            <CarouselPrevious className="static translate-y-0 h-11 w-11 border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 h-11 w-11 border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
