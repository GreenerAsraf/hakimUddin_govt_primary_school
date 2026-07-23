'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

export const NoticeTicker: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-emerald-50 px-4 py-2 text-sm border-b border-emerald-700/50 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-emerald-700/80 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-300 shrink-0 border border-amber-400/30">
          <Megaphone className="w-3.5 h-3.5 animate-bounce" />
          <span>{t.tickerLabel}</span>
        </div>
        <div className="overflow-hidden relative w-full h-6 flex items-center">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="whitespace-nowrap flex items-center gap-8 font-medium text-emerald-100"
          >
            {t.tickerItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
