'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X, Camera, Clock } from 'lucide-react';
import Image from 'next/image';

interface SlideItem {
  id: string;
  src: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  categoryBn: string;
  categoryEn: string;
}

const slides: SlideItem[] = [
  {
    id: 's1',
    src: '/images/school_banner.jpg',
    titleBn: 'প্রধান তোরণ ও উদ্যান',
    titleEn: 'Main Entrance & School Garden',
    descBn: 'বিদ্যালয়ের প্রধান বাগান ও শহীদ মিনার সংলগ্ন সবুজ ক্যাম্পাস প্রাঙ্গণ।',
    descEn: 'The beautiful green campus premises near the main garden and Shaheed Minar.',
    categoryBn: 'ক্যাম্পাস',
    categoryEn: 'Campus'
  },
  {
    id: 's2',
    src: '/images/front-voban-1.jpeg',
    titleBn: 'বিদ্যালয় ভবন (সম্মুখ দৃশ্য ১)',
    titleEn: 'School Building (Front View 1)',
    descBn: 'সুসজ্জিত দোতলা মূল একাডেমিক ভবন ও খেলার মাঠ।',
    descEn: 'The decorated two-story main academic building and playground.',
    categoryBn: 'স্থাপনা',
    categoryEn: 'Infrastructure'
  },
  {
    id: 's3',
    src: '/images/front-voban-2.jpeg',
    titleBn: 'বিদ্যালয় ভবন (সম্মুখ দৃশ্য ২)',
    titleEn: 'School Building (Front View 2)',
    descBn: 'সবুজ গাছপালায় ঘেরা বিদ্যালয়ের সম্মুখভাগ ও যাতায়াতের রাস্তা।',
    descEn: 'The school facade surrounded by lush greenery and accessible pathway.',
    categoryBn: 'স্থাপনা',
    categoryEn: 'Infrastructure'
  },
  {
    id: 's4',
    src: '/images/back-voban-1.jpeg',
    titleBn: 'ভবনের পেছনের অংশ ও বাগান ১',
    titleEn: 'Building Rear & Garden 1',
    descBn: 'ভবনের পেছনের মনোরম প্রাকৃতিক পরিবেশ ও ফুলের বাগান।',
    descEn: 'The scenic natural environment and flower garden at the rear of the building.',
    categoryBn: 'ক্যাম্পাস',
    categoryEn: 'Campus'
  },
  {
    id: 's5',
    src: '/images/back-voban-2.jpeg',
    titleBn: 'ভবনের পেছনের অংশ ও বাগান ২',
    titleEn: 'Building Rear & Garden 2',
    descBn: 'শিক্ষার্থীদের অবসর কাটানোর জন্য ভবনের পেছনের সীমানা ঘেরা সবুজ আঙিনা।',
    descEn: 'The secure green backyard behind the building for students to relax.',
    categoryBn: 'ক্যাম্পাস',
    categoryEn: 'Campus'
  },
  {
    id: 's6',
    src: '/images/fullview.jpeg',
    titleBn: 'বিদ্যালয় প্রাঙ্গণের সম্পূর্ণ দৃশ্য',
    titleEn: 'Full Campus Panorama',
    descBn: 'এক নজরে ঘাগড়া খিলমোগল সরকারি প্রাথমিক বিদ্যালয়ের মনোরম দৃশ্য।',
    descEn: 'A birds-eye view of the beautiful Ghagra Khilmogal Govt Primary School.',
    categoryBn: 'ক্যাম্পাস',
    categoryEn: 'Campus'
  },
  {
    id: 's7',
    src: '/images/cover.jpeg',
    titleBn: 'বিদ্যালয় কভার ও প্রবেশদ্বার',
    titleEn: 'School Gateway & Cover View',
    descBn: 'বিদ্যালয়ের প্রধান ফটক ও সুসজ্জিত তোরণ যা দর্শনার্থীদের স্বাগত জানায়।',
    descEn: 'The decorated main gate and archway welcoming all visitors.',
    categoryBn: 'স্থাপনা',
    categoryEn: 'Infrastructure'
  },
  {
    id: 's8',
    src: '/images/assembly.jpg',
    titleBn: 'প্রাত্যহিক সকালের সমাবেশ',
    titleEn: 'Daily Morning Assembly',
    descBn: 'শৃঙ্খলার সাথে জাতীয় সংগীত, শপথ বাক্য পাঠ এবং শরীরচর্চায় অংশ নিচ্ছে শিক্ষার্থীরা।',
    descEn: 'Students participating in the national anthem, pledge, and daily physical exercise.',
    categoryBn: 'কার্যক্রম',
    categoryEn: 'Activities'
  },
  {
    id: 's9',
    src: '/images/classroom.jpg',
    titleBn: 'মাল্টিমিডিয়া শ্রেণিকক্ষ',
    titleEn: 'Interactive Smart Classroom',
    descBn: 'প্রজেক্টরের মাধ্যমে আধুনিক পদ্ধতিতে ডিজিটাল পাঠদান কার্যক্রম।',
    descEn: 'Modern digital learning sessions using multimedia projectors.',
    categoryBn: 'শ্রেণিকক্ষ',
    categoryEn: 'Classrooms'
  },
  {
    id: 's10',
    src: '/images/sports.jpg',
    titleBn: 'বার্ষিক ক্রীড়া ও সাংস্কৃতিক উৎসব',
    titleEn: 'Annual Sports & Cultural Festival',
    descBn: 'শিক্ষার্থীদের মেধা ও শারীরিক বিকাশের জন্য ক্রীড়া প্রতিযোগিতার আয়োজন।',
    descEn: 'Sports events organized for the physical and mental development of students.',
    categoryBn: 'কার্যক্রম',
    categoryEn: 'Activities'
  }
];

