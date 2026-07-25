'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { dailyActivitiesList, DailyActivity } from '@/data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, BookOpen, Utensils, Laptop, Trophy, Palette, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

const iconMap: Record<string, React.ReactNode> = {
  Sun: <Sun className="w-6 h-6 text-amber-500" />,
  BookOpen: <BookOpen className="w-6 h-6 text-emerald-600" />,
  Utensils: <Utensils className="w-6 h-6 text-orange-500" />,
  Laptop: <Laptop className="w-6 h-6 text-blue-600" />,
  Trophy: <Trophy className="w-6 h-6 text-amber-600" />,
  Palette: <Palette className="w-6 h-6 text-purple-600" />,
};

const categoryImageMap: Record<string, string> = {
  assembly: "/images/assembly.jpg",
  class: "/images/classroom.jpg",
  meal: "/images/assembly.jpg",
  sports: "/images/sports.jpg",
  culture: "/images/classroom.jpg"
};

export const DailyActivities: React.FC = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const filteredList = filter === 'all'
    ? dailyActivitiesList
    : dailyActivitiesList.filter(item => item.category === filter);

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="routine" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>দৈনন্দিন রুটিন & 活動</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.activities.title}
          </h2>
          <p className="text-base text-slate-600 font-medium">
            {t.activities.subTitle}
          </p>

          {/* Category Filters */}
          <div className="w-full overflow-x-auto flex md:justify-center scrollbar-none pb-2 pt-4">
            <div className="flex flex-nowrap md:flex-wrap gap-2 px-4 md:px-0">
              {[
                { id: 'all', label: t.activities.filterAll },
                { id: 'assembly', label: t.activities.filterAssembly },
                { id: 'class', label: t.activities.filterClass },
                { id: 'meal', label: t.activities.filterMeal },
                { id: 'sports', label: t.activities.filterSports },
                { id: 'culture', label: t.activities.filterCulture },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`whitespace-nowrap px-4 py-2 text-xs md:text-sm font-bold rounded-full transition-all flex-shrink-0 ${
                    filter === tab.id
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredList.map((act, index) => {
              const title = lang === 'bn' ? act.titleBn : act.titleEn;
              const desc = lang === 'bn' ? act.descBn : act.descEn;
              const time = lang === 'bn' ? act.timeBn : act.time;
              const bgImg = categoryImageMap[act.category] || "/images/classroom.jpg";

              return (
                <motion.div
                  key={act.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={triggerCelebration}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top Image & Badge */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={bgImg}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                      
                      {/* Time Badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-slate-800 flex items-center gap-1.5 shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{time}</span>
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-3 right-3 bg-white p-2.5 rounded-2xl shadow-md border border-slate-100">
                        {iconMap[act.icon]}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 leading-snug">
                        {title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Footer hint */}
                  <div className="px-6 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>শিক্ষার্থী টিপস</span>
                    </span>
                    <span>সময়মতো উপস্থিতি কাম্য</span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
