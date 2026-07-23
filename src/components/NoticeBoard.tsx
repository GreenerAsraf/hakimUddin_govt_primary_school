'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { noticesList, Notice } from '@/data/translations';
import { Bell, Download, AlertTriangle, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NoticeBoard: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (notice: Notice) => {
    setDownloadSuccess(notice.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <section id="notices" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>নোটিশ ও বিজ্ঞপ্তি</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              {t.notices.title}
            </h2>
            <p className="text-base text-slate-600 font-medium mt-1">
              {t.notices.subTitle}
            </p>
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {noticesList.map((notice) => {
            const title = lang === 'bn' ? notice.titleBn : notice.titleEn;
            const date = lang === 'bn' ? notice.dateBn : notice.dateEn;
            const category = lang === 'bn' ? notice.categoryBn : notice.categoryEn;

            return (
              <motion.div
                key={notice.id}
                whileHover={{ y: -3 }}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  notice.isUrgent
                    ? 'bg-amber-50/60 border-amber-300/80 shadow-sm hover:shadow-md'
                    : 'bg-slate-50/70 border-slate-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {date}
                    </span>
                    
                    {notice.isUrgent && (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-red-600 text-white shadow-xs animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {lang === 'bn' ? 'জরুরি' : 'URGENT'}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => setSelectedNotice(notice)}
                    className="text-lg md:text-xl font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer leading-snug mb-2"
                  >
                    {title}
                  </h3>

                  <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md">
                    {category}
                  </span>
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read Full Notice'}</span>
                  </button>

                  <button
                    onClick={() => handleDownload(notice)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      downloadSuccess === notice.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {downloadSuccess === notice.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ডাউনলোড হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-emerald-600" />
                        <span>{t.notices.download}</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  {lang === 'bn' ? selectedNotice.dateBn : selectedNotice.dateEn}
                </span>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="text-slate-400 hover:text-slate-700 font-extrabold text-xl px-2"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {lang === 'bn' ? selectedNotice.titleBn : selectedNotice.titleEn}
              </h3>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm text-slate-700 space-y-2 leading-relaxed">
                <p>
                  <strong>স্কুল নির্দেশিকা:</strong> এই নোটিশটি ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয়ের সকল শিক্ষার্থী, শিক্ষক ও অভিভাবকবৃন্দের জন্য প্রদেয়। বিস্তারিত তথ্য বা কোনো জিজ্ঞাসার জন্য স্কুল অফিসে যোগাযোগ করার পরামর্শ দেওয়া হচ্ছে।
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  স্বাক্ষরিত: প্রধান শিক্ষক, ঘাগড়া খিলমোগল সঃ প্রাঃ বিদ্যালয়।
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  বন্ধ করুন
                </button>
                <button
                  onClick={() => handleDownload(selectedNotice)}
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF ডাউনলোড</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
