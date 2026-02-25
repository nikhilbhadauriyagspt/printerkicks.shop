import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ShieldCheck, Box } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function TheVault({ products = [] }) {
  const navigate = useNavigate();
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
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
    <section className="px-6 md:px-10 lg:px-12 py-16 lg:py-20 bg-white font-urbanist overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- PROFESSIONAL CENTERED HEADER --- */}
        <div className="relative z-10 flex flex-col items-center text-center mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase">
                Premium Hardware
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">VAULT.</span>
            </h2>
          </div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-0 border-y border-slate-100">
            {products.map((p, i) => (
              <CarouselItem key={p.id} className="pl-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6">
                <motion.div
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="group relative bg-white p-8 cursor-pointer hover:bg-slate-50 transition-all duration-500 h-full border-r border-slate-100 border-y border-slate-50"
                >
                  <div className="aspect-square bg-white mb-8 overflow-hidden p-6 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-700" 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                       <Box size={12} className="text-blue-600" />
                                               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.brand_name || 'Authentic'}</span>                    </div>
                    <h4 className="text-[13px] font-black text-slate-900 leading-tight uppercase tracking-tight line-clamp-3 min-h-[3.3rem] group-hover:text-blue-600 transition-colors">{p.name}</h4>
                    <div className="flex items-center justify-between pt-2">
                       <p className="text-base font-black text-slate-900">${p.price}</p>
                       <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                          <ArrowRight size={14} />
                       </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Controls */}
          <div className="flex justify-center gap-3 mt-12">
            <CarouselPrevious className="static translate-y-0 h-11 w-11 border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 h-11 w-11 border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm" />
          </div>
        </Carousel>

        <div className="mt-16 flex justify-center">
           <Link to="/shop" className="h-14 px-10 border-2 border-slate-100 hover:border-slate-900 rounded-full flex items-center gap-4 transition-all duration-500 text-[10px] font-black uppercase tracking-widest group">
              ACCESS FULL ARCHIVE <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </Link>
        </div>
      </div>
    </section>
  );
}
