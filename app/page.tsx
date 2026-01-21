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

  // 1. 보안 게이트 화면 (KST 시간 및 경고 문구 복구)
  if (!isAuthorized) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 p-6 font-mono ${isGlitching ? 'animate-glitch' : ''}`}>
        {isGlitching && <div className="absolute inset-0 z-[110] bg-red-900/20 mix-blend-overlay animate-noise pointer-events-none" />}
        <div className="max-w-2xl w-full border border-red-900/30 p-10 bg-[#0a0a1a] shadow-[0_0_60px_rgba(153,27,27,0.15)] relative overflow-hidden">
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <span className="text-[9px] text-red-900/60 tracking-widest animate-pulse">● LIVE</span>
            <span className="text-[10px] text-slate-500 tracking-tighter">KST {currentTime}</span>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4">
            <h1 className="w-full text-center text-red-700 font-bold text-sm md:text-base mb-8 border-b border-red-900/20 pb-4 tracking-[0.4em]">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            <p className="text-center text-slate-400 leading-6 text-[11px] mb-12 min-h-[5rem] tracking-wide uppercase">
              {typedText}
              <span className={`inline-block ml-1 w-1.5 h-3 bg-red-700 ${typedText.length < WARNING_MESSAGE.length ? 'animate-pulse' : ''}`} />
            </p>
            <button onClick={handleAuthorize} className="w-full max-w-xs py-4 border border-slate-800 hover:border-red-900/50 hover:bg-red-950/20 hover:text-white transition-all duration-700 text-[10px] tracking-[0.6em] uppercase">
              ACCESS GRANTED
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 내부 메인 화면 (세로형 박스 탭 레이아웃)
  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 relative selection:bg-red-900 selection:text-white font-mono">
      <main className="container mx-auto px-6 py-12 max-w-6xl relative z-10 flex flex-col md:flex-row gap-16 min-h-[90vh]">
        
        {/* 사이드바 내비게이션 */}
        <nav className="w-full md:w-72 flex flex-col gap-3 py-4 shrink-0">
          <div className="mb-10 px-2">
            <Header />
          </div>
          
          <div className="flex flex-col gap-3 flex-1">
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
                className={`text-[10px] tracking-[0.4em] py-5 px-6 border transition-all duration-500 text-left ${
                  activeTab === tab.id 
                  ? 'text-red-700 font-bold border-red-900/40 bg-red-950/5 shadow-[0_0_15px_rgba(153,27,27,0.05)]' 
                  : 'text-slate-600 border-slate-900/30 hover:border-slate-800 hover:text-slate-400'
                }`}
              >
                [{tab.label}]
              </button>
            ))}
          </div>

          {/* 외부 메모리: 화살표 제거 및 하단 배치 */}
          <div className="mt-12">
            <a
              href="https://blog.naver.com/inkedwithyou"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10px] tracking-[0.4em] py-5 px-6 border border-slate-900/30 text-slate-700 hover:text-red-900 hover:border-red-900/20 transition-all text-left"
            >
              EXTERNAL MEMORY
            </a>
          </div>
        </nav>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 relative min-h-[500px]">
          {isLoadingTab ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
              <span className="text-red-900/60 text-[10px] tracking-[0.6em] mb-6 uppercase">Decrypting Module...</span>
              <div className="h-[1px] w-40 bg-red-900/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-red-800 animate-loading-bar" />
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-1000 h-full">
              {!activeTab ? (
                <div className="flex flex-col items-center justify-center h-full py-32 opacity-10">
                  <span className="text-[10px] tracking-[1.5em] uppercase mb-4">System Idling</span>
                  <span className="text-[8px] tracking-[0.4em] uppercase animate-pulse">Select a restricted module from the sidebar</span>
                </div>
              ) : (
                <div className="w-full">
                  {activeTab === 'profile' && <Dossier />}
                  {activeTab === 'log' && <InternalLogs />}
                  {activeTab && !['profile', 'log'].includes(activeTab) && (
                    <div className="text-center py-40 border border-slate-900/20 bg-black/5 text-slate-800 tracking-[0.6em] text-[10px] uppercase">
                      [ {activeTab}_DATA_STREAM_OFFLINE ]
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center opacity-10">
        <p className="text-[9px] tracking-[0.5em] uppercase font-mono">
          TaehOn Node 032 // {currentTime} // SECURE_ACCESS_ESTABLISHED
        </p>
      </footer>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-glitch { animation: glitch 0.15s linear infinite; }
      `}</style>
    </div>
  );
}
