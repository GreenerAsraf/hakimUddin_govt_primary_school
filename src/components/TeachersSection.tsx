'use client';

import React, { useState, useCallback, useRef, useEffect, useId } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { teachersList, Teacher } from '@/data/translations';
import {
  GraduationCap,
  Phone,
  Award,
  X,
  BadgeCheck,
  CalendarDays,
  Building2,
  User,
  ShieldCheck,
  Clock,
  Hash,
  ChartBar,
  Camera,
  Link2,
  Upload,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ─────────────────── localStorage helpers ─────────────────── */
const LS_KEY = 'teacher_photo_overrides';

function loadOverrides(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveOverride(teacherId: string, dataOrUrl: string) {
  const overrides = loadOverrides();
  overrides[teacherId] = dataOrUrl;
  localStorage.setItem(LS_KEY, JSON.stringify(overrides));
}

function clearOverride(teacherId: string) {
  const overrides = loadOverrides();
  delete overrides[teacherId];
  localStorage.setItem(LS_KEY, JSON.stringify(overrides));
}

/* ─────────────────── Animation variants ─────────────────── */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2 } },
};
const editPanelVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: 'auto', marginTop: 12, transition: { duration: 0.25 } },
  exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2 } },
};

/* ─────────────────── InfoRow ─────────────────── */
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}
const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0">
    <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800 break-words">{value}</p>
    </div>
  </div>
);

/* ─────────────────── Photo Editor Panel ─────────────────── */
interface PhotoEditorProps {
  teacherId: string;
  currentSrc: string;
  isBn: boolean;
  onSaved: (newSrc: string) => void;
  onReset: () => void;
  hasOverride: boolean;
}
const PhotoEditor: React.FC<PhotoEditorProps> = ({
  teacherId, currentSrc, isBn, onSaved, onReset, hasOverride,
}) => {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [urlValue, setUrlValue] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [urlError, setUrlError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputId = useId();

  const txt = isBn
    ? {
        urlTab: 'URL লিঙ্ক',
        uploadTab: 'ফাইল আপলোড',
        urlPlaceholder: 'ছবির URL লিখুন (https://...)',
        urlBtn: 'প্রিভিউ দেখুন',
        save: 'সংরক্ষণ করুন',
        reset: 'পূর্বের ছবি ফিরিয়ে দিন',
        uploadBtn: 'ছবি নির্বাচন করুন',
        uploadHint: 'JPG, PNG, WEBP — সর্বোচ্চ 5MB',
        invalidUrl: 'অনুগ্রহ করে সঠিক URL দিন।',
        fileTooLarge: 'ফাইলটি 5MB-র বেশি।',
        fileTypeError: 'শুধুমাত্র ছবি ফাইল গ্রহণযোগ্য।',
      }
    : {
        urlTab: 'Image URL',
        uploadTab: 'Upload File',
        urlPlaceholder: 'Paste image URL (https://...)',
        urlBtn: 'Preview',
        save: 'Save Photo',
        reset: 'Reset to Default',
        uploadBtn: 'Choose Image',
        uploadHint: 'JPG, PNG, WEBP — max 5 MB',
        invalidUrl: 'Please enter a valid URL.',
        fileTooLarge: 'File exceeds 5 MB limit.',
        fileTypeError: 'Only image files are accepted.',
      };

  const handleUrlPreview = () => {
    setUrlError('');
    try {
      const u = new URL(urlValue.trim());
      if (!u.protocol.startsWith('http')) throw new Error();
      setPreviewSrc(urlValue.trim());
    } catch {
      setUrlError(txt.invalidUrl);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setUploadError(txt.fileTypeError); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError(txt.fileTooLarge); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewSrc(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!previewSrc) return;
    saveOverride(teacherId, previewSrc);
    onSaved(previewSrc);
  };

  const handleReset = () => {
    clearOverride(teacherId);
    setPreviewSrc(null);
    setUrlValue('');
    onReset();
  };

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mt-3">

      {/* Tab switcher */}
      <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 mb-4">
        {(['url', 'upload'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setPreviewSrc(null); setUrlError(''); setUploadError(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === m
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            {m === 'url' ? <Link2 className="w-3.5 h-3.5" /> : <Upload className="w-3.5 h-3.5" />}
            {m === 'url' ? txt.urlTab : txt.uploadTab}
          </button>
        ))}
      </div>

      {/* URL mode */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              id={urlInputId}
              type="url"
              value={urlValue}
              onChange={(e) => { setUrlValue(e.target.value); setUrlError(''); }}
              placeholder={txt.urlPlaceholder}
              className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white placeholder:text-slate-300"
              onKeyDown={(e) => { if (e.key === 'Enter') handleUrlPreview(); }}
            />
            <button
              onClick={handleUrlPreview}
              className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              {txt.urlBtn}
            </button>
          </div>
          {urlError && (
            <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{urlError}
            </p>
          )}
        </div>
      )}

      {/* Upload mode */}
      {mode === 'upload' && (
        <div className="space-y-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/50 rounded-xl py-4 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-all"
          >
            <Upload className="w-4 h-4" />
            {txt.uploadBtn}
          </button>
          <p className="text-center text-[11px] text-slate-400">{txt.uploadHint}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {uploadError && (
            <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{uploadError}
            </p>
          )}
        </div>
      )}

      {/* Preview */}
      {previewSrc && (
        <div className="mt-4 flex items-center gap-4 p-3 bg-white rounded-xl border border-emerald-200">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc} alt="preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isBn ? 'প্রিভিউ প্রস্তুত' : 'Preview ready'}
            </p>
            <button
              onClick={handleSave}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {txt.save}
            </button>
          </div>
        </div>
      )}

      {/* Reset button */}
      {hasOverride && (
        <button
          onClick={handleReset}
          className="mt-3 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-red-500 transition-colors py-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {txt.reset}
        </button>
      )}
    </div>
  );
};

