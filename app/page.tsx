'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Dossier from '@/app/components/Dossier';
import InternalLogs from '@/app/components/InternalLogs';

// 경고 문구 (UNAUTHORIZED 앞에서 줄바꿈 적용)
const WARNING_LINE_1 = "ACCESS RESTRICTED. LEVEL 5 CLEARANCE REQUIRED.";
const WARNING_LINE_2 = "UNAUTHORIZED ACCESS ATTEMPTS WILL BE TRACKED AND NEUTRALIZED.";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false); // 진입 로딩 상태
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isLoadingTab, setIsLoadingTab] = useState(false);

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

  // 타자기 효과 (순차적 줄바꿈 처리)
  useEffect(() => {
    if (isAuthorized) return;
    let i = 0;
    const interval1 = setInterval(() => {
      setTypedText1(WARNING_LINE_1.slice(0, i + 1));
      i++;
      if (i === WARNING_LINE_1.length) {
        clearInterval(interval1);
        let j = 0;
        const interval2 = setInterval(() => {
          setTypedText2(WARNING_LINE_2.slice(0, j + 1));
          j++;
          if (j === WARNING_LINE_2.length) clearInterval(interval2);
        }, 40);
      }
    }, 40);
    return () => { clearInterval(interval1); };
  }, [isAuthorized]);

  const handleAuthorize = () => {
    setIsAuthenticating(true);
    // 1.5초 동안 전체 시스템 로딩 바 표시 후 진입
    setTimeout(() => {
      setIsAuthorized(true);
      setIsAuthenticating(false);
    }, 1500);
  };

  const handleTabChange = (tabId: string) => {
    if (activeTab === tabId) return;
    setIsLoadingTab(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsLoadingTab(false);
    }, 700);
  };

  // 1. 시작 화면 (경고문구 줄바꿈 및 시계)
  if (!isAuthorized && !isAuthenticating) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 p-6 font-mono">
        <div className="max-w-2xl w-full border border-red-900/30 p-10 bg-[#0a0a1a] shadow-[0_0_60px_rgba(153,27,27,0.1)] relative overflow-hidden">
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <span className="text-[9px] text-red-900/60 tracking-widest animate-pulse">● LIVE</span>
            <span className="text-[10px] text-slate-500 tracking-tighter">KST {currentTime}</span>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4">
            <h1 className="w-full text-center text-red-700 font-bold text-xs mb-8 border-b border-red-900/20 pb-4 tracking-[0.4em]">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            <div className="text-center text-slate-400 leading-7 text-[11px] mb-12 min-h-[5rem] tracking-wide uppercase">
              <p>{typedText1}</p>
              <p className="mt-2 text-red-900/80">{typedText2}
                <span className={`inline-block ml-1 w-1.5 h-3 bg-red-700 animate-pulse`} />
              </p>
            </div>
            <button onClick={handleAuthorize} className="w-full max-w-xs py-4 border border-slate-800 hover:border-red-900/50 hover:bg-red-950/20 hover:text-white transition-all duration-700 text-[10px] tracking-[0.6em] uppercase">
              ACCESS GRANTED
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 진입 로딩 화면 (액세스 클릭 후)
  if (isAuthenticating) {
    return (
      <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#050510] font-mono">
        <span className="text-red-900 text-[10px] tracking-[0.8em] mb-6 animate-pulse">AUTHENTICATING USER...</span>
        <div className="w-64 h-[1px] bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-800 animate-loading-bar" />
        </div>
        <span className="mt-4 text-[8px] text-slate-700 tracking-[0.4em]">ESTABLISHING SECURE CONNECTION TO TAEHON NODE</span>
      </div>
    );
  }

  // 3. 내부 화면 (중앙 정렬 탭 레이아웃)
  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 font-mono selection:bg-red-900 selection:text-white">
      <main className="container mx-auto px-6 py-16 max-w-4xl flex flex-col items-center">
        
        <div className="w-full mb-16 text-center">
          <Header />
        </div>

        {/* 세로형 박스 탭: 중앙 배치 및 고대비 텍스트 */}
        <nav className="w-full max-w-md grid grid-cols-1 gap-4 mb-20">
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
              className={`group relative py-5 px-8 border transition-all duration-500 text-left overflow-hidden ${
                activeTab === tab.id 
                ? 'border-red-900/60 bg-red-950/10 text-white font-bold' 
                : 'border-slate-800 bg-black/40 text-slate-400 hover:border-slate-600 hover:text-slate-100'
              }`}
            >
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[11px] tracking-[0.5em]">{tab.label}</span>
                <span className={`text-[8px] ${activeTab === tab.id ? 'text-red-600' : 'text-slate-800'}`}>0{tab.id.length}</span>
              </div>
              {activeTab === tab.id && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-700" />
              )}
            </button>
          ))}

          {/* 외부 메모리: 맨 하단에 분리 */}
          <a
            href="https://blog.naver.com/inkedwithyou"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 py-5 px-8 border border-slate-900/50 text-slate-600 hover:border-red-950/30 hover:text-red-900 transition-all text-left text-[11px] tracking-[0.5em]"
          >
            EXTERNAL MEMORY
          </a>
        </nav>

        {/* 탭 콘텐츠 영역 */}
        <div className="w-full relative">
          {isLoadingTab ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="h-[1px] w-32 bg-red-900/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-red-800 animate-loading-bar" />
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {!activeTab ? (
                <div className="text-center py-10 opacity-20">
                  <span className="text-[9px] tracking-[1em] uppercase animate-pulse">Select a module to decrypt</span>
                </div>
              ) : (
                <div className="w-full">
                  {activeTab === 'profile' && <Dossier />}
                  {activeTab === 'log' && <InternalLogs />}
                  {activeTab && !['profile', 'log'].includes(activeTab) && (
                    <div className="text-center py-32 border border-slate-900/20 bg-black/5 text-slate-700 tracking-[0.6em] text-[10px] uppercase">
                      [ {activeTab}_DATA_STREAM_OFFLINE ]
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="mt-32 py-12 text-center opacity-10">
          <p className="text-[9px] tracking-[0.5em] uppercase font-mono">
            TaehOn Node 032 // {currentTime} // SECURE_ACCESS
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
        `}</style>
      </main>
    </div>
  );
}
