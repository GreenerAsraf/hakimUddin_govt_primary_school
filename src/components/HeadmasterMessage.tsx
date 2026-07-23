'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Quote, UserCheck } from 'lucide-react';
import Image from 'next/image';

export const HeadmasterMessage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-emerald-900 text-white relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950/60 rounded-3xl p-8 md:p-12 border border-emerald-700/50 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Headmaster Image Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-amber-400/80 shadow-xl mb-4">
                <Image
                  src="/images/classroom.jpg"
                  alt={t.headmaster.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-amber-300">{t.headmaster.name}</h3>
              <p className="text-xs text-emerald-200 font-medium max-w-xs">{t.headmaster.designation}</p>
            </div>

            {/* Message Body */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t.headmaster.badge}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
                "{t.headmaster.title}"
              </h2>

              <div className="relative">
                <Quote className="w-12 h-12 text-emerald-700/40 absolute -top-4 -left-4 pointer-events-none" />
                <p className="text-emerald-100 text-base md:text-lg leading-relaxed relative z-10 italic">
                  {t.headmaster.message}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয় পরিচালনা পর্ষদ</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
