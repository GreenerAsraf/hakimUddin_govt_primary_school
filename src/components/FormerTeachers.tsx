'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { History, UserMinus, UserCheck, UserX, GraduationCap } from 'lucide-react';

const transferredTeachers = [
  { nameEn: 'Dipan Baishnab', nameBn: 'দীপন বৈষ্ণব', designationEn: 'Head Teacher', designationBn: 'প্রধান শিক্ষক' },
  { nameEn: 'Masud Karim', nameBn: 'মাসুদ করিম', designationEn: 'Assistant Teacher', designationBn: 'সহকারী শিক্ষক' },
  { nameEn: 'Shuili Sultana', nameBn: 'শিউলি সুলতানা', designationEn: 'Assistant Teacher', designationBn: 'সহকারী শিক্ষক' },
];

const retiredTeachers = [
  { nameEn: 'Lutfonnesa', nameBn: 'লুৎফুন্নেসা', designationEn: 'Assistant Teacher', designationBn: 'সহকারী শিক্ষক' },
  { nameEn: 'Abul Kayer', nameBn: 'আবুল খায়ের', designationEn: 'Assistant Teacher', designationBn: 'ভারপ্রাপ্ত প্রধান শিক্ষক' },
];

export const FormerTeachers = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <History className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'প্রাক্তন শিক্ষকমণ্ডলী' : 'Former Teachers'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {lang === 'bn' ? 'আমাদের প্রাক্তন ও অবসরপ্রাপ্ত শিক্ষকবৃন্দ' : 'Our Former & Retired Teachers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Transferred Teachers */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'bn' ? 'বদলি হওয়া শিক্ষক' : 'Transferred Teachers'}
                </h3>
              </div>
            </div>
            <ul className="space-y-4">
              {transferredTeachers.map((teacher, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      {lang === 'bn' ? teacher.nameBn : teacher.nameEn}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {lang === 'bn' ? teacher.designationBn : teacher.designationEn}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Retired Teachers */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'bn' ? 'অবসরপ্রাপ্ত শিক্ষক' : 'Retired Teachers'}
                </h3>
              </div>
            </div>
            <ul className="space-y-4">
              {retiredTeachers.map((teacher, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      {lang === 'bn' ? teacher.nameBn : teacher.nameEn}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {lang === 'bn' ? teacher.designationBn : teacher.designationEn}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
