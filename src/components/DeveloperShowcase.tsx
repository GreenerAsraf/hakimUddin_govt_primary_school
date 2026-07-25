'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Heart, X, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';

export const DeveloperShowcase: React.FC = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Register custom event listener to allow triggering from Navbar
  React.useEffect(() => {
    const handleOpenDev = () => setIsOpen(true);
    window.addEventListener('open-dev-profile', handleOpenDev);
    return () => window.removeEventListener('open-dev-profile', handleOpenDev);
  }, []);

  // User Profile Data
  const devData = {
    nameBn: "মোহাম্মদ আশরাফ উদ্দিন",
    nameEn: "MOHAMMED ASRAF UDDIN",
    roleBn: "ওয়েব ডেভেলপার এবং সহকারী শিক্ষক",
    roleEn: "Web Developer & Assistant Teacher",
    descBn: "আমি একই সাথে একজন প্রযুক্তিপ্রেমী শিক্ষক এবং ডেডিকেটেড ওয়েব ডেভেলপার। আধুনিক ওয়েব ডিজাইন আর্কিটেকচার এবং পারফরম্যান্স অপ্টিমাইজেশন নিয়ে কাজ করতে ভালোবাসি। বিদ্যালয়ের শিক্ষার্থীদের ডিজিটাল শিক্ষায় অনুপ্রাণিত করা এবং প্রযুক্তিগত সমাধানে কাজ করাই আমার মূল লক্ষ্য।",
    descEn: "I am a passionate educator and dedicated web developer, specializing in clean UI patterns, performance tuning, and creative designs. Bringing tech-driven solutions to school management is my core driving force.",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Git / GitHub", "UI/UX Design"],
    emisId: "t3",
  };

  return (
    <>
      {/* Dev Float Trigger in Navbar Corner / Screen Bottom-Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-slate-900/90 text-amber-400 border border-slate-700 hover:border-amber-400 p-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer backdrop-blur-md transition-all group"
      >
        <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />
        <span className="text-xs font-bold text-slate-100 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap">
          {lang === 'bn' ? 'ডেভেলপার প্রোফাইল' : 'Developer Profile'}
        </span>
      </motion.button>

      {/* Popover / Modal Detail Showcase */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl z-10"
            >
              {/* Colorful gradient header */}
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />
              
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-red-900/50 rounded-full border border-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                
                {/* Profile Header Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-emerald-500 bg-slate-800 flex-shrink-0">
                    <Image
                      src="/images/teachers/asraf_uddin.jpeg"
                      alt="Mohammed Asraf Uddin"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-amber-300">
                      {lang === 'bn' ? devData.nameBn : devData.nameEn}
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                      <Code className="w-3.5 h-3.5" />
                      {lang === 'bn' ? devData.roleBn : devData.roleEn}
                    </p>
                  </div>
                </div>

                {/* About Profile Bio */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    {lang === 'bn' ? 'ডেভেলপার সম্পর্কে' : 'About Developer'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {lang === 'bn' ? devData.descBn : devData.descEn}
                  </p>
                </div>

                {/* Tech Skills Tag Chips */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    {lang === 'bn' ? 'দক্ষতা সমূহ' : 'Technical Skills'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {devData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-950/80 text-[10px] font-bold text-slate-300 rounded-lg border border-slate-800/80 hover:border-emerald-800/60 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <a
                    href="#teachers"
                    onClick={() => {
                      setIsOpen(false);
                      // Custom delay to wait for modal close, then trigger card select click
                      setTimeout(() => {
                        const card = document.getElementById(devData.emisId);
                        if (card) card.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                    className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-bold group"
                  >
                    <span>{lang === 'bn' ? 'EMIS প্রোফাইল দেখুন' : 'View EMIS Profile'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  
                  <div className="flex items-center gap-1">
                    <span>Made with</span>
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
