"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Archive: React.FC = () => {
  return (
    <div className="py-12 border-t border-slate-900/50">
       <h3 className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase mb-8 text-center">Archive</h3>
       
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[1, 2, 3, 4].map((item) => (
           <motion.div 
             key={item}
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="aspect-square bg-slate-900/30 border border-slate-800 flex items-center justify-center relative group overflow-hidden"
           >
             <div className="text-[10px] text-slate-700 font-mono group-hover:text-slate-500 transition-colors">
               NO_DATA
             </div>
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </motion.div>
         ))}
       </div>
    </div>
  );
};

export default Archive;