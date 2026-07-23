'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'campus' | 'sports' | 'classroom';
  src: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    titleBn: 'বিদ্যালয়ের প্রধান বাগান ও শহীদ মিনার এলাকা',
    titleEn: 'Main School Campus & Garden View',
    category: 'campus',
    src: '/images/school_banner.jpg'
  },
  {
    id: 'g2',
    titleBn: 'কোমলমতি শিক্ষার্থীদের সুশৃঙ্খল সকালের সমাবেশ',
    titleEn: 'Morning Assembly of Primary Students',
    category: 'sports',
    src: '/images/assembly.jpg'
  },
  {
    id: 'g3',
    titleBn: 'ডিজিটাল মাল্টিমিডিয়া শ্রেণিকক্ষে ইন্টারেক্টিভ পাঠদান',
    titleEn: 'Interactive Classroom Learning',
    category: 'classroom',
    src: '/images/classroom.jpg'
  },
  {
    id: 'g4',
    titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতায় দৌড় প্রতিযোগিতা',
    titleEn: 'Annual Sports Day Sprint Event',
    category: 'sports',
    src: '/images/sports.jpg'
  }
];

export const GallerySection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filtered = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-16 bg-slate-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span>ছবি ও স্মৃতিগাথা</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.gallery.title}
          </h2>
          <p className="text-base text-slate-600 font-medium">
            {t.gallery.subTitle}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: 'all', label: t.gallery.all },
              { id: 'campus', label: t.gallery.campus },
              { id: 'sports', label: t.gallery.sports },
              { id: 'classroom', label: t.gallery.classroom },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                  filter === tab.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => {
              const title = lang === 'bn' ? item.titleBn : item.titleEn;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setActiveImage(item)}
                  className="group relative h-64 rounded-3xl overflow-hidden shadow-md cursor-pointer border border-white"
                >
                  <Image
                    src={item.src}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-bold leading-snug line-clamp-2">
                      {title}
                    </p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 bg-white/90 rounded-full text-slate-900 shadow-xl">
                      <Eye className="w-6 h-6 text-emerald-700" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-slate-800/80 text-white hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-96 md:h-[500px] w-full">
                <Image
                  src={activeImage.src}
                  alt="Full view"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800 text-white">
                <h3 className="text-xl font-bold text-amber-300">
                  {lang === 'bn' ? activeImage.titleBn : activeImage.titleEn}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয় আর্কাইভ
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
