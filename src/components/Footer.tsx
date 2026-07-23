'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { School, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* School Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-amber-300 font-bold shadow-md">
                <School className="w-6 h-6" />
              </div>
              <span className="font-bold text-white text-base">
                {t.schoolName}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {t.tagline}। প্রাথমিক গণশিক্ষা কার্যক্রম ও স্মার্ট বাংলাদেশ বিনির্মাণে আমরা সদা সচেষ্ট।
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">{t.nav.home}</a></li>
              <li><a href="#routine" className="hover:text-emerald-400 transition-colors">{t.nav.routine}</a></li>
              <li><a href="#notices" className="hover:text-emerald-400 transition-colors">{t.nav.notices}</a></li>
              <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">{t.nav.gallery}</a></li>
            </ul>
          </div>

          {/* Govt Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.footer.governmentLinks}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://mopme.gov.bd" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">{t.footer.primaryEdu}</a></li>
              <li><a href="https://dpe.gov.bd" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">{t.footer.dpe}</a></li>
              <li><a href="http://nctb.gov.bd" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">{t.footer.nctb}</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>{t.footer.copyright}</p>
          <p className="flex items-center gap-1 text-slate-500">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Primary Education</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
