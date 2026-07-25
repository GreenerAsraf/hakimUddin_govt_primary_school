'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Award, Users, BookCheck, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 overflow-hidden py-12 lg:py-20">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
            {/* Left Text Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 order-2 lg:order-1"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.hero.badge}</span>
                </div>
              </div>

              {/* School Name (Reduced Size & Animated Pill) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 bg-white/90 border border-emerald-200/90 px-4 py-2 rounded-2xl shadow-sm w-full sm:w-auto"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                <span className="text-xs sm:text-base font-extrabold text-emerald-800 tracking-tight">
                  {t.schoolName}
                </span>
              </motion.div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-emerald-800 via-green-700 to-amber-600 bg-clip-text text-transparent">
                  {t.hero.title}
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
                {t.hero.desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#routine"
                  className="px-6 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold shadow-lg shadow-emerald-700/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Calendar className="w-5 h-5 text-amber-300" />
                  <span>{t.hero.btnRoutine}</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="px-6 py-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <span>{t.hero.btnContact}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </motion.a>
              </div>

              {/* Quick Stats Grid with Framer Motion animations */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-8 border-t border-slate-200/80">
                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700 block">
                    {t.hero.stats.students}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                    {t.hero.stats.studentsLabel}
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700 block">
                    {t.hero.stats.teachers}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                    {t.hero.stats.teachersLabel}
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700 block">
                    {t.hero.stats.classrooms}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                    {t.hero.stats.classroomsLabel}
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-600 block">
                    {t.hero.stats.passRate}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                    {t.hero.stats.passRateLabel}
                  </span>
                </motion.div>
              </div>

            </motion.div>

            {/* Right Banner Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative order-1 lg:order-2"
            >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
              <Image
                src="/images/school_banner.jpg"
                alt="Ghagra Khilmogal Hakim Uddin Primary School"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-3 py-1 bg-emerald-600 text-xs font-bold rounded-full mb-1">
                  ক্যাম্পাস
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয় ভবন
                </p>
              </div>
            </div>

            {/* Floating Highlight Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">প্রাথমিক শিক্ষা পদক</p>
                <p className="text-sm font-bold text-slate-800">সেরা পরিবেশ পুরস্কারপ্রাপ্ত</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
