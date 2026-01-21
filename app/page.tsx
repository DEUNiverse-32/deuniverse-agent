'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Dossier from '@/app/components/Dossier';
import InternalLogs from '@/app/components/InternalLogs';

// 간결해진 경고 문구
const WARNING_MESSAGE = "ACCESS RESTRICTED. LEVEL 5 CLEARANCE REQUIRED. UNAUTHORIZED ACCESS WILL BE TRACKED AND NEUTRALIZED.";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  // 초기 상태를 null로 설정하여 처음엔 탭 콘텐츠가 보이지 않게 함
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // KST 시간 업데이트
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

  // 타자기 효과 (50ms 속도 유지)
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

  // 1. 시작 화면 (보안 게이트 복구)
  if (!isAuthorized) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 p-6 font-mono ${isGlitching ? 'animate-glitch' : ''}`}>
        {isGlitching && <div className="absolute inset-0 z-[110] bg-red-900/20 mix-blend-overlay animate-noise pointer-events-none" />}
        
        <div className="max-w-2xl w-full border border-red-900/30 p-10 bg-[#0a0a1a] shadow-[0_0_60px_rgba(153,27,27,0.15)] relative overflow-hidden">
          {/* 우측 상단 KST 시계 복구 */}
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <span className="text-[9px] text-red-900/60 tracking-widest animate-pulse">● LIVE</span>
            <span className="text-[10px] text-slate-500 tracking-tighter">KST {currentTime}</span>
          </div>

          <div className="relative z-10 flex flex-col items-center mt-4">
            <h1 className="w-full text-center text-red-700 font-bold text-sm md:text-base mb-8 tracking-[0.4em] border-b border-red-900/20 pb-4 whitespace-nowrap">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            <p className="text-center text-slate-400 leading-6 text-[11px] mb-12 break-words opacity-90 min-h-[5rem] font-light tracking-wide uppercase">
              {typedText}
              <span className={`inline-block ml-1 w-1.5 h-3 bg-red-700 ${typedText.length < WARNING_MESSAGE.length ? 'animate-pulse' : 'hidden'}`}></span>
            </p>
            <button onClick={handleAuthorize} className="w-full max-w-xs py-4 border border-slate-800 hover:border-red-900/50 hover:bg-red-950/20 hover:text-white transition-all duration-700 text-[10px] tracking-[0.6em] uppercase">
              ACCESS GRANTED
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 내부 화면 (탭만 가득한 레이아웃)
  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 relative selection:bg-red-900 selection:text-white font-mono">
      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* 탭 내비게이션 (중앙 배치) */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-6 my-20 border-y border-slate-900/30 py-10">
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
              onClick={() => setActiveTab(tab.id)}
              className={`text-[11px] tracking-[0.4em] transition-all duration-500 ${
                activeTab === tab.id 
                ? 'text-red-700 font-bold scale-110' 
                : 'text-slate-600 hover:text-slate-300'
              }`}
            >
              [{tab.label}]
            </button>
          ))}
          <a
            href="https://blog.naver.com/inkedwithyou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.4em] text-slate-600 hover:text-red-900 transition-colors"
          >
            [EXTERNAL MEMORY ↗]
          </a>
        </nav>

        {/* 선택된 탭이 없을 때 보여줄 안내 문구 */}
        {!activeTab && (
          <div className="flex-1 flex items-center justify-center opacity-20">
            <span className="text-[10px] tracking-[1em] uppercase animate-pulse">Select a module to decrypt</span>
          </div>
        )}

        {/* 탭 콘텐츠 영역 */}
        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {activeTab === 'profile' && <Dossier />}
          {activeTab === 'log' && <InternalLogs />}
          {activeTab === 'report' && <div className="text-center py-20 text-slate-800">[ REPORT_MODULE_OFFLINE ]</div>}
          {activeTab === 'deuniverse' && <div className="text-center py-20 text-slate-800">[ SYSTEM_MAIN_DEUNIVERSE ]</div>}
          {activeTab === 'book' && <div className="text-center py-20 text-slate-800">[ ARCHIVE_NOT_FOUND ]</div>}
          {activeTab === 'data' && <div className="text-center py-20 text-slate-800">[ DATA_STREAM_RESTRICTED ]</div>}
          {activeTab === 'etc' && <div className="text-center py-20 text-slate-800">[ MISC_DATA ]</div>}
        </div>

        <footer className="py-12 text-center opacity-10">
          <p className="text-[9px] tracking-[0.5em] uppercase">Authorized Access Only // {currentTime}</p>
        </footer>
      </main>
    </div>
  );
}
