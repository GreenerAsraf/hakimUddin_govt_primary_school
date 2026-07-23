export type Language = 'bn' | 'en';

export interface DailyActivity {
  id: string;
  time: string;
  timeBn: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  category: 'assembly' | 'class' | 'meal' | 'sports' | 'culture';
  icon: string;
}

export interface Notice {
  id: string;
  dateBn: string;
  dateEn: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  isUrgent?: boolean;
}

export interface Teacher {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  qualificationBn: string;
  qualificationEn: string;
  image: string;
}

export const translations = {
  bn: {
    schoolName: "ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয়",
    shortName: "ঘাগড়া খিলমোগল সঃ প্রাঃ বিঃ",
    subTitle: "স্থাপিত: ১৯৭৫ | ইআইআইএন (EIIN): ১৩৪৫৮২",
    tagline: "সুশিক্ষা ও নৈতিকতার আলোয় আলোকিত ভবিষ্যৎ গড়ার অঙ্গীকার",
    nav: {
      home: "প্রথম পাতা",
      routine: "দৈনন্দিন কার্যক্রম",
      notices: "নোটিশ বোর্ড",
      teachers: "শিক্ষকমণ্ডলী",
      gallery: "গ্যালারি",
      contact: "যোগাযোগ",
      admission: "ভর্তি আবেদন",
    },
    tickerLabel: "জরুরি বিজ্ঞপ্তি:",
    tickerItems: [
      "বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক অনুষ্ঠান ২০২৬-এর তারিখ ঘোষিত।",
      "১ম থেকে ৫ম শ্রেণীর প্রথম সাময়িক মূল্যায়ন পরীক্ষা আগামী রবিবার থেকে শুরু।",
      "সরকারি উপবৃত্তি গ্রহণের জন্য পিতা/মাতার জাতীয় পরিচয়পত্র ও বিকাশ নম্বর জমা দিন।"
    ],
    hero: {
      badge: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত",
      title: "একটি আদর্শ প্রাথমিক শিক্ষার পরিবেশ",
      desc: "আমাদের বিদ্যালয়ে প্রতিটি শিশুকে ভালোবাসা, শ্রদ্ধা এবং আনন্দের মাধ্যমে আধুনিক যুগোপযোগী প্রাতিষ্ঠানিক শিক্ষায় গড়ে তোলা হয়।",
      btnRoutine: "আজকের কার্যক্রম দেখুন",
      btnContact: "যোগাযোগ করুন",
      stats: {
        students: "৪৫০+",
        studentsLabel: "শিক্ষার্থী",
        teachers: "১২ জন",
        teachersLabel: "দক্ষ শিক্ষক",
        classrooms: "৮ টি",
        classroomsLabel: "মাল্টিমিডিয়া ক্লাস",
        passRate: "১০০%",
        passRateLabel: "পাসের হার"
      }
    },
    headmaster: {
      badge: "প্রধান শিক্ষকের বার্তা",
      title: "শিশুর প্রথম পদক্ষেপই গড়ে দেয় আগামীর বাংলাদেশ",
      message: "ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয়ে আমরা কেবল পাঠ্যপুস্তকের জ্ঞান দান করি না, বরং নৈতিক মূল্যবোধ, দেশপ্রেম এবং সৃজনশীলতার বিকাশ ঘটাই। প্রতিটি শিশুই আমাদের কাছে অনন্য রত্ন। অভিভাবক, শিক্ষক এবং সচেতন সমাজ বিনির্মাণে আমরা একসঙ্গে কাজ করতে প্রতিশ্রুতিবদ্ধ।",
      name: "মো: আব্দুল কদ্দুস",
      designation: "প্রধান শিক্ষক, ঘাগড়া খিলমোগল সরকারি প্রাথমিক বিদ্যালয়"
    },
    activities: {
      title: "দৈনন্দিন স্কুল কার্যক্রম ও রুটিন",
      subTitle: "প্রতিদিনের নিয়মাবলি এবং শিক্ষার্থীদের সক্রিয় অংশ গ্রহণের খতিয়ান",
      filterAll: "সকল কার্যক্রম",
      filterAssembly: "সমাবেশ",
      filterClass: "শ্রেণি পাঠদান",
      filterMeal: "মিড-ডে মিল",
      filterSports: "খেলাধুলা",
      filterCulture: "সাংস্কৃতিক চর্চা"
    },
    notices: {
      title: "স্কুল নোটিশ বোর্ড",
      subTitle: "সর্বশেষ একাডেমিক আপডেট, পরীক্ষার সময়সূচী ও সরকারি নির্দেশনা",
      viewAll: "সকল নোটিশ",
      download: "ডাউনলোড (PDF)",
    },
    gallery: {
      title: "চিত্রশালা ও মুহূর্তসমূহ",
      subTitle: "আমাদের কোমলমতি শিক্ষার্থীদের নানা আনন্দঘন মুহূর্তে তোলা ছবি",
      all: "সব ছবি",
      campus: "ক্যাম্পাস",
      sports: "ক্রীড়া ও সংস্কৃতি",
      classroom: "শ্রেণিকক্ষ"
    },
    teachers: {
      title: "আমাদের শ্রদ্ধেয় শিক্ষকমণ্ডলী",
      subTitle: "স্নেহ, মেধা ও পরম যত্নে শিক্ষার্থীদের পথপ্রদর্শক",
    },
    contact: {
      title: "যোগাযোগ ও তথ্য কেন্দ্র",
      subTitle: "যেকোনো পরামর্শ বা তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন",
      addressTitle: "ঠিকানা",
      address: "গ্রাম: খিলমোগল, ডাকঘর: ঘাগড়া, উপজেলা: কাউখালী/সদর, জেলা: রাঙ্গামাটি/চট্টগ্রাম",
      phoneTitle: "ফোন / মোবাইল",
      phone: "+880 1712-345678, +880 1819-987654",
      emailTitle: "ইমেইল",
      email: "ghagrakhilmogal.gps@gmail.com",
      hoursTitle: "স্কুল সময়সূচী",
      hours: "রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৩:৩০",
      formTitle: "বার্তা পাঠান",
      namePlaceholder: "আপনার নাম",
      phonePlaceholder: "মোবাইল নম্বর",
      messagePlaceholder: "আপনার বার্তা বা জিজ্ঞাসা লিখুন...",
      sendBtn: "বার্তা পাঠান"
    },
    footer: {
      quickLinks: "দ্রুত লিঙ্ক",
      governmentLinks: "গুরুত্বপূর্ণ সরকারী লিঙ্ক",
      primaryEdu: "প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়",
      dpe: "প্রাথমিক শিক্ষা অধিদপ্তর (DPE)",
      nctb: "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড",
      copyright: "সর্বস্বত্ব সংরক্ষিত © ২০২৬ - ঘাগড়া খিলমোগল হাকিম উদ্দিন সরকারি প্রাথমিক বিদ্যালয়"
    }
  },
  en: {
    schoolName: "Ghagra Khilmogal Hakim Uddin Government Primary School",
    shortName: "Ghagra Khilmogal GPS",
    subTitle: "ESTD: 1975 | EIIN: 134582",
    tagline: "Committed to building a bright future with quality education and morals",
    nav: {
      home: "Home",
      routine: "Daily Activities",
      notices: "Notice Board",
      teachers: "Teachers",
      gallery: "Gallery",
      contact: "Contact",
      admission: "Admission Info",
    },
    tickerLabel: "Urgent Notice:",
    tickerItems: [
      "Annual Sports & Cultural Competition 2026 dates announced.",
      "First Term Evaluation Exam for Class 1-5 begins next Sunday.",
      "Submit parents' NID and Bkash number for primary education stipend."
    ],
    hero: {
      badge: "Government Approved Primary School",
      title: "An Ideal Learning Environment for Every Child",
      desc: "At our school, every child is nurtured with love, respect, and joy to receive modern, age-appropriate primary education.",
      btnRoutine: "View Today's Routine",
      btnContact: "Contact Us",
      stats: {
        students: "450+",
        studentsLabel: "Students",
        teachers: "12",
        teachersLabel: "Qualified Teachers",
        classrooms: "8",
        classroomsLabel: "Smart Classrooms",
        passRate: "100%",
        passRateLabel: "Pass Rate"
      }
    },
    headmaster: {
      badge: "Headmaster's Message",
      title: "A Child's First Steps Shape the Nation of Tomorrow",
      message: "At Ghagra Khilmogal Hakim Uddin Government Primary School, we do not merely impart textbook knowledge; we instill moral values, patriotism, and creativity. Every child is a precious gem to us. Together with parents, teachers, and community members, we are committed to nurturing future leaders.",
      name: "Md. Abdul Kuddus",
      designation: "Headmaster, Ghagra Khilmogal Government Primary School"
    },
    activities: {
      title: "Daily Activities & School Routine",
      subTitle: "Daily schedule and student engagement across academic and co-curricular programs",
      filterAll: "All Activities",
      filterAssembly: "Assembly",
      filterClass: "Classroom",
      filterMeal: "Mid-day Meal",
      filterSports: "Sports & PE",
      filterCulture: "Cultural Club"
    },
    notices: {
      title: "School Notice Board",
      subTitle: "Latest academic updates, exam timetables, and official circulars",
      viewAll: "All Notices",
      download: "Download (PDF)",
    },
    gallery: {
      title: "Photo & Event Gallery",
      subTitle: "Moments captured from daily classes, celebrations, and sports activities",
      all: "All Photos",
      campus: "Campus",
      sports: "Sports & Events",
      classroom: "Classrooms"
    },
    teachers: {
      title: "Our Respected Faculty",
      subTitle: "Dedicated educators shaping the minds of tomorrow with love and care",
    },
    contact: {
      title: "Contact & Information Desk",
      subTitle: "Reach out to us for any inquiry, admission details, or suggestions",
      addressTitle: "School Address",
      address: "Village: Khilmogal, Post: Ghagra, Upazila: Kawkhali / Sadar, Bangladesh",
      phoneTitle: "Phone / Mobile",
      phone: "+880 1712-345678, +880 1819-987654",
      emailTitle: "Email Address",
      email: "ghagrakhilmogal.gps@gmail.com",
      hoursTitle: "School Hours",
      hours: "Sunday - Thursday: 09:00 AM - 03:30 PM",
      formTitle: "Send a Message",
      namePlaceholder: "Your Full Name",
      phonePlaceholder: "Mobile Number",
      messagePlaceholder: "Type your query or feedback here...",
      sendBtn: "Send Message"
    },
    footer: {
      quickLinks: "Quick Links",
      governmentLinks: "Important Government Portals",
      primaryEdu: "Ministry of Primary and Mass Education",
      dpe: "Directorate of Primary Education (DPE)",
      nctb: "National Curriculum and Textbook Board (NCTB)",
      copyright: "All Rights Reserved © 2026 - Ghagra Khilmogal Hakim Uddin Govt. Primary School"
    }
  }
};

