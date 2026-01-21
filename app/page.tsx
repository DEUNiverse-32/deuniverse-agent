'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dossier from './components/Dossier';
import InternalLogs from './components/InternalLogs';
import ExternalGateway from './components/ExternalGateway';
import Archive from './components/Archive';

const WARNING_MESSAGE = "THIS PAGE IS A CLASSIFIED DOCUMENT PROTECTED BY LEVEL 5 SECURITY CLEARANCE. ALL SYSTEM LOGS ARE ENCRYPTED IN REAL-TIME. UNAUTHORIZED ACCESS ATTEMPTS WILL BE TRACKED AND NEUTRALIZED IMMEDIATELY.";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false); // 글리치 상태 추가

  const handleAuthorize = () => {
    setIsGlitching(true); // 글리치 시작
    
    // 0.5초 동안 지직거린 후 실제 화면으로 진입
    setTimeout(() => {
      setIsAuthorized(true);
      setIsGlitching(false);
    }, 500);
  };

  useEffect(() => {
    if (isAuthorized || typedText.length === WARNING_MESSAGE.length) return;
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText((prev) => WARNING_MESSAGE.slice(0, index + 1));
      index++;
      if (index === WARNING_MESSAGE.length) clearInterval(intervalId);
    }, 60);
    return () => clearInterval(intervalId);
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 p-6 font-mono ${isGlitching ? 'animate-glitch' : ''}`}>
        {/* 글리치 발생 시 나타나는 붉은색 노이즈 레이어 */}
        {isGlitching && (
          <div className="absolute inset-0 z-[110] bg-red-900/20 mix-blend-overlay animate-noise pointer-events-none"></div>
        )}
        
        <div className={`max-w-2xl w-full border border-red-900/30 p-10 bg-[#0a0a1a] shadow-[0_0_60px_rgba(153,27,27,0.15)] relative overflow-hidden ${isGlitching ? 'scale-105 duration-75' : 'duration-500'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent pointer-events-none h-4 w-full animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="w-full text-center text-red-700 font-bold text-sm md:text-base mb-8 tracking-[0.4em] border-b border-red-900/20 pb-4 whitespace-nowrap">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            
            <p className="text-center text-slate-400 leading-6 text-[11px] mb-12 break-words opacity-90 min-h-[5rem] font-light tracking-wide uppercase">
              {typedText}
              <span className={`inline-block ml-1 w-1.5 h-3 bg-red-700 ${typedText.length < WARNING_MESSAGE.length ? 'animate-pulse' : 'hidden'}`}></span>
            </p>
            
            <button
              onClick={handleAuthorize}
              disabled={isGlitching}
              className="w-full max-w-xs py-4 border border-slate-800 hover:border-red-900/50 hover:bg-red-950/20 hover:text-white transition-all duration-700 text-[10px] tracking-[0.6em] uppercase group"
            >
              <span className="group-hover:animate-pulse">
                {isGlitching ? 'BYPASSING...' : 'ACCESS GRANTED'}
              </span>
            </button>
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-5px, 5px); }
            40% { transform: translate(-5px, -5px); }
            60% { transform: translate(5px, 5px); }
            80% { transform: translate(5px, -5px); }
            100% { transform: translate(0); }
          }
          .animate-glitch {
            animation: glitch 0.1s linear infinite;
          }
        `}</style>

        <div className="mt-10 text-[8px] text-slate-800 tracking-[0.6em] uppercase">
          DEUNIVERSE ENCRYPTION SYSTEM // SECURE_NODE_032
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 relative selection:bg-red-900 selection:text-white overflow-x-hidden">
      <main className="container mx-auto px-6 py-24 max-w-5xl relative z-10 animate-in fade-in duration-1000">
        <Header />
        <div className="space-y-48 mt-32">
          <section id="dossier"><Dossier /></section>
          <section id="internal-logs"><InternalLogs /></section>
          <section id="external-gateway"><ExternalGateway /></section>
          <section id="archive"><Archive /></section>
        </div>
      </main>
    </div>
  );
}
