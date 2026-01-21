"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
// 보관소 지도에서 기록들을 가져오는 함수를 불러와
import { getAllPosts } from '@/lib/posts';

const InternalLogs: React.FC = () => {
  // 가짜 데이터 배열을 지우고, 실제 보관소의 서류들을 가져오게 했어
  const allPosts = getAllPosts();

  return (
    <div className="py-12 border-t border-slate-900/30">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px bg-slate-800 flex-grow opacity-20"></div>
        <h3 className="text-slate-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
          Decrypted_Internal_Logs
        </h3>
        <div className="h-px bg-slate-800 flex-grow opacity-20"></div>
      </div>

      <div className="space-y-6">
        {allPosts.map((post) => (
          <Link key={post.slug} href={`/logs/${post.slug}`} className="block group">
            <motion.div 
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-slate-900/60 bg-black/40 p-8 hover:border-red-900/40 hover:bg-red-950/5 transition-all duration-500 relative overflow-hidden"
            >
              {/* 선택 시 나타나는 좌측 강조선 */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-900/0 group-hover:bg-red-900/50 transition-all duration-500" />
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <h4 className="text-[17px] text-slate-100 font-bold group-hover:text-white transition-colors tracking-tight">
                  {post.title}
                </h4>
                <span className="text-[10px] font-mono text-slate-600 group-hover:text-red-900 transition-colors tracking-[0.2em] font-bold">
                  {post.date}
                </span>
              </div>
              
              <p className="text-[14px] text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-300 transition-colors font-medium">
                {post.description}
              </p>

              <div className="mt-8 flex justify-end">
                <span className="text-[9px] text-slate-800 group-hover:text-red-900/60 tracking-[0.4em] uppercase transition-colors font-bold">
                  Access_Log_File ↗
                </span>
              </div>
            </motion.div>
          </Link>
        ))}

        {/* 만약 보관소가 비어있을 때를 대비한 안전장치 */}
        {allPosts.length === 0 && (
          <div className="text-center py-24 border border-dashed border-slate-900/30 opacity-20">
            <span className="text-[11px] tracking-[0.6em] uppercase">No logs decrypted in this sector</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalLogs;
