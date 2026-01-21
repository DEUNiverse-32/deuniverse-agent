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
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  // 현재 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState('dossier');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Seoul',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthorize = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsAuthorized(true);
      setIsGlitching(false);
    }, 500);
  };

  useEffect(() => {
    if (isAuthorized || typedText.length === WARNING_MESSAGE.length) return;
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(WARNING_MESSAGE.slice(0, index + 1));
      index++;
      if (index === WARNING_MESSAGE.length) clearInterval(intervalId);
    }, 30);
    return () => clearInterval(intervalId);
  }, [isAuthorized]);

  if (!isAuthorized) {
    // ... (보안 게이트 코드는 이전과 동일하게 유지하거나 필요시 수정)
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 p-6 font-mono ${isGlitching ? 'animate-glitch' : ''}`}>
        {isGlitching && <div className="absolute inset-0 z-[110] bg-red-900/20 mix-blend-overlay animate-noise pointer-events-none" />}
        <div className="max-w-2xl w-full border border-red-900/30 p-10 bg-[#0a0a1a] shadow-[0_0_60px_rgba(153,27,27,0.15)] relative overflow-hidden">
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <span className="text-[9px] text-red-900/60 tracking-widest animate-pulse">● LIVE</span>
            <span className="text-[10px] text-slate-500 tracking-tighter">KST {currentTime}</span>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4">
            <h1 className="w-full text-center text-red-700 font-bold text-sm md:text-base mb-8 tracking-[0.4em] border-b border-red-900/20 pb-4 whitespace-nowrap">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            <p className="text-center text-slate-400 leading-6 text-[11px] mb-12 break-words opacity-90 min-h-[5rem] font-light tracking-wide uppercase">
              {typedText}<span className={`inline-block ml-1 w-1.5 h-3 bg-red-700 ${typedText.length < WARNING_MESSAGE.length ? 'animate-pulse' : 'hidden'}`}></span>
            </p>
            <button onClick={handleAuthorize} className="w-full max-w-xs py-4 border border-slate-800 hover:border-red-900/50 hover:bg-red-950/20 hover:text-white transition-all duration-700 text-[10px] tracking-[0.6em] uppercase">
              ACCESS GRANTED
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 relative selection:bg-red-900 selection:text-white overflow-hidden">
      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 flex flex-col h-screen">
        
        {/* 반질반질한(광택) 느낌의 제목 섹션 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-[0.2em] uppercase mb-2 bg-gradient-to-br from-slate-100 via-slate-400 to-slate-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            DEUNIVERSE
          </h1>
          <div className="h-[1px] w-full bg-gradient-to-r from-red-900/50 via-slate-800 to-transparent" />
        </div>

        {/* 탭 내비게이션 */}
        <nav className="flex space-x-8 mb-12 border-b border-slate-900/50 pb-4">
          {['dossier', 'internal-logs', 'external-gateway', 'archive'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                activeTab === tab ? 'text-red-700 font-bold' : 'text-slate-600 hover:text-slate-400'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>

        {/* 탭 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {activeTab === 'dossier' && <Dossier />}
          {activeTab === 'internal-logs' && <InternalLogs />}
          {activeTab === 'external-gateway' && <ExternalGateway />}
          {activeTab === 'archive' && <Archive />}
        </div>

        <footer className="py-8 text-center opacity-30">
          <p className="text-[9px] tracking-[0.4em] uppercase font-mono">
            SECURE ACCESS ONLY // {currentTime} KST
          </p>
        </footer>
      </main>
    </div>
  );
}
