import type {
  CenterConfig,
  DayPairKey,
  DiseaseDetail,
  Language,
  VaccineDiseaseConfigItem,
} from '../types';

export const translations = {
  bn: {
    appTitle: 'EPI ও স্বাস্থ্য সেবা',
    appHeaderSub: 'সম্প্রসারিত টিকাদান কর্মসূচি',
    langBtn: 'EN',
    syncBtn: 'অটো-সিংক',
    installBtn: 'ইনস্টল',
    cardTitleAge: 'বয়স ক্যালকুলেটর',
    cardSubAge: 'নির্ভুল বয়স গণনা',
    cardTitleMicro: 'মাইক্রোপ্লান',
    cardSubMicro: 'বাৎসরিক সেশন তালিকা',
    cardTitleAnc: 'ANC / EDD',
    cardSubAnc: 'গর্ভকালীন সেবা সূচি',
    cardTitleAdo: 'কৈশোরকালীন সেবা',
    cardSubAdo: 'HPV ও Td শিডিউল',
    ageHeading: 'শিশুর টিকার তারিখ নির্ধারণ',
    btnBdrisPopupText: 'BDRIS অনলাইন জন্ম ও মৃত্যু নিবন্ধন যাচাই',
    btnEpiCardDownloadText: 'EPI টিকা কার্ড ডাউনলোড',
    labelCalcDob: 'শিশুর জন্ম তারিখ নির্বাচন করুন',
    btnCalculateEpi: 'টিকার তারিখ দেখুন',
    dobLabel: 'জন্মের তারিখ',
    pentaLabel: 'পেন্টা ভ্যাকসিনের তারিখ (১ম ডোজ)',
    mr1Label: 'এমআর-১ ভ্যাকসিনের তারিখ',
    mr2Label: 'এমআর-২ ভ্যাকসিনের তারিখ',
    shareResultBtn: 'ফলাফল শেয়ার করুন',
    resTitle: 'রোগ ও টিকার তালিকা',
    clickHintText: 'বিস্তারিত দেখতে রোগের নামের উপর ক্লিক করুন',
    lblSymptomsHeader: 'লক্ষণসমূহ',
    lblPreventionHeader: 'প্রতিকার ও প্রতিরোধ',
    microplanHeading: 'বাৎসরিক মাইক্রোপ্লান',
    btnEditText: 'এডিট',
    cancelBtn: 'বাতিল',
    imageBtn: 'ইমেজ',
    excelBtn: 'এক্সেল',
    resetBtn: 'রিসেট',
    yearSelectLabel: 'বছর নির্বাচন',
    pairSelectLabel: 'প্রাথমিক সেশন জোড় বার',
    printMicroplanTitle: 'বাৎসরিক ইপিআই টিকাদান সেশন মাইক্রোপ্লান',
    yearPrefix: 'বছর',
    mWord: 'সাব ব্লক',
    mCenter: 'কেন্দ্রের নাম ও ঠিকানা',
    months: [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ],
    savePlanBtnText: 'পরিবর্তন সেভ করুন',
    ancHeading: 'গর্ভাবস্থা ও ANC সেবার তারিখ নির্ধারণ',
    labelAncType: 'হিসাবের ধরন বাছুন',
    optLmp: 'LMP থেকে EDD ও ANC বের করুন',
    optEdd: 'EDD থেকে LMP বের করুন',
    labelLmpInput: 'শেষ মাসিকের তারিখ (LMP)',
    labelEddInput: 'সম্ভাব্য প্রসবের তারিখ (EDD)',
    btnCalculateAnc: 'হিসাব করুন',
    ancVisitsTitle: 'চারটি প্রসবপূর্ব সেবা (ANC Visit) এর সময়সূচী',
    adoHeading: 'কৈশোরকালীন স্বাস্থ্য ও টিকাদান (HPV & Td)',
    labelGirlDob: 'কিশোরীর জন্ম তারিখ',
    btnVerifyAdo: 'যাচাই করুন',
    tdDose: 'ডোজ',
    tdTime: 'প্রদেয় সময়',
    tdDate: 'নির্ধারিত তারিখ',
    sidebarTitle: 'সংরক্ষিত হিস্ট্রি',
    sidebarDesc: 'পূর্বে এন্ট্রি করা জন্ম তারিখের তালিকা',
    clearHistoryBtn: 'সকল হিস্ট্রি মুছে ফেলুন',
    noHistory: 'কোনো হিস্ট্রি সংরক্ষিত নেই।',
    ageCalcTitle: 'বয়স ক্যালকুলেটর',
    lblAgeDob: 'জন্ম তারিখ',
    lblAgeTarget: 'যে তারিখ পর্যন্ত গণনা করতে চান',
    btnCalcGeneralAge: 'বয়স বের করুন',
    notesHeading: 'নোটস (Keep Note)',
    noteTitlePlaceholder: 'শিরোনাম (Title)...',
    noteContentPlaceholder: 'একটি নোট লিখুন...',
    noteSearchPlaceholder: 'নোট খুঁজুন...',
    btnSaveNote: 'সেভ করুন',
    btnUpdateNote: 'আপডেট করুন',
    editModeLabel: 'নোট এডিট করা হচ্ছে',
    noNotes: 'কোনো নোট পাওয়া যায়নি',
    backLabel: 'ব্যাক',
    navDashboard: 'ড্যাশবোর্ড',
    navVaccines: 'রোগের তালিকা',
    navNotes: 'নোটস',
    navMicroplan: 'মাইক্রোপ্লান',
    offlineBanner: 'অফলাইন মোড — স্থানীয় ডেটা দিয়ে কাজ চলছে',
    copyright: '© এস,এম,রাসেল কবির',
  },
  en: {
    appTitle: 'EPI & Health Care',
    appHeaderSub: 'Expanded Programme on Immunization',
    langBtn: 'বাংলা',
    syncBtn: 'Auto-Sync',
    installBtn: 'Install',
    cardTitleAge: 'Age Calculator',
    cardSubAge: 'Exact age calculation',
    cardTitleMicro: 'Microplan',
    cardSubMicro: 'Annual session schedule',
    cardTitleAnc: 'ANC / EDD',
    cardSubAnc: 'Antenatal care schedule',
    cardTitleAdo: 'Adolescent Care',
    cardSubAdo: 'HPV & Td schedule',
    ageHeading: 'Child Vaccination Date Scheduler',
    btnBdrisPopupText: 'BDRIS Online Birth & Death Verification',
    btnEpiCardDownloadText: 'EPI Vaccination Card Download',
    labelCalcDob: "Select Child's Date of Birth",
    btnCalculateEpi: 'View Vaccine Dates',
    dobLabel: 'Date of Birth',
    pentaLabel: 'Penta Vaccine Date (1st Dose)',
    mr1Label: 'MR-1 Vaccine Date',
    mr2Label: 'MR-2 Vaccine Date',
    shareResultBtn: 'Share Schedule',
    resTitle: 'Disease & Vaccine List',
    clickHintText: 'Tap any disease to view symptoms and prevention',
    lblSymptomsHeader: 'Symptoms',
    lblPreventionHeader: 'Treatment & Prevention',
    microplanHeading: 'Annual Microplan',
    btnEditText: 'Edit',
    cancelBtn: 'Cancel',
    imageBtn: 'Image',
    excelBtn: 'Excel',
    resetBtn: 'Reset',
    yearSelectLabel: 'Select Year',
    pairSelectLabel: 'Primary Session Day Pair',
    printMicroplanTitle: 'Annual EPI Vaccination Session Microplan',
    yearPrefix: 'Year',
    mWord: 'Sub Block',
    mCenter: 'Center Name & Address',
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    savePlanBtnText: 'Save Changes',
    ancHeading: 'Pregnancy & ANC Service Date Calculator',
    labelAncType: 'Select Calculation Type',
    optLmp: 'Find EDD & ANC from LMP',
    optEdd: 'Find LMP from EDD',
    labelLmpInput: 'Last Menstrual Period (LMP)',
    labelEddInput: 'Estimated Due Date (EDD)',
    btnCalculateAnc: 'Calculate',
    ancVisitsTitle: 'Four Antenatal Care (ANC Visit) Schedule',
    adoHeading: 'Adolescent Health & Immunization (HPV & Td)',
    labelGirlDob: "Girl's Date of Birth",
    btnVerifyAdo: 'Verify',
    tdDose: 'Dose',
    tdTime: 'Scheduled Time',
    tdDate: 'Scheduled Date',
    sidebarTitle: 'Saved History',
    sidebarDesc: 'List of previously entered dates of birth',
    clearHistoryBtn: 'Clear All History',
    noHistory: 'No history saved yet.',
    ageCalcTitle: 'Age Calculator',
    lblAgeDob: 'Date of Birth',
    lblAgeTarget: 'Calculate Age Up To',
    btnCalcGeneralAge: 'Calculate Age',
    notesHeading: 'Notes (Keep Note)',
    noteTitlePlaceholder: 'Title...',
    noteContentPlaceholder: 'Write a note...',
    noteSearchPlaceholder: 'Search notes...',
    btnSaveNote: 'Save Note',
    btnUpdateNote: 'Update Note',
    editModeLabel: 'Editing Note',
    noNotes: 'No notes found',
    backLabel: 'Back',
    navDashboard: 'Home',
    navVaccines: 'Vaccines',
    navNotes: 'Notes',
    navMicroplan: 'Microplan',
    offlineBanner: 'Offline Mode — Running on cached local data',
    copyright: '© S.M. Rasel Kabir',
  },
} as const;

