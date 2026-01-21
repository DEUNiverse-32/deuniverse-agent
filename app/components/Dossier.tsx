'use client';

import React from 'react';

export default function Dossier() {
  // 너의 페르소나, 이해든의 기록들
  const userInfo = {
    name: "Lee Hae-Deun",
    position: "Strategy Team Deputy Head",
    clearance: "Level 5 (Top Secret)",
    status: "Active / Under Observation",
    location: "KST (Seoul, KR)",
  };

  const intro = "모든 기록 실시간 암호화 관리 중";

  return (
    <div className="relative border border-slate-900 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden group">
      {/* 배경 장식: 시스템 코드 패턴 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none font-mono text-[8px] leading-tight overflow-hidden text-slate-400">
        {Array(100).fill("SYSTEM_IDENT_SECURE_ACCESS_LEVEL_5_").join("")}
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-red-900/20 pb-8">
          <div>
            <h2 className="text-[10px] tracking-[0.5em] text-red-800 font-bold mb-4 uppercase">
              // Subject Identification
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-100 uppercase">
              {userInfo.name}
            </h3>
          </div>
          <div className="mt-6 md:mt-0 text-right font-mono">
            <p className="text-[10px] text-slate-600 tracking-widest uppercase">Clearance Status</p>
            <p className="text-sm text-red-700 font-bold tracking-widest">{userInfo.clearance}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm font-mono">
          <div className="space-y-6">
            <div>
              <span className="block text-[10px] text-slate-600 tracking-widest uppercase mb-1">Current Position</span>
              <span className="text-slate-300 tracking-wider">{userInfo.position}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-600 tracking-widest uppercase mb-1">Assigned Location</span>
              <span className="text-slate-300 tracking-wider">{userInfo.location}</span>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <span className="block text-[10px] text-slate-600 tracking-widest uppercase mb-1">Operational Status</span>
              <span className="text-red-900/80 tracking-widest animate-pulse font-bold">{userInfo.status}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-600 tracking-widest uppercase mb-1">System Note</span>
              <span className="text-slate-500 italic text-xs">"{intro}"</span>
            </div>
          </div>
        </div>

        {/* 하단 장식용 바코드 느낌의 디자인 */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex justify-between items-center opacity-40">
          <div className="flex space-x-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`h-4 w-[2px] bg-slate-700 ${i % 3 === 0 ? 'w-[4px]' : ''}`} />
            ))}
          </div>
          <span className="text-[8px] text-slate-700 tracking-[0.6em] uppercase">
            Deuniverse Authentication System v.26
          </span>
        </div>
      </div>
    </div>
  );
}