export const dailyActivitiesList: DailyActivity[] = [
  {
    id: "1",
    time: "09:00 AM",
    timeBn: "সকাল ০৯:০০",
    titleBn: "সকালের সমাবেশ ও জাতীয় সঙ্গীত",
    titleEn: "Morning Assembly & National Anthem",
    descBn: "কোরআন তেলাওয়াত, শপথ গ্রহণ, শারীরিক কসরত ও জাতীয় সঙ্গীত গাওয়ার মাধ্যমে দিনের সূচনা।",
    descEn: "Daily inauguration with recitation, national anthem, pledge, and physical exercises.",
    category: "assembly",
    icon: "Sun"
  },
  {
    id: "2",
    time: "09:30 AM",
    timeBn: "সকাল ০৯:৩০",
    titleBn: "বাংলা ও গণিত সমাকলনী শিক্ষা",
    titleEn: "Bangla & Mathematics Interactive Class",
    descBn: "ছবি, চার্ট ও বাস্তব উপকরণের মাধ্যমে আনন্দময় উপায়ে প্রাথমিক শিক্ষার পাঠদান।",
    descEn: "Interactive teaching of literacy and numeracy using colorful visual aids and real-world tools.",
    category: "class",
    icon: "BookOpen"
  },
  {
    id: "3",
    time: "11:30 AM",
    timeBn: "সকাল ১১:৩০",
    titleBn: "পুষ্টিকর মিড-ডে মিল ও বিশ্রাম",
    titleEn: "Nutritious Mid-day Meal & Refreshment",
    descBn: "শিক্ষার্থীদের স্বাস্থ্যসম্মত মিড-ডে মিল প্রদান এবং সাবান দিয়ে হাত ধোয়ার স্বাস্থ্যবিধি অনুশীলন।",
    descEn: "Serving healthy mid-day meal with mandatory hand-hygiene practice for all students.",
    category: "meal",
    icon: "Utensils"
  },
  {
    id: "4",
    time: "01:00 PM",
    timeBn: "দুপুর ০১:০০",
    titleBn: "ইংরেজি ও ডিজিটাল সায়েন্স সেশন",
    titleEn: "English Skills & Digital Science Session",
    descBn: "মাল্টিমিডিয়া প্রজেক্টরের সাহায্যে ইংরেজি স্পোকেন শিক্ষা ও পরিবেশ বিজ্ঞান টিউটোরিয়াল।",
    descEn: "Multimedia projector based audio-visual English language and environmental science classes.",
    category: "class",
    icon: "Laptop"
  },
  {
    id: "5",
    time: "02:30 PM",
    timeBn: "দুপুর ০২:৩০",
    titleBn: "শারীরিক শিক্ষা ও প্রাক-প্রাথমিক খেলাধুলা",
    titleEn: "Physical Education & Pre-primary Sports",
    descBn: "ফুটবল, কানামাছি, দড়ি লাফ ও ইনডোর গেমসের মাধ্যমে শারীরিক ও মানসিক প্রশান্তি।",
    descEn: "Outdoor sports including football, skipping rope, and indoor mind games to keep kids active.",
    category: "sports",
    icon: "Trophy"
  },
  {
    id: "6",
    time: "03:15 PM",
    timeBn: "বিকাল ০৩:১৫",
    titleBn: "চিত্রাঙ্কন, সঙ্গীত ও পাঠাগার ঘণ্টা",
    titleEn: "Art, Music & School Library Hour",
    descBn: "শিশু বুক কর্ণার থেকে বই পড়া, ছবি আঁকা এবং দেশাত্মবোধক গান শেখার আসর।",
    descEn: "Storybook reading at children corner, drawing sketches, and learning patriotic songs.",
    category: "culture",
    icon: "Palette"
  }
];