export const epiDataConfig: Record<Language, VaccineDiseaseConfigItem[]> = {
  bn: [
    {vaccine: 'বিসিজি (BCG)', disease: '১. যক্ষ্মা (Tuberculosis / TB)', key: 'tuberculosis'},
    {vaccine: 'পেন্টা', disease: '২. ডিপথেরিয়া (Diphtheria)', key: 'diphtheria'},
    {vaccine: 'পেন্টা', disease: '৩. পারটুসিস বা হুপিং কাশি', key: 'pertussis'},
    {vaccine: 'পেন্টা', disease: '৪. টিটেনাস বা ধনুষ্টংকার', key: 'tetanus'},
    {vaccine: 'পেন্টা', disease: '৫. হেপাটাইটিস বি (Hepatitis B)', key: 'hepb'},
    {vaccine: 'পেন্টা', disease: '৬. হিমোফিলাস ইনফ্লুয়েঞ্জা বি (Hib)', key: 'hib'},
    {vaccine: 'পিসিভি', disease: '৭. নিউমোনিয়া (Pneumonia)', key: 'pneumonia'},
    {vaccine: 'ওপিভি', disease: '৮. পোলিও (Poliomyelitis)', key: 'polio'},
    {vaccine: 'এমআর', disease: '৯. হাম (Measles)', key: 'measles'},
    {vaccine: 'এমআর', disease: '১০. রুবেলা (Rubella)', key: 'rubella'},
    {vaccine: 'টিসিভি', disease: '১১. টাইফয়েড (Typhoid)', key: 'typhoid'},
  ],
  en: [
    {vaccine: 'BCG', disease: '1. Tuberculosis (TB)', key: 'tuberculosis'},
    {vaccine: 'Penta', disease: '2. Diphtheria', key: 'diphtheria'},
    {vaccine: 'Penta', disease: '3. Pertussis (Whooping Cough)', key: 'pertussis'},
    {vaccine: 'Penta', disease: '4. Tetanus', key: 'tetanus'},
    {vaccine: 'Penta', disease: '5. Hepatitis B', key: 'hepb'},
    {vaccine: 'Penta', disease: '6. Haemophilus Influenzae B (Hib)', key: 'hib'},
    {vaccine: 'PCV', disease: '7. Pneumonia', key: 'pneumonia'},
    {vaccine: 'OPV', disease: '8. Poliomyelitis', key: 'polio'},
    {vaccine: 'MR', disease: '9. Measles', key: 'measles'},
    {vaccine: 'MR', disease: '10. Rubella', key: 'rubella'},
    {vaccine: 'TCV', disease: '11. Typhoid', key: 'typhoid'},
  ],
};

