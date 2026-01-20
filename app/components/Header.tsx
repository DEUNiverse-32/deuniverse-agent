"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Adjust to KST (UTC+9)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const kstTime = new Date(utc + (3600000 * 9));
      
      const yyyy = kstTime.getFullYear();
      const mm = String(kstTime.getMonth() + 1).padStart(2, '0');
      const dd = String(kstTime.getDate()).padStart(2, '0');
      const hh = String(kstTime.getHours()).padStart(2, '0');
      const min = String(kstTime.getMinutes()).padStart(2, '0');
      const ss = String(kstTime.getSeconds()).padStart(2, '0');
      
      setTime(`${yyyy}. ${mm}. ${dd}. ${hh}:${min}:${ss}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center space-y-4 py-8"
    >
      <div className="relative group">
        <h1 className="text-7xl md:text-9xl font-industrial font-bold tracking-tighter text-white leading-none uppercase">
          DEUNiverse
        </h1>
        <motion.div 
          className="absolute -bottom-1 left-0 h-[3px] bg-red-900/60"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 2, ease: "circOut" }}
        />
      </div>
      
      <div className="font-mono text-lg md:text-xl tracking-[0.4em] text-slate-500 font-light bg-black/40 px-6 py-2 border border-slate-800">
        {time}
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-700 animate-pulse"></div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-red-900 font-bold opacity-80">Terminal Secure</span>
      </div>
    </motion.header>
  );
};

export default Header;