/* ─────────────────── Modal ─────────────────── */
interface TeacherModalProps {
  teacher: Teacher;
  lang: 'bn' | 'en';
  imageSrc: string;
  hasOverride: boolean;
  onClose: () => void;
  onImageUpdate: (teacherId: string, newSrc: string) => void;
  onImageReset: (teacherId: string) => void;
}
const TeacherModal: React.FC<TeacherModalProps> = ({
  teacher, lang, imageSrc, hasOverride, onClose, onImageUpdate, onImageReset,
}) => {
  const isBn = lang === 'bn';
  const [showEditor, setShowEditor] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(imageSrc);

  useEffect(() => { setDisplaySrc(imageSrc); }, [imageSrc]);

  const name = isBn ? teacher.nameBn : teacher.nameEn;
  const designation = isBn ? teacher.designationBn : teacher.designationEn;
  const qualification = isBn ? teacher.qualificationBn : teacher.qualificationEn;
  const dob = isBn ? teacher.dob : teacher.dobEn;
  const firstJoin = isBn ? teacher.firstJoinDate : teacher.firstJoinDateEn;
  const schoolJoin = isBn ? teacher.schoolJoinDate : teacher.schoolJoinDateEn;
  const lastUpdated = isBn ? teacher.lastUpdated : teacher.lastUpdatedEn;

  const labels = isBn
    ? {
        pin: 'শিক্ষকের পিন নম্বর',
        mobile: 'মোবাইল নম্বর',
        gender: 'লিঙ্গ',
        dob: 'জন্ম তারিখ',
        status: 'চাকরির অবস্থা',
        firstJoin: 'প্রথম যোগদানের তারিখ',
        schoolJoin: 'বর্তমান বিদ্যালয়ে যোগদান',
        school: 'বর্তমান বিদ্যালয়',
        location: 'বিদ্যালয়ের অবস্থান',
        profile: 'প্রোফাইল পূরণ',
        lastUpdated: 'সর্বশেষ আপডেট',
        qualification: 'শিক্ষাগত যোগ্যতা',
        male: 'পুরুষ',
        female: 'মহিলা',
        changePhoto: 'ছবি পরিবর্তন করুন',
      }
    : {
        pin: 'Teacher PIN',
        mobile: 'Mobile Number',
        gender: 'Gender',
        dob: 'Date of Birth',
        status: 'Job Status',
        firstJoin: 'First Joining Date',
        schoolJoin: 'Current School Joining Date',
        school: 'Current School',
        location: 'School Location',
        profile: 'Profile Completion',
        lastUpdated: 'Last Updated',
        qualification: 'Qualification',
        male: 'Male',
        female: 'Female',
        changePhoto: 'Change Photo',
      };

  const genderLabel = teacher.gender === 'male' ? labels.male : labels.female;

  const handleSaved = (newSrc: string) => {
    setDisplaySrc(newSrc);
    setShowEditor(false);
    onImageUpdate(teacher.id, newSrc);
  };

  const handleReset = () => {
    setDisplaySrc(teacher.image);
    setShowEditor(false);
    onImageReset(teacher.id);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-6 pb-20 flex-shrink-0">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isBn ? 'সক্রিয় শিক্ষক' : 'Active Teacher'}
          </span>
          <h2 className="text-xl font-extrabold text-white leading-tight">{name}</h2>
          <p className="text-emerald-100 text-sm mt-1">{designation}</p>
        </div>

        {/* Avatar + edit button — overlapping banner */}
        <div className="relative flex-shrink-0 -mt-14 px-6 flex items-end gap-4">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-2 ring-emerald-200 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displaySrc}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = teacher.image;
              }}
            />
            {hasOverride && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <button
            onClick={() => setShowEditor((v) => !v)}
            className={`mb-2 flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all ${
              showEditor
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:text-emerald-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            {labels.changePhoto}
          </button>
        </div>

        {/* Photo Editor (animated) */}
        <div className="px-6 flex-shrink-0">
          <AnimatePresence>
            {showEditor && (
              <motion.div
                key="editor"
                variants={editPanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ overflow: 'hidden' }}
              >
                <PhotoEditor
                  teacherId={teacher.id}
                  currentSrc={displaySrc}
                  isBn={isBn}
                  onSaved={handleSaved}
                  onReset={handleReset}
                  hasOverride={hasOverride}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile completion bar */}
        <div className="px-6 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500">{labels.profile}</span>
            <span className="text-xs font-bold text-emerald-700">{teacher.profilePct}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${teacher.profilePct}%` }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
            />
          </div>
        </div>

        {/* Scrollable Details */}
        <div className="overflow-y-auto flex-1 px-6 pb-6">
          <InfoRow icon={<Hash className="w-4 h-4" />} label={labels.pin} value={teacher.pinNumber} />
          <InfoRow icon={<Phone className="w-4 h-4" />} label={labels.mobile} value={teacher.mobile} />
          <InfoRow icon={<Award className="w-4 h-4" />} label={labels.qualification} value={qualification} />
          <InfoRow icon={<User className="w-4 h-4" />} label={labels.gender} value={genderLabel} />
          <InfoRow icon={<CalendarDays className="w-4 h-4" />} label={labels.dob} value={dob} />
          <InfoRow icon={<BadgeCheck className="w-4 h-4" />} label={labels.status} value={teacher.jobStatus} />
          <InfoRow icon={<CalendarDays className="w-4 h-4" />} label={labels.firstJoin} value={firstJoin} />
          <InfoRow icon={<Building2 className="w-4 h-4" />} label={labels.schoolJoin} value={schoolJoin} />
          <InfoRow
            icon={<Building2 className="w-4 h-4" />}
            label={labels.school}
            value={isBn ? 'ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয়' : 'Ghagra Khilmogal Hakim Uddin Govt. Primary School'}
          />
          <InfoRow
            icon={<Building2 className="w-4 h-4" />}
            label={labels.location}
            value={isBn ? 'রাজানগর, লালানগর, রাঙ্গুনিয়া, চট্টগ্রাম' : 'Rajanagar, Lalanagar, Rangunia, Chattogram'}
          />
          <InfoRow icon={<Clock className="w-4 h-4" />} label={labels.lastUpdated} value={lastUpdated} />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────── Card ─────────────────── */
interface TeacherCardProps {
  teacher: Teacher;
  index: number;
  lang: 'bn' | 'en';
  imageSrc: string;
  hasOverride: boolean;
  onClick: () => void;
}
const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher, index, lang, imageSrc, hasOverride, onClick,
}) => {
  const isBn = lang === 'bn';
  const name = isBn ? teacher.nameBn : teacher.nameEn;
  const designation = isBn ? teacher.designationBn : teacher.designationEn;
  const qualification = isBn ? teacher.qualificationBn : teacher.qualificationEn;

  return (
    <motion.button
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.025 }}
      onClick={onClick}
      className="group w-full bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
    >
      {/* Avatar */}
      <div className="relative w-28 h-28 rounded-2xl overflow-hidden mb-4 ring-2 ring-slate-200 group-hover:ring-emerald-300 transition-all duration-300 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = teacher.image;
          }}
        />
        {/* Active dot */}
        <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow" />
        {/* Custom photo indicator */}
        {hasOverride && (
          <div className="absolute top-1.5 left-1.5 bg-emerald-500 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
            <Camera className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
        {name}
      </h3>
      <span className="mt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
        {designation.replace(' (সক্রিয়)', '').replace(' (Active)', '')}
      </span>
      <p className="mt-3 text-xs text-slate-500 font-medium flex items-center gap-1.5">
        <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        <span>{qualification}</span>
      </p>

      <div className="w-full mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <Hash className="w-3.5 h-3.5" />
          <span className="truncate max-w-[120px]">{teacher.pinNumber}</span>
        </div>
        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          {isBn ? 'বিস্তারিত' : 'Details'} →
        </span>
      </div>
    </motion.button>
  );
};