export const diseaseDetailInfo: Record<Language, Record<string, DiseaseDetail>> = {
  bn: {
    tuberculosis: {
      title: '১. যক্ষ্মা (Tuberculosis / TB)',
      symptoms:
        '৩ সপ্তাহের বেশি সময় ধরে কাশি, কাশির সাথে রক্ত যাওয়া, বুকে ব্যথা, বিকেলের দিকে হালকা জ্বর ও রাতে ঘাম হওয়া এবং ওজন কমে যাওয়া।',
      prevention:
        'জন্মের পর পর শিশুকে বিসিজি (BCG) টিকা দেওয়া। আক্রান্ত রোগীকে চিকিৎসকের পরামর্শে নিয়মিত ও পূর্ণ মেয়াদে ডটস (DOTS) পদ্ধতিতে ওষুধ সেবন করা।',
    },
    diphtheria: {
      title: '২. ডিপথেরিয়া (Diphtheria)',
      symptoms:
        'তীব্র গলা ব্যথা, গিলতে কষ্ট হওয়া, হালকা জ্বর এবং গলায় ধূসর রঙের একটি শক্ত পর্দা বা আস্তরণ তৈরি হওয়া যা শ্বাসকষ্ট বাড়ায়।',
      prevention:
        'সময়মতো পেন্টাভ্যালেন্ট (Pentavalent) টিকা দেওয়া। আক্রান্ত রোগীকে দ্রুত অ্যান্টিটক্সিন ও অ্যান্টিবায়োটিক দেওয়া।',
    },
    pertussis: {
      title: '৩. পারটুসিস বা হুপিং কাশি',
      symptoms:
        'তীব্র ও অনবরত কাশি, কাশির দমকে হুপিং বা ভেঁপুর মতো শব্দ হওয়া, কাশির পর বমি হওয়া বা দম আটকে যাওয়া।',
      prevention:
        'শিশুকে সময়মতো পেন্টাভ্যালেন্ট টিকা দেওয়া। চিকিৎসকের পরামর্শে অ্যান্টিবায়োটিক সেবন।',
    },
    tetanus: {
      title: '৪. টিটেনাস বা ধনুষ্টংকার',
      symptoms:
        'চোয়াল শক্ত হয়ে মুখ খুলতে না পারা (Lockjaw), পুরো শরীর ধনুকের মতো বেঁকে যাওয়া এবং তীব্র মাংসপেশির খিঁচুনি।',
      prevention:
        'পেন্টাভ্যালেন্ট এবং টিটি (TT/Td) টিকা নেওয়া। যেকোনো কেটে যাওয়া বা ক্ষত স্থান দ্রুত জীবাণুনাশক দিয়ে পরিষ্কার করা।',
    },
    hepb: {
      title: '৫. হেপাটাইটিস বি (Hepatitis B)',
      symptoms:
        'অতিরিক্ত দুর্বলতা, চোখ ও প্রস্রাব হলুদ হওয়া (জন্ডিস), বমি বমি ভাব, পেটে ব্যথা এবং লিভারের কার্যক্ষমতা নষ্ট হওয়া।',
      prevention: 'জন্মের পর পর এবং নির্দিষ্ট শিডিউলে হেপাটাইটিস বি টিকা নেওয়া।',
    },
    hib: {
      title: '৬. হিমোফিলাস ইনফ্লুয়েঞ্জা বি (Hib)',
      symptoms:
        'এটি মূলত শিশুদের মেনিনজাইটিস এবং তীব্র নিউমোনিয়া ঘটায়। লক্ষণ হিসেবে তীব্র জ্বর, ঘাড় শক্ত হয়ে যাওয়া, বমি এবং খিঁচুনি দেখা দেয়।',
      prevention: 'সময়মতো পেন্টাভ্যালেন্ট টিকা দেওয়া।',
    },
    pneumonia: {
      title: '৭. নিউমোনিয়া (Pneumonia)',
      symptoms:
        'তীব্র জ্বর, বুক ধড়ফড় করা এবং দ্রুত শ্বাস নেওয়া, শ্বাস নেওয়ার সময় বুকের খাঁচা নিচে দেবে যাওয়া।',
      prevention: 'শিশুকে পিসিভি (PCV) টিকা দেওয়া।',
    },
    polio: {
      title: '৮. পোলিও (Poliomyelitis)',
      symptoms: 'হঠাৎ তীব্র জ্বর ও মাংসপেশিতে ব্যথা এবং খুব দ্রুত হাত বা পা অবশ (প্যারালাইসিস) হয়ে যাওয়া।',
      prevention: 'মুখে খাওয়ার পোলিও টিকা (OPV) এবং ইনজেকশনের মাধ্যমে আইপিভি (IPV) টিকা নেওয়া।',
    },
    measles: {
      title: '৯. হাম (Measles)',
      symptoms:
        'তীব্র জ্বর, সর্দি, চোখ লাল হওয়া ও চোখ দিয়ে জল পড়া এবং জ্বরের ৩-৪ দিন পর শরীরে লালচে দানা বা র‍্যাশ বের হওয়া।',
      prevention: '৯ মাস ও ১৫ মাস বয়সে এমআর (MR) টিকা দেওয়া।',
    },
    rubella: {
      title: '১০. রুবেলা (Rubella)',
      symptoms: 'হালকা জ্বর, শরীরে হালকা লালচে র‍্যাশ এবং কানের পেছনে বা ঘাড়ের গ্রন্থি ফুলে যাওয়া।',
      prevention: 'সময়মতো এমআর (MR) টিকা নিশ্চিত করা।',
    },
    typhoid: {
      title: '১১. টাইফয়েড (Typhoid)',
      symptoms: 'ধাপে ধাপে জ্বর বাড়া (যা রাতে তীব্র হয়), প্রচণ্ড মাথাব্যথা, কোষ্ঠকাঠিন্য বা ডায়রিয়া।',
      prevention: 'পরিচ্ছন্ন পানি পান করা এবং টাইফয়েড কনজুগেট টিকা (TCV) গ্রহণ করা।',
    },
  },
  en: {
    tuberculosis: {
      title: '1. Tuberculosis (TB)',
      symptoms: 'Cough lasting more than 3 weeks, coughing up blood, chest pain, evening fever.',
      prevention: 'BCG vaccine at birth and full-course DOTS medication.',
    },
    diphtheria: {
      title: '2. Diphtheria',
      symptoms: 'Severe sore throat, difficulty swallowing, gray pseudomembrane.',
      prevention: 'Timely Pentavalent vaccine.',
    },
    pertussis: {
      title: '3. Pertussis',
      symptoms: 'Severe coughing fits followed by a whooping sound.',
      prevention: 'Timely Pentavalent vaccine.',
    },
    tetanus: {
      title: '4. Tetanus',
      symptoms: 'Lockjaw, painful muscle stiffness.',
      prevention: 'Pentavalent and TT/Td vaccination.',
    },
    hepb: {
      title: '5. Hepatitis B',
      symptoms: 'Jaundice, fatigue, nausea.',
      prevention: 'Hepatitis B vaccination schedule.',
    },
    hib: {
      title: '6. Hib Infection',
      symptoms: 'Meningitis and pneumonia symptoms.',
      prevention: 'Timely Pentavalent vaccination.',
    },
    pneumonia: {
      title: '7. Pneumonia',
      symptoms: 'High fever, rapid breathing, chest indrawing.',
      prevention: 'PCV vaccination for infants.',
    },
    polio: {
      title: '8. Poliomyelitis',
      symptoms: 'Acute flaccid paralysis of limbs.',
      prevention: 'OPV and IPV vaccination.',
    },
    measles: {
      title: '9. Measles',
      symptoms: 'High fever, runny nose, red blotchy rash.',
      prevention: 'MR vaccine doses at 9 and 15 months.',
    },
    rubella: {
      title: '10. Rubella',
      symptoms: 'Mild fever, light pink rash, swollen lymph nodes.',
      prevention: 'Timely MR vaccination.',
    },
    typhoid: {
      title: '11. Typhoid',
      symptoms: 'Step-ladder fever pattern, severe headache.',
      prevention: 'Safe water and TCV vaccination.',
    },
  },
};

