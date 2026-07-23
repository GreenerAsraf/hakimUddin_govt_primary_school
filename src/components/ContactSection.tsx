'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>যোগাযোগ ও অবস্থান</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {t.contact.title}
          </h2>
          <p className="text-base text-slate-400 font-medium">
            {t.contact.subTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80 space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t.contact.addressTitle}</h4>
                <p className="text-sm text-slate-300 font-medium leading-relaxed mt-1">
                  {t.contact.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t.contact.phoneTitle}</h4>
                <p className="text-sm text-slate-300 font-medium leading-relaxed mt-1">
                  {t.contact.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t.contact.emailTitle}</h4>
                <p className="text-sm text-slate-300 font-medium leading-relaxed mt-1">
                  {t.contact.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t.contact.hoursTitle}</h4>
                <p className="text-sm text-slate-300 font-medium leading-relaxed mt-1">
                  {t.contact.hours}
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Message Form */}
          <div className="lg:col-span-7 bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80">
            <h3 className="text-xl font-bold text-white mb-6">
              {t.contact.formTitle}
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-900/60 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-3"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-200">
                  {lang === 'bn' ? 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
                </h4>
                <p className="text-xs text-emerald-300">
                  আমরা খুব শীঘ্রই আপনার উল্লেখিত মোবাইল নম্বরে যোগাযোগ করব।
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {t.contact.namePlaceholder}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {t.contact.phonePlaceholder}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.contact.phonePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {t.contact.messagePlaceholder}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.sendBtn}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
