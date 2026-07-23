'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Globe, GraduationCap, School } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.routine, href: '#routine' },
    { label: t.nav.notices, href: '#notices' },
    { label: t.nav.teachers, href: '#teachers' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 bg-white flex items-center justify-center shadow-md shadow-emerald-600/10 transition-transform"
            >
              <Image
                src="/images/logo.png"
                alt="School Logo"
                fill
                sizes="48px"
                className="object-contain p-0.5"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-base md:text-lg leading-tight group-hover:text-emerald-700 transition-colors">
                {t.schoolName}
              </span>
              <span className="text-xs text-emerald-600 font-medium tracking-wide">
                {t.subTitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white rounded-full transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Language Toggle & Admission Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setLang('bn')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === 'bn'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#contact"
              className="px-4 py-2 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.nav.admission}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language Toggle Mobile */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300 flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden px-4 pt-2 pb-6"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md"
              >
                {t.nav.admission}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
