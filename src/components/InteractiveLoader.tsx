'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface InteractiveLoaderProps {
  onComplete: () => void;
}

export const InteractiveLoader: React.FC<InteractiveLoaderProps> = ({ onComplete }) => {
  const { lang, t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate natural load variation
      const increment = Math.floor(Math.random() * 8) + 2;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const schoolNameWords = t.schoolName.split(' ');

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-radial from-slate-900 via-slate-950 to-black text-white p-6 overflow-hidden select-none">
      
      {/* Background abstract layout */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-2xl w-full flex flex-col items-center justify-between h-[60vh] md:h-[50vh] z-10">
        
        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>{lang === 'bn' ? 'স্বাগতম' : 'Welcome'}</span>
        </motion.div>

        {/* Center: Logo & Animated School Name */}
        <div className="flex flex-col items-center space-y-8 my-auto">
          
          {/* Logo Container with Rotator Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
          >
            {/* Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40"
            />
            {/* Pulsing Glow Ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute -inset-2 rounded-full bg-emerald-500/10 blur-md"
            />
            
            {/* Logo Image */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white p-2 border-4 border-emerald-700 shadow-2xl flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="School Logo"
                fill
                priority
                className="object-contain p-1"
              />
            </div>
          </motion.div>

          {/* Staggered School Name Animation */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-snug flex flex-wrap justify-center gap-x-2.5">
              {schoolNameWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                  className="bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300 bg-clip-text text-transparent drop-shadow-sm font-bold"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle / ESTD */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xs font-semibold text-slate-400 tracking-wider"
            >
              {t.subTitle}
            </motion.p>
          </div>

        </div>

        {/* Bottom Interactive Area: Progress Bar OR Enter Button */}
        <div className="w-full max-w-sm flex flex-col items-center space-y-4">
          <AnimatePresence mode="wait">
            {!isLoaded ? (
              // Loading Progress
              <motion.div
                key="loading-progress"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full space-y-2"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                  <span>{lang === 'bn' ? 'লোড হচ্ছে...' : 'Loading Campus...'}</span>
                  <span className="text-emerald-400 font-mono">{progress}%</span>
                </div>
                {/* Glowing progress track */}
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-500 rounded-full shadow-lg"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ) : (
              // Enter Button (Interactive!)
              <motion.button
                key="enter-button"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                onClick={onComplete}
                className="group w-full max-w-xs py-3.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-102 transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-400/30 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'ক্যাম্পাসে প্রবেশ করুন' : 'Enter Campus'}</span>
                <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
