'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { teachersList, Teacher } from '@/data/translations';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Award,
  Hash,
  Sparkles,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const SPEED_MS = 3800; // time per slide

export const TeachersSlideshow: React.FC = () => {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);

  // Load custom image overrides from localStorage
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  useEffect(() => {
    try {
      const saved = localStorage.getItem('teacher_photo_overrides');
      if (saved) setOverrides(JSON.parse(saved));
    } catch {}
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % teachersList.length);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + teachersList.length) % teachersList.length);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (!isPlaying) return;

    startTimeRef.current = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = elapsedRef.current + (Date.now() - startTimeRef.current);
      const pct = Math.min((elapsed / SPEED_MS) * 100, 100);
      setProgress(pct);

      if (elapsed >= SPEED_MS) {
        nextSlide();
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, nextSlide]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      elapsedRef.current += Date.now() - startTimeRef.current;
    } else {
      setIsPlaying(true);
      startTimeRef.current = Date.now();
    }
  };

  const currentTeacher = teachersList[currentIndex];
  if (!currentTeacher) return null;

  const name = lang === 'bn' ? currentTeacher.nameBn : currentTeacher.nameEn;
  const designation = lang === 'bn' ? currentTeacher.designationBn : currentTeacher.designationEn;
  const qualification = lang === 'bn' ? currentTeacher.qualificationBn : currentTeacher.qualificationEn;
  const customImg = overrides[currentTeacher.id] ?? currentTeacher.image;

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white overflow-hidden relative border-t border-b border-emerald-800/40">
      {/* Decorative Glowing Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>{lang === 'bn' ? 'শিক্ষক পরিচিতি স্লাইডশো' : 'Faculty Spotlight'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {lang === 'bn' ? 'আমাদের দক্ষ শিক্ষকমণ্ডলী' : 'Meet Our Exceptional Faculty'}
          </h2>
        </div>

        {/* Slideshow Display Card */}
        <div className="max-w-4xl mx-auto bg-slate-900/65 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl relative">
          
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Left: Image Side with Color Gradient Accent */}
            <div className="md:col-span-5 relative aspect-square md:aspect-auto md:h-[360px] w-full bg-slate-950 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={customImg}
                    alt={name}
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Subtle colorful overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/90" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Info Side */}
            <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between h-full min-h-[300px]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {/* Designation Badge */}
                  <span className="inline-block px-3 py-1 bg-emerald-950/80 text-emerald-400 text-xs font-bold rounded-full border border-emerald-800/50">
                    {designation}
                  </span>

                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl font-black text-amber-300 tracking-tight leading-snug">
                    {name}
                  </h3>

                  {/* Education & Info Details */}
                  <div className="space-y-2.5 pt-2 text-slate-300 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span><strong>{lang === 'bn' ? 'যোগ্যতা:' : 'Qualifications:'}</strong> {qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-emerald-400" />
                      <span><strong>{lang === 'bn' ? 'পিন নম্বর:' : 'PIN Number:'}</strong> {currentTeacher.pinNumber}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50">
                      <Info className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {lang === 'bn'
                          ? 'নিচের শিক্ষকমণ্ডলী সেকশনে কার্ডে ক্লিক করে সম্পূর্ণ EMIS প্রোফাইল দেখুন।'
                          : 'Click on the card in the section below to view the full EMIS Profile.'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls and Autoplay status */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800/80">
                
                {/* Arrow navigation buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors border border-slate-700/30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors border border-slate-700/30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Pause/Play Button */}
                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600/90 text-slate-300 hover:text-white transition-colors border border-slate-700/30"
                  title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
              </div>

            </div>

          </div>

          {/* Autoplay Progress Line at bottom */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-950">
              <div
                className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
