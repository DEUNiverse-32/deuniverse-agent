"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ExternalGateway: React.FC = () => {
  return (
    <div className="relative py-24 flex flex-col items-center justify-center text-center">
      <div className="mb-6 font-mono text-[10px] tracking-[0.3em] uppercase text-orange-600 font-bold animate-pulse">
        CAUTION: EXTERNAL SERVER CONNECTION DETECTED.
      </div>
      
      <motion.a
        href="https://blog.naver.com/inkedwithyou"
        target="_blank"
        rel="noopener noreferrer"
        className="relative px-16 py-6 border border-slate-800 bg-transparent text-slate-400 tracking-[0.6em] font-industrial text-xl uppercase transition-all duration-700 group overflow-hidden"
        whileHover={{ scale: 1.05, borderColor: '#7f1d1d', color: '#e0e0e0' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-red-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Animated corner lines */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-800 group-hover:border-red-900 group-hover:w-full group-hover:h-full transition-all duration-700"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-800 group-hover:border-red-900 group-hover:w-full group-hover:h-full transition-all duration-700"></div>

        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          ACCESS EXTERNAL MEMORY
        </span>
      </motion.a>
    </div>
  );
};

export default ExternalGateway;