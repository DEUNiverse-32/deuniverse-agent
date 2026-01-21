'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dossier from './components/Dossier';
import InternalLogs from './components/InternalLogs';
import ExternalGateway from './components/ExternalGateway';
import Archive from './components/Archive';

// 출력할 경고 문구 전체 내용
const WARNING_MESSAGE = "해당 페이지는 최상위 등급 보안 문서입니다. 모든 기록은 실시간으로 암호화되어 관리되며, 승인되지 않은 접근은 즉시 추적 및 격리됩니다.";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [typedText, setTypedText] = useState(''); // 타자기로 친 텍스트가 저장될 곳

  // 보안 승인 처리 함수
  const handleAuthorize = () => {
    setIsAuthorized(true);
  };

  // 타자기 효과 구현 (useEffect)
  useEffect(() => {
    // 이미 승인되었거나 텍스트가 다 출력되었으면 실행하지 않음
    if (isAuthorized || typedText.length === WARNING_MESSAGE.length) return;

    let index = 0;
    const intervalId = setInterval(() => {
      // 한 글자씩 더해서 상태 업데이트
      setTypedText((prev) => WARNING_MESSAGE.slice(0, index + 1));
      index++;

      // 문장 끝에 도달하면 타이머 정지
      if (index === WARNING_MESSAGE.length) {
        clearInterval(intervalId);
      }
    }, 50); // 50ms마다 한 글자씩 (속도 조절 가능)

    // 컴포넌트가 사라지거나 재실행될 때 타이머 정리 (메모리 누수 방지)
    return () => clearInterval(intervalId);
  }, [isAuthorized]); // isAuthorized가 변할 때만 실행 체크


  // 1. 보안 경고 화면 (승인 전)
  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-slate-300 p-6 font-mono">
        <div className="max-w-md w-full border border-red-900/30 p-8 bg-[#0a0a1a] shadow-[0_0_50px_rgba(153,27,27,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent pointer-events-none h-2 w-full animate-pulse"></div>
          
          <div className="relative z-10">
            <h1 className="text-red-700 font-bold text-lg mb-6 tracking-[0.2em] border-b border-red-900/20 pb-2 animate-pulse">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            
            {/* 타자기 효과가 적용되는 영역 */}
            <p className="text-slate-400 leading-relaxed text-xs mb-8 break-keep opacity-80 min-h-[4rem]">
              {typedText}
              {/* 문장이 다 출력되기 전까지 깜빡이는 커서 표시 */}
              <span className={`inline-block ml-1 w-1 h-3 bg-red-900/70 ${typedText.length < WARNING_MESSAGE.length ? 'animate-pulse' : 'hidden'}`}></span>
            </p>
            
            <button
              onClick={handleAuthorize}
              // 버튼 텍스트 변경: ACCESS GRANTED
              className="w-full py-4 border border-slate-800 hover:border-red-900/50 hover:bg-red-950/20 hover:text-white transition-all duration-500 text-[10px] tracking-[0.5em] uppercase group"
            >
              <span className="group-hover:animate-pulse">ACCESS GRANTED</span>
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-[9px] text-slate-700 tracking-[0.3em] uppercase">
          DEUNIVERSE SECURE GATEWAY v2.0.5 // IP_LOGGING_ACTIVE
        </div>
      </div>
    );
  }

  // 2. 메인 페이지 내용 (승인 후) - 기존과 동일
  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 relative selection:bg-red-900 selection:text-white overflow-x-hidden">
      <main className="container mx-auto px-6 py-24 max-w-5xl relative z-10 animate-in fade-in duration-1000">
        <Header />
        
        <div className="space-y-48 mt-32">
          <section id="dossier">
            <Dossier />
          </section>

          <section id="internal-logs">
            <InternalLogs />
          </section>

          <section id="external-gateway">
            <ExternalGateway />
          </section>

          <section id="archive">
            <Archive />
          </section>
        </div>

        <footer className="mt-64 mb-16 text-center border-t border-slate-900 pt-12">
          <p className="text-[10px] text-slate-600 tracking-[0.4em] uppercase font-mono">
            © 2024 DEUNiverse. ALL RIGHTS RESERVED. UNAUTHORIZED DECLASSIFICATION PROHIBITED.
          </p>
        </footer>
      </main>
    </div>
  );
}
