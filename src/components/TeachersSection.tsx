'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { teachersList } from '@/data/translations';
import { GraduationCap, Mail, Phone, Award } from 'lucide-react';
import Image from 'next/image';

export const TeachersSection: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="teachers" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>শিক্ষক ও ব্যবস্থাপনা</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.teachers.title}
          </h2>
          <p className="text-base text-slate-600 font-medium">
            {t.teachers.subTitle}
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachersList.map((teacher) => {
            const name = lang === 'bn' ? teacher.nameBn : teacher.nameEn;
            const designation = lang === 'bn' ? teacher.designationBn : teacher.designationEn;
            const qualification = lang === 'bn' ? teacher.qualificationBn : teacher.qualificationEn;

            return (
              <div
                key={teacher.id}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                  <Image
                    src={teacher.image}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {name}
                </h3>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full my-2 border border-emerald-200">
                  {designation}
                </span>

                <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{qualification}</span>
                </p>

                <div className="w-full pt-4 border-t border-slate-200/60 flex items-center justify-center gap-3 text-slate-400">
                  <span className="p-2 bg-white rounded-full border border-slate-200 hover:text-emerald-600 cursor-pointer">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="p-2 bg-white rounded-full border border-slate-200 hover:text-emerald-600 cursor-pointer">
                    <Phone className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