export const displayCentersConfig: CenterConfig[] = [
  {code: 'ক/১', name: 'SDF ভবন, কাশিয়াডাঙ্গা দঃ পাড়া'},
  {code: 'ক/২', name: 'মোতালেব মাষ্টার, কাশিয়াডাঙ্গা উঃপাড়া'},
  {code: 'খ/১', name: 'ওজাহির মোড়ল, একড়া মোড়লপাড়া'},
  {code: 'খ/২', name: 'মতিয়ার মোড়ল, বুঁইতা'},
  {code: 'গ/১', name: 'সিসি, বাটরা'},
  {code: 'গ/২', name: 'তবারক মাষ্টার, বাটরা বাজার'},
  {code: 'ঘ/১', name: 'ছাত্তার মোড়ল, বাটরা বাজারের উঃ পাশে'},
  {code: 'ঘ/২', name: 'আজগার মোড়ল, উত্তর বাঁটরা'},
];

export const executionOrderCodes = ['খ/২', 'গ/১', 'গ/২', 'ঘ/১', 'ঘ/২', 'ক/১', 'ক/২', 'খ/১'];

export const pairingRules: Record<DayPairKey, [number, number]> = {
  'mon-thu': [1, 4],
  'sun-wed': [0, 3],
  'sat-tue': [6, 2],
};

