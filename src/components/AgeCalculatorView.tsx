import React, {useState} from 'react';
import {Calculator} from 'lucide-react';
import {
  computeDateDiff,
  formatNum,
  parseLocalDate,
  toIsoDateInput,
  translations,
} from '../data/epiData';
import type {Language} from '../types';

interface AgeCalculatorViewProps {
  lang: Language;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AgeCalculatorView: React.FC<AgeCalculatorViewProps> = ({lang, onNotify}) => {
  const t = translations[lang];
  const [dob, setDob] = useState('');
  const [targetDate, setTargetDate] = useState(() => toIsoDateInput(new Date()));
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob || !targetDate) {
      onNotify(
        lang === 'bn' ? 'অনুগ্রহ করে উভয় তারিখ নির্বাচন করুন।' : 'Please enter both dates.',
        'error'
      );
      return;
    }
    setResult(computeDateDiff(parseLocalDate(dob), parseLocalDate(targetDate)));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">{t.ageCalcTitle}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ageDob" className="block text-xs font-bold text-slate-600 mb-1.5">
              {t.lblAgeDob}
            </label>
            <input
              id="ageDob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="ageTarget" className="block text-xs font-bold text-slate-600 mb-1.5">
              {t.lblAgeTarget}
            </label>
            <input
              id="ageTarget"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full min-h-[48px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base transition"
        >
          {t.btnCalcGeneralAge}
        </button>
      </form>

      {result && (
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
          <div className="text-base sm:text-lg font-bold text-sky-950 tabular-nums">
            {lang === 'bn' ? 'বয়স: ' : 'Age: '}
            {formatNum(result.years, lang)} {lang === 'bn' ? 'বছর' : 'years'},{' '}
            {formatNum(result.months, lang)} {lang === 'bn' ? 'মাস' : 'months'},{' '}
            {formatNum(result.days, lang)} {lang === 'bn' ? 'দিন' : 'days'}
          </div>
          <div className="text-sm text-slate-600 tabular-nums">
            {lang === 'bn' ? 'সর্বমোট দিন: ' : 'Total Days: '}
            <span className="font-semibold text-slate-900">
              {formatNum(result.totalDays, lang)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