export const noticesList: Notice[] = [
  {
    id: "n1",
    dateBn: "২২ জুলাই, ২০২৬",
    dateEn: "22 July, 2026",
    titleBn: "বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা ২০২৬-এর রেজিস্ট্রেশন সংক্রান্ত নোটিশ",
    titleEn: "Registration notice for Annual Sports & Cultural Competition 2026",
    categoryBn: "ক্রীড়া ও সংস্কৃতি",
    categoryEn: "Sports & Culture",
    isUrgent: true
  },
  {
    id: "n2",
    dateBn: "১৫ জুলাই, ২০২৬",
    dateEn: "15 July, 2026",
    titleBn: "প্রাক-প্রাথমিক ও ১ম শ্রেণীর শিক্ষার্থীদের বিনামূল্যে নতুন পাঠ্যপুস্তক সংক্রান্ত তথ্য",
    titleEn: "Distribution of free textbooks for Pre-Primary and Class 1 students",
    categoryBn: "পাঠ্যক্রম",
    categoryEn: "Academic"
  },
  {
    id: "n3",
    dateBn: "১০ জুলাই, ২০২৬",
    dateEn: "10 July, 2026",
    titleBn: "অভিভাবক সমাবেশ ও শিক্ষার্থী উপস্থিতি মূল্যায়ন মিটিং এর বিজ্ঞপ্তি",
    titleEn: "Notice for Parent-Teacher meeting and student attendance review",
    categoryBn: "অভিভাবক সভা",
    categoryEn: "Meeting"
  },
  {
    id: "n4",
    dateBn: "০১ জুলাই, ২০২৬",
    dateEn: "01 July, 2026",
    titleBn: "সরকারি উপবৃত্তি (Stipend) অনলাইন আবেদন ও বিকাশ নম্বর সংশোধনের নির্দেশিকা",
    titleEn: "Guidelines for government primary stipend online update and Bkash number check",
    categoryBn: "উপবৃত্তি",
    categoryEn: "Stipend",
    isUrgent: true
  }
];

