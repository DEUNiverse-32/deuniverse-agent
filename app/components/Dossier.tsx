"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TypewriterText: React.FC<{ text: string, delay?: number }> = ({ text, delay = 0 }) => {
  const characters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    }),
  };

  const child = {
    visible: { opacity: 1, transition: { duration: 0.01 } },
    hidden: { opacity: 0 },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="leading-relaxed whitespace-pre-wrap"
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={child}>{char}</motion.span>
      ))}
    </motion.p>
  );
};

const Dossier: React.FC = () => {
  const intro = "모든 기록 실시간 암호화 관리 중";

  return (
    <div className="relative border border-slate-900 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none font-mono text-[8px] leading-tight overflow-hidden text-slate-400">
        {Array(100).fill("SYSTEM_IDENT_SECURE_ACCESS_LEVEL_5_").join("")}
      </div>

      {/* Header Info */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-6 relative z-10">
        <div>
          <h2 className="text-4xl font-industrial font-bold tracking-[0.2em] text-white uppercase mb-2">IDENTIFICATION</h2>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-red-900 text-white text-[11px] font-bold px-4 py-2 tracking-[0.2em] border border-red-700 shadow-[0_0_15px_rgba(127,29,29,0.5)]"
          >
            SECURITY LEVEL: 5 / TOP SECRET
          </motion.div>
        </div>
        <div className="text-right font-mono text-[10px] text-slate-500">
          <p className="text-red-900 font-bold uppercase tracking-widest mb-1">SECURITY CLEARANCE: LEVEL 5 (HIGHEST)</p>
          <p className="text-slate-300">REF: HD_LOG_2024</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-12 items-start relative z-10">
        <div className="md:col-span-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="aspect-[3/4] bg-slate-950 border border-slate-800 relative group overflow-hidden flex items-center justify-center"
          >
            {/* Grey Placeholder Placeholder */}
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <div className="text-[10px] font-mono text-zinc-700 text-center px-4 uppercase tracking-tighter">
                <img
                src="/me.png"   
                alt="Agent Profile" 
                className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
            </div>
            <div className="absolute inset-0 border border-slate-700/30 pointer-events-none"></div>
            <div className="absolute top-2 right-2 flex space-x-1">
              <div className="w-1 h-1 bg-red-900 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-l border-slate-800 pl-8">
             <div className="space-y-1">
               <label className="text-[9px] text-slate-600 font-mono uppercase tracking-widest block">Name</label>
               <p className="text-2xl font-bold text-slate-100 tracking-tight">Lee Hae-Deun</p>
             </div>
             <div className="space-y-1">
               <label className="text-[9px] text-slate-600 font-mono uppercase tracking-widest block">Affiliation / Rank</label>
               <p className="text-lg font-bold text-slate-300">TaehOn,</p> Strategic Planning Team</p>
               <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Deputy Manager</p>
             </div>
          </div>

          <div className="font-mono text-slate-400 text-base md:text-lg leading-relaxed border-t border-slate-800/50 pt-8 italic">
            <TypewriterText text={intro} delay={0.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dossier;
