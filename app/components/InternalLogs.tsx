// app/components/InternalLogs.tsx

"use client";

import React from 'react';

const InternalLogs: React.FC = () => {
  return (
    <div className="py-20 text-center">
      <h3 className="text-red-500 font-bold">시스템 테스트 중...</h3>
      <p className="text-slate-500 mt-4">이 글자가 보이면 컴포넌트는 정상입니다.</p>
    </div>
  );
};

export default InternalLogs;
