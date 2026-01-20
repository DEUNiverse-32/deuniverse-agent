"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const recentPosts = [
  { slug: 'first-log', title: 'System_Initialization', date: '2025.05.31', summary: 'Neural link established. Welcome to DEUNiverse.' },
  { slug: 'test-log', title: 'Memory_Fragment', date: '2024.01.15', summary: 'Recovering corrupted data sectors...' },
];

const InternalLogs: React.FC = () => {
  return (
    <div className="py-12 border-t border-slate-900/50">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-slate-800 flex-grow"></div>
        <h3 className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase">Internal Logs</h3>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </div>

      <div className="space-y-6">
        {recentPosts.map((post) => (
          <Link key={post.slug} href={`/logs/${post.slug}`} className="block group">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border border-slate-800/50 bg-black/20 p-6 hover:border-slate-600 hover:bg-slate-900/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <h4 className="text-xl text-slate-200 font-bold group-hover:text-white transition-colors">
                  {post.title}
                </h4>
                <span className="text-xs font-mono text-slate-600 group-hover:text-slate-400">
                  {post.date}
                </span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-400">
                {post.summary}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLogs;