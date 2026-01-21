'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Dossier from '@/app/components/Dossier';
import InternalLogs from '@/app/components/InternalLogs';

const WARNING_MESSAGE = "ACCESS RESTRICTED. LEVEL 5 CLEARANCE REQUIRED. UNAUTHORIZED ACCESS WILL BE TRACKED AND NEUTRALIZED.";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isLoadingTab, setIsLoadingTab] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Seoul',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAuthorized || typedText.length === WARNING_MESSAGE.length) return;
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(WARNING_MESSAGE.slice(0, index + 1));
      index++;
      if (index === WARNING_MESSAGE.length) clearInterval(intervalId);
    }, 50);
    return () => clearInterval(intervalId);
  }, [isAuthorized]);

  const handleAuthorize = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsAuthorized(true);
      setIsGlitching(false);
    }, 500);
  };

  const handleTabChange = (tabId: string) => {
    if (activeTab === tabId) return;
    setIsLoadingTab(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsLoadingTab(false);
    }, 800);
  };

  if (!isAuthorized) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 p-6 font-mono ${isGlitching ? 'animate-glitch' : ''}`}>
        {isGlitching && <div className="absolute inset-0 z-[110] bg-red-900/20 mix-blend-overlay animate-noise pointer-events-none" />}
        <div className="max-w-2xl w-full border border-red-900/30 p-10 bg-[#0a0a1a] shadow-[0_0_60px_rgba(153,27,27,0.15)] relative overflow-hidden text-center">
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <span className="text-[9px] text-red-900/60 tracking-widest animate-pulse">● LIVE</span>
            <span className="text-[10px] text-slate-500 tracking-tighter">KST {currentTime}</span>
          </div>
          <h1 className="w-full text-red-700 font-bold text-sm mb-8 tracking-[0.4em] border-b border-red-900/20 pb-4 uppercase">
            [ TERMINAL ACCESS RESTRICTED ]
          </h1>
          <p className="text-slate-400 leading-6 text-[11px] mb-12 break-words opacity-90 min-h-[5rem] font-light tracking-wide uppercase">
            {typedText}
            <span className={`inline-block ml-1 w-1.5 h-3 bg-red-700 ${typedText.length < WARNING_MESSAGE.length ? 'animate-pulse' : 'hidden'}`}></span>
          </p>
          <button onClick={handleAuthorize} className="w-full max-w-xs py-4 border border-slate-800 hover:border-red-900/50 hover:bg-red-950/20 hover:text-white transition-all duration-700 text-[10px] tracking-[0.6em] uppercase">
            ACCESS GRANTED
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 relative selection:bg-red-900 selection:text-white font-mono">
      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 flex flex-col md:flex-row gap-12 min-h-[80vh]">
        
        {/* 탭 내비게이션: 세로형 박스 레이아웃 */}
        <nav className="w-full md:w-64 flex flex-col gap-4 py-8">
          <div className="mb-8">
            <Header />
          </div>
          
          {[
            { id: 'profile', label: 'PROFILE' },
            { id: 'log', label: 'LOG' },
            { id: 'report', label: 'REPORT' },
            { id: 'deuniverse', label: 'DEUNIVERSE' },
            { id: 'book', label: 'BOOK' },
            { id: 'data', label: 'DATA' },
            { id: 'etc', label: 'ETC.' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`text-[10px] tracking-[0.3em] py-4 px-6 border transition-all duration-500 text-left ${
                activeTab === tab.id 
                ? 'text-red-700 font-bold border-red-900/50 bg-red-950/10' 
                : 'text-slate-600 border-slate-900/50 hover:border-slate-700 hover:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* 외부 메모리: 화살표 제거 및 맨 하단 배치 */}
          <div className="mt-auto pt-8">
            <a
              href="
