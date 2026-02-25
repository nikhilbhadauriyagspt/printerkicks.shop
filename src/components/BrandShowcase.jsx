import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, ShieldCheck, Zap } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=0f172a&bold=true`;
  };

  if (brands.length === 0) return null;

  // Triple the brands for a seamless infinite scroll effect
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 lg:py-20 bg-white font-urbanist relative overflow-hidden border-y border-slate-100">
      {/* Technical Background Detail */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      
      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16 px-6">
        <div className="max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.6em] uppercase text-blue-600 block">
              TOP BRANDS
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            CURATED <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-400 italic">SELECTION.</span>
          </h2>
          <p className="mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
            Global leaders in professional infrastructure & tech innovation.
          </p>
        </div>
      </div>

      {/* --- INDUSTRIAL MARQUEE --- */}
      <div className="relative z-10 w-full overflow-hidden py-10 border-y border-slate-100 bg-slate-50/30 pause-on-hover">
        {/* Technical Edge Gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20" />

        <div className="animate-marquee flex items-center gap-0 whitespace-nowrap">
          {marqueeBrands.map((brand, i) => (
            <Link 
              key={`${brand.id}-${i}`}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group border-r border-slate-200/60 first:border-l"
            >
              <div className="h-24 px-12 flex items-center gap-8 hover:bg-white transition-all duration-500 relative">
                {/* HUD Corner Marker */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity m-2" />
                
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 bg-white rounded-xl shadow-sm border border-slate-100 p-2.5 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110">
                    <img 
                      src={getBrandLogo(brand)} 
                      alt={brand.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-0.5">
                       <span className="text-[12px] font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                         {brand.name}
                       </span>
                       <ArrowUpRight size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Secondary Spec Indicator */}
                <div className="hidden lg:flex items-center gap-3 pl-8 border-l border-slate-100 h-8">
                   <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                   <span className="text-[8px] font-black text-slate-300 group-hover:text-slate-500 transition-colors uppercase tracking-[0.2em]">Verified</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- STATUS BAR --- */}
      <div className="mt-12 flex items-center justify-center gap-8 px-6">
         <div className="flex items-center gap-3">
            <ShieldCheck size={14} className="text-blue-600" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quality Assurance</span>
         </div>
         <div className="h-3 w-px bg-slate-200" />
         <div className="flex items-center gap-3">
            <Globe size={14} className="text-blue-600" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Logistics Support</span>
         </div>
      </div>
    </section>
  );
}
