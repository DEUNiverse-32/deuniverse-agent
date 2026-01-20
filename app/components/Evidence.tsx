"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface PolaroidProps {
  src: string;
  caption: string;
  rotation: number;
  delay: number;
}

const Polaroid: React.FC<PolaroidProps> = ({ src, caption, rotation, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotate: rotation,
        transition: { delay, duration: 0.8, type: 'spring', damping: 12 } 
      }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.05, 
        zIndex: 50, 
        transition: { duration: 0.4 } 
      }}
      className="bg-[#e2e2e2] p-3 pb-10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] inline-block cursor-pointer group relative"
    >
      <div className="w-full aspect-square overflow-hidden bg-black">
        <img 
          src={src} 
          alt={caption} 
          className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
        />
      </div>
      <div className="mt-4 text-center">
        <p className="font-mono text-[9px] text-zinc-800 font-bold uppercase tracking-widest">{caption}</p>
        <div className="w-4 h-[1px] bg-zinc-400 mx-auto mt-1"></div>
      </div>
    </motion.div>
  );
};

const Evidence: React.FC = () => {
  const items = [
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400', caption: 'Operational Site A', rotation: -3 },
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400', caption: 'Network Core', rotation: 2 },
    { src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400', caption: 'Log Analysis', rotation: -4 },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400', caption: 'Sector 7 Secure', rotation: 5 },
    { src: 'https://images.unsplash.com/photo-1510511459019-5dee19393f3c?auto=format&fit=crop&q=80&w=400', caption: 'Cipher Stream', rotation: -2 },
    { src: 'https://images.unsplash.com/photo-1496116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400', caption: 'Target Identity', rotation: 3 },
  ];

  return (
    <div className="relative">
      <div className="mb-16 border-l-4 border-red-900 pl-8">
        <h2 className="text-5xl font-industrial font-bold tracking-[0.2em] text-white uppercase leading-none">EVIDENCE</h2>
        <p className="text-[10px] text-slate-500 font-mono tracking-[0.4em] uppercase mt-2">Classified Visual Records</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 py-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-center items-center">
            <Polaroid 
              src={item.src} 
              caption={item.caption} 
              rotation={item.rotation} 
              delay={idx * 0.1} 
            />
          </div>
        ))}
      </div>

      <div className="mt-24 text-center opacity-20">
        <p className="font-mono text-[8px] tracking-[1em] uppercase">Security Breach Detected - Auto Lockdown Protocol Engaged</p>
      </div>
    </div>
  );
};

export default Evidence;
