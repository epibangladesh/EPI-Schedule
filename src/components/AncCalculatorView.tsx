import React, {useState} from 'react';
import {HeartPulse} from 'lucide-react';
import {addDays, formatDate, parseLocalDate, translations} from '../data/epiData';
import type {Language} from '../types';

interface AncCalculatorViewProps {
  lang: Language;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AncCalculatorView: React.FC<AncCalculatorViewProps> = ({lang, onNotify}) => {
  const t = translations[lang];
  const [calcType, setCalcType] = useState<'lmp' | 'edd'>('lmp');
  const [inputDate, setInputDate] = useState('');
  const [result, setResult] = useState<{lmp: Date; edd: Date} | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDate) {
      onNotify(lang === 'bn' ? 'অনুগ্রহ করে তারিখ নির্বাচন করুন।' : 'Please enter a date.', 'error');
      return;
    }
    const base = parseLocalDate(inputDate);
    const lmp = calcType === 'lmp' ? base : addDays(base, -280);
    const edd = calcType === 'lmp' ? addDays(lmp, 280) : base;
    setResult({lmp, edd});
  };

  const visits = result
    ? [
        {
          label: lang === 'bn' ? '১ম সেবা (ANC 1)' : 'ANC 1',
          window: lang === 'bn' ? '১৬ সপ্তাহের মধ্যে' : 'Within 16 weeks',
          date: formatDate(addDays(result.lmp, 112)),
        },
        {
          label: lang === 'bn' ? '২য় সেবা (ANC 2)' : 'ANC 2',
          window: lang === 'bn' ? '২৪-২৮ সপ্তাহে' : '24-28 weeks',
          date: formatDate(addDays(result.lmp, 168)),
        },
        {
          label: lang === 'bn' ? '৩য় সেবা (ANC 3)' : 'ANC 3',
          window: lang === 'bn' ? '৩২ সপ্তাহে' : '32 weeks',
          date: formatDate(addDays(result.lmp, 224)),
        },
        {
          label: lang === 'bn' ? '৪র্থ সেবা (ANC 4)' : 'ANC 4',
          window: lang === 'bn' ? '৩৬ সপ্তাহে' : '36 weeks',
          date: formatDate(addDays(result.lmp, 252)),
        },
      ]
    : [];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <HeartPulse className="w-5 h-5" />
        </div>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">{t.ancHeading}</h1>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ancType" className="block text-xs font-bold text-slate-600 mb-1.5">
              {t.labelAncType}
            </label>
            <select
              id="ancType"
              value={calcType}
              onChange={(e) => setCalcType(e.target.value as 'lmp' | 'edd')}
              className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
            >
              <option value="lmp">{t.optLmp}</option>
              <option value="edd">{t.optEdd}</option>
            </select>
          </div>

          <div>
            <label htmlFor="ancDate" className="block text-xs font-bold text-slate-600 mb-1.5">
              {calcType === 'lmp' ? t.labelLmpInput : t.labelEddInput}
            </label>
            <input
              id="ancDate"
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full min-h-[48px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base transition"
        >
          {t.btnCalculateAnc}
        </button>
      </form>

      {result && (
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
              <div className="text-xs text-teal-800 font-medium">LMP</div>
              <div className="text-lg font-bold text-teal-950 tabular-nums">
                {formatDate(result.lmp)}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="text-xs text-rose-800 font-medium">EDD</div>
              <div className="text-lg font-bold text-rose-950 tabular-nums">
                {formatDate(result.edd)}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-2.5">{t.ancVisitsTitle}</h2>
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
              {visits.map((v) => (
                <div
                  key={v.label}
                  className="p-3.5 flex items-center justify-between gap-3 bg-white"
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900">{v.label}</div>
                    <div className="text-xs text-slate-500">{v.window}</div>
                  </div>
                  <div className="font-bold text-sm text-teal-800 tabular-nums">{v.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
