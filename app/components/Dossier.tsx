'use client';

import React from 'react';

export default function Dossier() {
  // 이해든의 기록 데이터
  const userInfo = {
    name: "Lee Hae-Deun",
    position: "Strategy Team Deputy Head",
    clearance: "Level 5 (Top Secret)",
    status: "Active / Under Observation",
    location: "KST (Seoul, KR)",
    // 네가 알려준 파일명. 이 파일이 public 폴더 안에 있어야 해.
    image: "/me.png" 
  };

  return (
    <div className="relative border border-slate-900 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden group transition-all duration-500 hover:border-red-900/30">
      {/* 배경의 미세한 시스템 패턴 */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none font-mono text-[8px] leading-tight overflow-hidden text-slate-400">
        {Array(150).fill("SYSTEM_IDENT_SECURE_ACCESS_LEVEL_5_CONFIDENTIAL_").join("")}
      </div>

      <div className="relative z-10 animate-in fade-in duration-1000 font-mono">
        
        {/* 상단: 이미지와 이름/등급 섹션 */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-12 border-b border-red-900/20 pb-10">
          
          {/* ID 사진 영역 */}
          <div className="relative flex-shrink-0">
            {/* 사진 테두리의 반질반질한 금속성 광택 효과 */}
            <div className="absolute -inset-1 bg-gradient-to-br from-slate-700/30 via-transparent to-red-900/10 rounded-sm blur-sm opacity-50"></div>
            <div className="w-40 h-52 md:w-48 md:h-60 relative overflow-hidden border-[2px] border-slate-800/80 bg-[#0a0a1a]">
              
              {/* 이미지 파일 적용 (흑백 + 대비 증가 효과) */}
              <img 
                src={userInfo.image} 
                alt="Subject Profile" 
                className="w-full h-full object-cover grayscale对比度-110 (contrast-110) opacity-90"
              />
              
              {/* 사진 위의 스캔라인 및 반사광 효과 */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
              
              {/* 좌측 상단 라벨 */}
              <div className="absolute top-0 left-0 bg-red-900/80 px-2 py-1">
                <p className="text-[7px] text-white tracking-[0.2em] font-bold">ID_PHOTO // REF.032</p>
              </div>
            </div>
          </div>

          {/* 이름 및 보안 등급 정보 */}
          <div className="flex-1 w-full pt-2">
            <h2 className="text-[9px] tracking-[0.6em] text-red-800/70 font-bold mb-3 uppercase">
              // Subject Identification
            </h2>
            {/* 이름에 적용된 금속성 그라데이션 텍스트 */}
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent drop-shadow-sm">
              {userInfo.name}
            </h3>
            
            <div className="mt-8 inline-flex flex-col border-l-[3px] border-red-900/70 pl-4">
              <span className="text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1">Current Clearance</span>
              <span className="text-base text-red-700 font-bold tracking-[0.2em] uppercase">{userInfo.clearance}</span>
            </div>
          </div>
        </div>

        {/* 하단: 상세 정보 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm opacity-90">
          <div className="space-y-6">
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">Position / Rank</span>
              <span className="text-slate-300 tracking-wider font-light">{userInfo.position}</span>
            </div>
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">Assigned Node</span>
              <span className="text-slate-300 tracking-wider font-light">{userInfo.location}</span>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">Current Status</span>
              <span className="text-red-700/90 tracking-widest animate-pulse font-bold">{userInfo.status}</span>
            </div>
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">System Note</span>
              <p className="text-slate-500 italic text-xs leading-relaxed">
                "Subject shows high adaptability in classified environments. Continuous monitoring protocols active."
              </p>
            </div>
          </div>
        </div>

        {/* 최하단 장식 바 */}
        <div className="mt-16 pt-6 border-t border-slate-900/50 flex justify-between items-center opacity-40">
          <div className="flex space-x-0.5">
            {[...Array(16)].map((_, i) => (
              <div key={i} className={`h-3 bg-slate-700 ${i % 4 === 0 ? 'w-[3px]' : 'w-[1px]'} ${i % 2 === 0 ? 'opacity-100' : 'opacity-50'}`} />
            ))}
          </div>
          <span className="text-[8px] text-slate-700 tracking-[0.5em] uppercase">
            DEUNIVERSE AUTH. v2.6.1 // SECURE
          </span>
        </div>
      </div>
    </div>
  );
}