export const teachersList: Teacher[] = [
  {
    id: "t1",
    nameBn: "মো: আব্দুল কদ্দুস",
    nameEn: "Md. Abdul Kuddus",
    designationBn: "প্রধান শিক্ষক",
    designationEn: "Headmaster",
    qualificationBn: "এম.এ, বি.এড (সি-ইন-এড)",
    qualificationEn: "M.A, B.Ed (C-in-Ed)",
    image: "/images/classroom.jpg"
  },
  {
    id: "t2",
    nameBn: "মোছা: সুলতানা পারভীন",
    nameEn: "Mst. Sultana Parvin",
    designationBn: "সহকারী প্রধান শিক্ষিকা",
    designationEn: "Assistant Head Teacher",
    qualificationBn: "বি.এস-সি, ডি.পি-ইন-এড",
    qualificationEn: "B.Sc, D.P-in-Ed",
    image: "/images/assembly.jpg"
  },
  {
    id: "t3",
    nameBn: "জনাব রফিকুল ইসলাম",
    nameEn: "Mr. Rafiqul Islam",
    designationBn: "সহকারী শিক্ষক (গণিত ও বিজ্ঞান)",
    designationEn: "Assistant Teacher (Math & Science)",
    qualificationBn: "বি.এ (অনার্স), ডি.পি.ই.ডি",
    qualificationEn: "B.A (Hons), D.P.Ed",
    image: "/images/sports.jpg"
  },
  {
    id: "t4",
    nameBn: "মোছা: নাসরিন আক্তার",
    nameEn: "Mst. Nasrin Akhtar",
    designationBn: "সহকারী শিক্ষিকা (ইংরেজি ও চারুকলার)",
    designationEn: "Assistant Teacher (English & Fine Arts)",
    qualificationBn: "এম.এস-সি, চারুকলা ডিপ্লোমা",
    qualificationEn: "M.Sc, Diploma in Fine Arts",
    image: "/images/classroom.jpg"
  }
];
