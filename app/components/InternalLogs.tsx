"use client";
// app/components/InternalLogs.tsx

const InternalLogs: React.FC = () => {
  const allPosts = getAllPosts();

  console.log("보관소에서 가져온 기록들:", allPosts);

  return (
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
// 중앙 보관소에서 모든 기록을 가져오는 함수를 불러와
import { getAllPosts } from '@/lib/posts';

const InternalLogs: React.FC = () => {
  // 수동으로 적었던 recentPosts 대신, 실제 데이터를 가져와
  const allPosts = getAllPosts();

  return (
    <div className="py-12 border-t border-slate-900/30">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px bg-slate-800 flex-grow opacity-30"></div>
        <h3 className="text-slate-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
          Decrypted_Internal_Logs
        </h3>
        <div className="h-px bg-slate-800 flex-grow opacity-30"></div>
      </div>

      <div className="space-y-6">
        {allPosts.map((post) => (
          <Link key={post.slug} href={`/logs/${post.slug}`} className="block group">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="border border-slate-900 bg-black/40 p-8 hover:border-red-900/40 hover:bg-red-950/5 transition-all duration-500 relative overflow-hidden"
            >
              {/* 장식용 선: 선택 시에만 붉게 강조됨 */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-900/0 group-hover:bg-red-900/50 transition-all duration-500" />
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <h4 className="text-xl text-slate-200 font-bold group-hover:text-white transition-colors tracking-tight">
                  {post.title}
                </h4>
                <span className="text-[10px] font-mono text-slate-600 group-hover:text-red-900 transition-colors tracking-widest font-bold">
                  [{post.date}]
                </span>
              </div>
              
              {/* description 필드를 사용하여 요약을 보여줌 */}
              <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-400 font-medium">
                {post.description}
              </p>

              <div className="mt-6 flex justify-end">
                <span className="text-[9px] text-slate-700 group-hover:text-red-900/60 tracking-[0.3em] uppercase transition-colors">
                  Access_Log_File ↗
                </span>
              </div>
            </motion.div>
          </Link>
        ))}

        {allPosts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-900 opacity-20">
            <span className="text-[10px] tracking-[0.5em] uppercase">No logs decrypted in this sector</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalLogs;
  );
};
