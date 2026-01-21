'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Dossier from '@/app/components/Dossier';
import InternalLogs from '@/app/components/InternalLogs';

// 아직 컴포넌트 파일이 없는 탭들을 위한 임시 화면
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-32 border border-slate-900 bg-black/20 font-mono">
    <span className="text-red-900/50 animate-pulse mb-4">● ACCESSING_DATA...</span>
    <h3 className="text-slate-600 tracking-[0.4em] uppercase text-xs">[ {title} : CLASSIFIED ]</h3>
  </div>
);

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // 보안 승인 로직 (기존과 동일)
  const handleAuthorize = () => setIsAuthorized(true);

  if (!isAuthorized) {
    // 보안 게이트 화면 (생략 가능, 기존 코드 유지)
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 font-mono">
        <button onClick={handleAuthorize} className="px-10 py-4 border border-red-900 text-red-700 tracking-[0.5em] hover:bg-red-900 hover:text-white transition-all">
          ACCESS GRANTED
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 font-mono selection:bg-red-900 selection:text-white">
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* 상단 헤더 섹션 */}
        <Header />

        {/* 탭 내비게이션 섹션 */}
        <nav className="flex flex-wrap gap-x-8 gap-y-4 my-16 border-b border-slate-900/50 pb-6 justify-center md:justify-start">
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
              className={`text-[10px] tracking-[0.3em] transition-all duration-300 ${
                activeTab === tab.id 
                ? 'text-red-700 font-bold border-b border-red-700 pb-1' 
                : 'text-slate-600 hover:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
          
          {/* 외부 메모리 (블로그 링크) */}
          <a
            href="https://blog.naver.com/inkedwithyou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.3em] text-slate-600 hover:text-red-900 transition-colors flex items-center"
          >
            EXTERNAL MEMORY <span className="ml-1 text-[8px]">↗</span>
          </a>
        </nav>

        {/* 탭 콘텐츠 영역 */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
          {activeTab === 'profile' && <Dossier />}
          {activeTab === 'log' && <InternalLogs />}
          {activeTab === 'report' && <Placeholder title="REPORT" />}
          {activeTab === 'deuniverse' && <Placeholder title="DEUNIVERSE" />}
          {activeTab === 'book' && <Placeholder title="BOOK" />}
          {activeTab === 'data' && <Placeholder title="DATA" />}
          {activeTab === 'etc' && <Placeholder title="ETC." />}
        </div>
      </main>
    </div>
  );
}