export const dayShortBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
export const dayShortEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const monthNamesBn = translations.bn.months;

export function toBnNum(n: number | string | null | undefined): string {
  if (n === null || n === undefined) return '';
  const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return n.toString().replace(/\d/g, (d) => bnNums[Number(d)]);
}

export function formatNum(n: number | string, lang: Language): string {
  return lang === 'bn' ? toBnNum(n) : String(n);
}

export function formatDate(dateObj: Date | null | undefined): string {
  if (!dateObj || Number.isNaN(dateObj.getTime())) return '-';
  return `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(
    2,
    '0'
  )}/${dateObj.getFullYear()}`;
}

export function toIsoDateInput(dateObj: Date): string {
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(
    dateObj.getDate()
  ).padStart(2, '0')}`;
}

export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function computeDateDiff(from: Date, to: Date): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
} {
  const start = from <= to ? from : to;
  const end = from <= to ? to : from;
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return {years, months, days, totalDays};
}

export function getAutoGeneratedHolidays(year: number): {date: string; name: string}[] {
  const holidays = [
    {date: `${year}-02-21`, name: 'শহিদ দিবস'},
    {date: `${year}-03-26`, name: 'স্বাধীনতা দিবস'},
    {date: `${year}-04-14`, name: 'বাংলা নববর্ষ'},
    {date: `${year}-05-01`, name: 'মে দিবস'},
    {date: `${year}-08-05`, name: 'জুলাই গণঅভ্যুত্থান দিবস'},
    {date: `${year}-12-16`, name: 'বিজয় দিবস'},
    {date: `${year}-12-25`, name: 'বড়দিন'},
  ];

  if (year === 2026) {
    [
      '2026-02-04',
      '2026-03-17',
      '2026-03-18',
      '2026-03-19',
      '2026-03-20',
      '2026-03-21',
      '2026-03-22',
      '2026-03-23',
      '2026-05-25',
      '2026-05-26',
      '2026-05-27',
      '2026-05-28',
      '2026-05-29',
      '2026-05-30',
      '2026-06-26',
      '2026-08-25',
      '2026-09-04',
      '2026-10-20',
      '2026-10-21',
    ].forEach((d) => holidays.push({date: d, name: 'সরকারি ছুটি'}));
  }
  return holidays;
}

export const NOTE_COLORS = [
  '#ffffff',
  '#fef3c7',
  '#d1fae5',
  '#dbeafe',
  '#fce7f3',
  '#f3e8ff',
] as const;
