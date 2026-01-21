'use client';

import React, { useState } from 'react';

export default function Dossier() {
  const [isGrayscale, setIsGrayscale] = useState(true);

  const userInfo = {
    name: "Lee Hae-Deun",
    position: "Strategy Team Deputy Head",
    clearance: "Level 5 (Top Secret)",
    status: "Active",
    affiliation: "TaehOn", 
    image: "/me.png" 
  };

  return (
    <div className="relative border border-slate-800 bg-black/60 backdrop-blur-2xl p-8 md:p-14 shadow-2xl overflow-hidden font-mono">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none text-[9px] text-slate-300">
        {Array(150).fill("TAEHON_SECURE_ID_").join("")}
      </div>

      <div className="relative z-10 animate-in fade-in duration-1000">
        <div className="flex flex-col md:flex-row gap-12 items-start mb-16 border-b border-red-900/40 pb-12">
          <div className="relative flex-shrink-0">
            <div 
              className="w-44 h-56 md:w-52 md:h-64 relative border-2 border-slate-700 bg-black cursor-pointer overflow-hidden"
              onClick={() => setIsGrayscale(!isGrayscale)}
            >
              <img 
                src={userInfo.image} 
                alt="Subject Profile" 
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  isGrayscale ? 'grayscale contrast-125 opacity-80' : 'grayscale-0 contrast-100 opacity-100'
                }`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
            </div>
          </div>

          <div className="flex-1 w-full pt-4">
            <h2 className="text-[11px] tracking-[0.6em] text-red-700 font-bold mb-4 uppercase opacity-80">
              Subject Identification
            </h2>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase text-slate-100 mb-10">
              {userInfo.name}
            </h3>
            <div className="inline-flex flex-col border-l-4 border-red-800 pl-6">
              <span className="text-[10px] text-slate-500 tracking-[0.4em] uppercase mb-1">Clearance Level</span>
              <span className="text-lg text-red-600 font-bold tracking-[0.2em] uppercase">{userInfo.clearance}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 text-[13px]">
          <div className="space-y-8">
            <div className="group">
              <span className="block text-[11px] text-slate-500 tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-red-800 transition-colors">Position</span>
              <span className="text-slate-200 tracking-wider">{userInfo.position}</span>
            </div>
            <div className="group">
              <span className="block text-[11px] text-slate-500 tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-red-800 transition-colors">Affiliation</span>
              <span className="text-slate-200 tracking-wider font-bold">{userInfo.affiliation}</span>
            </div>
          </div>
          <div className="space-y-8">
            <div className="group">
              <span className="block text-[11px] text-slate-500 tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-red-800 transition-colors">Status</span>
              <span className="text-red-600 tracking-[0.4em] animate-pulse font-bold">{userInfo.status}</span>
            </div>
            <div className="group">
              <span className="block text-[11px] text-slate-500 tracking-[0.3em] uppercase mb-2 font-bold group-hover:text-red-800 transition-colors">Internal Note</span>
              <p className="text-slate-300 italic leading-relaxed bg-slate-900/30 p-3 border-l border-slate-800">
                "Strategic assets confirmed. Continuous monitoring active under node 032."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800/80 flex justify-between items-center">
          <div className="flex space-x-1 opacity-80">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`h-6 bg-slate-400 ${i % 3 === 0 ? 'w-[4px]' : 'w-[1px]'} ${i % 5 === 0 ? 'opacity-40' : 'opacity-100'}`} />
            ))}
          </div>
          <span className="text-[10px] text-slate-500 tracking-[0.6em] uppercase font-bold">
            SECURE_NODE_IDENT ｜ 032-HADEUN
          </span>
        </div>
      </div>
    </div>
  );
}
