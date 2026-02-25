import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Settings
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Official Warranty",
    desc: "Premium Brand Coverage",
    label: "WARRANTY PROTECTION"
  },
  {
    icon: <Truck size={20} />,
    title: "Express Delivery",
    desc: "24-Hour Priority Dispatch",
    label: "LOGISTICS NETWORK"
  },
  {
    icon: <RotateCcw size={20} />,
    title: "7-Day Returns",
    desc: "Compliant Return Policy",
    label: "CLIENT SATISFACTION"
  }
];

export default function Features() {
  return (
    <section className="bg-white font-urbanist py-8 lg:py-12 border-b border-slate-100">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 bg-white shadow-sm">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col p-6 lg:p-8 bg-white overflow-hidden border-r last:border-r-0 border-slate-200"
            >
              {/* Technical Label Header */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                 <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-blue-600 tracking-[0.2em] uppercase">{item.label}</span>
                    <div className="h-[1px] w-6 bg-slate-100 mt-1" />
                 </div>
                 <Settings size={12} className="text-slate-200" />
              </div>

              {/* Main Content Node */}
              <div className="relative z-10 flex items-center gap-5">
                <div className="h-12 w-12 bg-slate-50 border border-slate-100 text-slate-900 flex items-center justify-center shrink-0">
                   {item.icon}
                </div>
                
                <div>
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight leading-none mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Minimal Status Indicator */}
              <div className="mt-6 flex items-center gap-3 relative z-10">
                 <div className="h-[2px] flex-1 bg-slate-50 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className="absolute inset-y-0 left-0 bg-blue-600/40"
                    />
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Active</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