type SpeedMode = 'slow' | 'moderate' | 'fast' | 'pause';

const SPEED_MS: Record<Exclude<SpeedMode, 'pause'>, number> = {
  slow: 6000,
  moderate: 4000,
  fast: 2500,
};

export const CampusSlideshow: React.FC = () => {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speedMode, setSpeedMode] = useState<SpeedMode>('moderate');
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  // Custom state for progress bar
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      // save elapsed time
      elapsedRef.current += Date.now() - startTimeRef.current;
    } else {
      setIsPlaying(true);
      startTimeRef.current = Date.now();
    }
  };

  // Handle Autoplay logic with progress bar
  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (!isPlaying || speedMode === 'pause') {
      return;
    }

    const duration = SPEED_MS[speedMode as Exclude<SpeedMode, 'pause'>];
    const updateRate = 50; // ms between updates

    startTimeRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const timeSpent = elapsedRef.current + (Date.now() - startTimeRef.current);
      const currentProgress = Math.min((timeSpent / duration) * 100, 100);
      setProgress(currentProgress);

      if (timeSpent >= duration) {
        nextSlide();
      }
    }, updateRate);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, speedMode, nextSlide]);

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
  };

  const handleSpeedChange = (mode: SpeedMode) => {
    setSpeedMode(mode);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
    if (mode === 'pause') {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const currentSlide = slides[currentIndex];
  const activeTitle = lang === 'bn' ? currentSlide.titleBn : currentSlide.titleEn;
  const activeDesc = lang === 'bn' ? currentSlide.descBn : currentSlide.descEn;
  const activeCategory = lang === 'bn' ? currentSlide.categoryBn : currentSlide.categoryEn;

  return (
    <section id="slideshow" className="py-16 bg-slate-900 text-white overflow-hidden relative border-t-4 border-emerald-600">
      
      {/* Decorative glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>
              {lang === 'bn' ? 'ভার্চুয়াল ক্যাম্পাস ট্যুর' : 'Virtual Campus Tour'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {lang === 'bn' ? 'বিদ্যালয় প্রাঙ্গণ স্লাইডশো' : 'School Campus Slideshow'}
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-medium">
            {lang === 'bn' 
              ? 'নিচের ইন্টারেক্টিভ স্লাইডশেয়ারের মাধ্যমে আমাদের বিদ্যালয়ের সুন্দর অবকাঠামো ও পরিবেশ ঘুরে দেখুন।' 
              : 'Explore the scenic infrastructure and environment of our school through the interactive slideshare below.'}
          </p>
        </div>

        {/* Main Grid: Slider + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: The Main Image Carousel */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800 group">
              
              {/* Slide Counter & Category Tag */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-bold rounded-full border border-emerald-900/50">
                  {activeCategory}
                </span>
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs font-bold rounded-full border border-slate-800">
                  {currentIndex + 1} / {slides.length}
                </span>
              </div>

              {/* Lightbox / Zoom Button */}
              <button
                onClick={() => setLightboxOpen(true)}
                title={lang === 'bn' ? 'পূর্ণ স্ক্রিন' : 'Fullscreen'}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 backdrop-blur-md text-slate-200 hover:text-white hover:bg-emerald-700/80 rounded-full border border-slate-800 transition-colors shadow-lg"
              >
                <Maximize2 className="w-5 h-5" />
              </button>

              {/* Animated Slides */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <Image
                      src={currentSlide.src}
                      alt={activeTitle}
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent"></div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Arrow Navigations */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/60 hover:bg-emerald-600/90 text-white backdrop-blur-xs transition-colors duration-200 border border-slate-800 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/60 hover:bg-emerald-600/90 text-white backdrop-blur-xs transition-colors duration-200 border border-slate-800 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Top Autoplay Progress Bar */}
              {isPlaying && speedMode !== 'pause' && (
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-900/50">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="mt-4 flex gap-2 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-slate-900">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => selectSlide(idx)}
                  className={`relative flex-shrink-0 w-20 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    idx === currentIndex 
                      ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/20' 
                      : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.titleEn}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Controls and Details Card */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="bg-slate-950/50 border border-slate-800/80 rounded-3xl p-6 h-full flex flex-col justify-between space-y-6">
              
              {/* Slide Meta details */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-900/50 inline-block">
                  {lang === 'bn' ? 'স্লাইড বিবরণ' : 'Slide Details'}
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-amber-300 leading-tight">
                      {activeTitle}
                    </h3>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
                      {activeDesc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Custom Interactivity & Speed Controls */}
              <div className="pt-6 border-t border-slate-800/80 space-y-4">
                
                {/* Autoplay Play/Pause */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {lang === 'bn' ? 'অটোপ্লে স্ট্যাটাস' : 'Autoplay Status'}
                  </span>
                  <button
                    onClick={togglePlay}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      isPlaying && speedMode !== 'pause'
                        ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800 hover:bg-emerald-900/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {isPlaying && speedMode !== 'pause' ? (
                      <>
                        <Pause className="w-4 h-4 fill-emerald-400" />
                        <span>{lang === 'bn' ? 'চলমান' : 'Playing'}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-slate-400" />
                        <span>{lang === 'bn' ? 'বন্ধ আছে' : 'Paused'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Slideshare Speed Selector */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>
                      {lang === 'bn' ? 'স্লাইড পরিবর্তনের গতি' : 'Slideshow Transition Speed'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800/80">
                    {(['slow', 'moderate', 'fast', 'pause'] as SpeedMode[]).map((mode) => {
                      const isActive = speedMode === mode;
                      let label = '';
                      if (mode === 'slow') label = lang === 'bn' ? 'ধীর' : 'Slow';
                      if (mode === 'moderate') label = lang === 'bn' ? 'স্বাভাবিক' : 'Moderate';
                      if (mode === 'fast') label = lang === 'bn' ? 'দ্রুত' : 'Fast';
                      if (mode === 'pause') label = lang === 'bn' ? 'স্থির' : 'Pause';

                      return (
                        <button
                          key={mode}
                          onClick={() => handleSpeedChange(mode)}
                          className={`py-2 text-[10px] sm:text-xs font-extrabold rounded-lg capitalize transition-all ${
                            isActive
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Lightbox / Modal View */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-lg">
            
            {/* Overlay Close Area */}
            <div className="absolute inset-0 cursor-default" onClick={() => setLightboxOpen(false)} />

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-950/80 hover:bg-emerald-800 text-white rounded-full transition-colors border border-slate-800 shadow-md"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Image View */}
              <div className="relative h-[60vh] md:h-[70vh] w-full bg-slate-950 flex items-center justify-center">
                <Image
                  src={currentSlide.src}
                  alt={activeTitle}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Lightbox Navigation arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-4 p-3 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white transition-colors border border-slate-800"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-4 p-3 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white transition-colors border border-slate-800"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Info Panel */}
              <div className="p-6 bg-slate-950 border-t border-slate-800/80 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-900/50">
                      {activeCategory}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {currentIndex + 1} / {slides.length}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-amber-300">
                    {activeTitle}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 font-medium">
                    {activeDesc}
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <p className="text-xs text-slate-500 font-bold">
                    {lang === 'bn' 
                      ? 'ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয়' 
                      : 'Ghagra Khilmogal Hakim Uddin GPS'}
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
