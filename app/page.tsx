'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Dossier from '@/app/components/Dossier';
import InternalLogs from '@/app/components/InternalLogs';

const WARNING_LINE_1 = "ACCESS RESTRICTED. LEVEL 5 CLEARANCE REQUIRED.";
const WARNING_LINE_2 = "UNAUTHORIZED ACCESS ATTEMPTS WILL BE TRACKED AND NEUTRALIZED.";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isLoadingTab, setIsLoadingTab] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
    return () => clearInterval(interval1);
  }, [isAuthorized]);

  const handleAuthorize = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthorized(true);
      setIsAuthenticating(false);
    }, 1200);
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("WARNING: LEAVING SECURE NETWORK. PROCEED TO EXTERNAL MEMORY?")) {
      window.open("https://blog.naver.com/inkedwithyou", "_blank");
    }
  };

  if (!isAuthorized && !isAuthenticating) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-200 p-6 font-mono">
        <div className="max-w-2xl w-full border border-red-900/40 p-10 bg-[#0a0a1a] shadow-2xl relative">
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <span className="text-[10px] text-red-700 tracking-widest animate-pulse">● LIVE</span>
            <span className="text-[11px] text-slate-400">KST {currentTime}</span>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <h1 className="w-full text-center text-red-600 font-bold text-xs mb-8 border-b border-red-900/30 pb-4 tracking-[0.4em]">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            <div className="text-center leading-8 text-[12px] mb-12 min-h-[5rem] tracking-wider uppercase">
              <p className="text-slate-200">{typedText1}{typedText1.length < WARNING_LINE_1.length && typedText1.length > 0 && <span className="inline-block w-1.5 h-3 bg-red-700 ml-1 animate-pulse" />}</p>
              <p className="text-red-700 mt-2">{typedText2}{typedText2.length > 0 && <span className="inline-block w-1.5 h-3 bg-red-700 ml-1 animate-pulse" />}</p>
            </div>
            <button onClick={handleAuthorize} className="w-full max-w-xs py-4 border border-slate-700 text-slate-200 hover:border-red-700 hover:bg-red-900/10 transition-all text-[11px] tracking-[0.5em] uppercase">
              ACCESS GRANTED
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticating) {
    return (
      <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#050510] font-mono">
        <span className="text-red-700 text-[11px] tracking-[1em] mb-6 animate-pulse uppercase font-bold">Authenticating...</span>
        <div className="w-64 h-[2px] bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-700 animate-loading-bar" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 font-mono selection:bg-red-900">
      <main className="container mx-auto px-6 py-16 max-w-4xl flex flex-col items-center">
        
        <div className="w-full mb-16 text-center">
          <Header />
        </div>

        {!activeTab ? (
          <nav className="w-full max-w-md grid grid-cols-1 gap-4">
            {['PROFILE', 'LOG', 'REPORT', 'DEUNIVERSE', 'BOOK', 'DATA', 'ETC.'].map((label) => (
              <button
                key={label}
                onClick={() => { setIsLoadingTab(true); setTimeout(() => { setActiveTab(label.toLowerCase()); setIsLoadingTab(false); }, 600); }}
                className="py-6 px-10 border border-slate-800 bg-black/40 text-slate-300 hover:border-red-900/50 hover:text-white transition-all text-left text-[13px] tracking-[0.5em] font-bold"
              >
                {label}
              </button>
            ))}
            <button
              onClick={handleExternalLink}
              className="mt-8 py-6 px-10 border border-slate-900 text-slate-500 hover:border-red-950/40 hover:text-red-900 transition-all text-left text-[13px] tracking-[0.5em] font-bold"
            >
              EXTERNAL MEMORY
            </button>
          </nav>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={() => setActiveTab(null)}
              className="mb-12 text-[10px] text-red-900 hover:text-red-500 tracking-[0.6em] uppercase transition-colors flex items-center"
            >
              [ ← RETURN TO TERMINAL ]
            </button>
            
            <div className="relative">
              {isLoadingTab ? (
                <div className="flex justify-center py-20 animate-pulse"><div className="h-[1px] w-32 bg-red-900 animate-loading-bar" /></div>
              ) : (
                <>
                  {activeTab === 'profile' && <Dossier />}
                  {activeTab === 'log' && <InternalLogs />}
                  {!['profile', 'log'].includes(activeTab) && (
                    <div className="text-center py-32 border border-slate-900/30 text-slate-600 tracking-[0.6em] text-[11px] uppercase">
                      [ {activeTab}_MODULE_OFFLINE ]
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <footer className="mt-40 py-12 text-center opacity-40">
          <p className="text-[10px] tracking-[0.4em] uppercase text-slate-500">
            © 2026 TAEHON STRATEGY GROUP. ALL RIGHTS RESERVED. UNAUTHORIZED DUPLICATION IS A VIOLATION OF APPLICABLE LAWS.
          </p>
        </footer>
      </main>
      <style jsx global>{`
        @keyframes loading-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-loading-bar { animation: loading-bar 1.5s infinite linear; }
      `}</style>
    </div>
  );
}