/* ─────────────────── Section ─────────────────── */
export const TeachersSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  // Map of teacherId → custom image src (loaded from localStorage)
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});

  // Load overrides from localStorage on mount
  useEffect(() => {
    setImageOverrides(loadOverrides());
  }, []);

  const openModal = useCallback((teacher: Teacher) => setSelectedTeacher(teacher), []);
  const closeModal = useCallback(() => setSelectedTeacher(null), []);

  const handleImageUpdate = useCallback((teacherId: string, newSrc: string) => {
    setImageOverrides((prev) => ({ ...prev, [teacherId]: newSrc }));
  }, []);

  const handleImageReset = useCallback((teacherId: string) => {
    setImageOverrides((prev) => {
      const next = { ...prev };
      delete next[teacherId];
      return next;
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeModal]);

  return (
    <section id="teachers" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'bn' ? 'শিক্ষক ও ব্যবস্থাপনা' : 'Teachers & Staff'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.teachers.title}
          </h2>
          <p className="text-base text-slate-600 font-medium">{t.teachers.subTitle}</p>
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ChartBar className="w-3.5 h-3.5" />
            {lang === 'bn'
              ? 'কার্ডে ক্লিক করুন সম্পূর্ণ EMIS তথ্য দেখতে'
              : 'Click any card to view full EMIS profile & update photo'}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {teachersList.map((teacher, index) => {
            const overrideSrc = imageOverrides[teacher.id];
            return (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                index={index}
                lang={lang}
                imageSrc={overrideSrc ?? teacher.image}
                hasOverride={!!overrideSrc}
                onClick={() => openModal(teacher)}
              />
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <TeacherModal
            key={selectedTeacher.id}
            teacher={selectedTeacher}
            lang={lang}
            imageSrc={imageOverrides[selectedTeacher.id] ?? selectedTeacher.image}
            hasOverride={!!imageOverrides[selectedTeacher.id]}
            onClose={closeModal}
            onImageUpdate={handleImageUpdate}
            onImageReset={handleImageReset}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
