'use client';

// useState를 사용하기 위해 import에 추가
import React, { useState } from 'react';

export default function Dossier() {
  // 이미지의 흑백/컬러 상태를 관리하는 State (기본값: true = 흑백)
  const [isGrayscale, setIsGrayscale] = useState(true);

  const userInfo = {
    name: "Lee Hae-Deun",
    position: "Strategy Team Deputy Head",
    clearance: "Level 5 (Top Secret)",
    // status를 "Active"만 남기고 수정
    status: "Active",
    affiliation: "TaehOn", 
    image: "/me.png" 
  };

  // 이미지 클릭 시 실행될 함수: 상태를 반대로 토글
  const toggleImageColor = () => {
    setIsGrayscale(!isGrayscale);
  };

  return (
    <div className="relative border border-slate-900 bg-black/40 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden group font-mono">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none text-[8px] leading-tight overflow-hidden text-slate-400">
        {Array(150).fill("SYSTEM_IDENT_SECURE_ACCESS_LEVEL_5_CONFIDENTIAL_").join("")}
      </div>

      <div className="relative z-10 animate-in fade-in duration-1000">
        
        <div className="flex flex-col md:flex-row gap-10 items-start mb-12 border-b border-red-900/20 pb-10">
          
          {/* ID 사진 영역 */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-52 md:w-48 md:h-60 relative overflow-hidden border border-slate-800 bg-[#0a0a1a]">
              {/* 이미지 태그 수정:
                1. onClick 이벤트 추가
                2. 상태(isGrayscale)에 따라 클래스를 동적으로 변경
                3. 부드러운 전환을 위한 transition 추가
              */}
              <img 
                src={userInfo.image} 
                alt="Subject Profile"
                onClick={toggleImageColor}
                className={`w-full h-full object-cover transition-all duration-700 cursor-pointer ${
                  isGrayscale 
                    ? 'grayscale contrast-110 opacity-90'  // 흑백 모드 (기본)
                    : 'grayscale-0 contrast-100 opacity-100' // 컬러 모드 (클릭 시)
                }`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full pt-2">
            <h2 className="text-[9px] tracking-[0.6em] text-red-800/70 font-bold mb-3 uppercase">
              // Subject Identification
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-slate-100 drop-shadow-sm">
              {userInfo.name}
            </h3>
            
            <div className="mt-8 inline-flex flex-col border-l-[3px] border-red-900/70 pl-4">
              <span className="text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1">Current Clearance</span>
              <span className="text-base text-red-700 font-bold tracking-[0.2em] uppercase">{userInfo.clearance}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm opacity-90">
          <div className="space-y-6">
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">Position / Rank</span>
              <span className="text-slate-300 tracking-wider font-light">{userInfo.position}</span>
            </div>
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">Affiliation</span>
              <span className="text-slate-300 tracking-wider font-light">{userInfo.affiliation}</span>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">Current Status</span>
              {/* status가 "Active"로 짧아짐 */}
              <span className="text-red-700/90 tracking-widest animate-pulse font-bold">{userInfo.status}</span>
            </div>
            <div>
              <span className="block text-[9px] text-slate-600 tracking-[0.3em] uppercase mb-1 font-bold">System Note</span>
              <p className="text-slate-500 text-xs leading-relaxed">
                "Subject shows high adaptability. Strategic assets confirmed. Continuous monitoring active."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-slate-900/50 flex justify-between items-center opacity-40">
          <div className="flex space-x-0.5">
            {[...Array(16)].map((_, i) => (
              <div key={i} className={`h-3 bg-slate-700 ${i % 4 === 0 ? 'w-[3px]' : 'w-[1px]'} ${i % 2 === 0 ? 'opacity-100' : 'opacity-50'}`} />
            ))}
          </div>
          <span className="text-[8px] text-slate-700 tracking-[0.5em] uppercase">
            DEUNIVERSE AUTH. v2.6.3 // SECURE
          </span>
        </div>
      </div>
    </div>
  );
}
