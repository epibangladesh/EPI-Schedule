import React, {useState} from 'react';
import {ShieldCheck, Syringe, UserCheck} from 'lucide-react';
import {
  addDays,
  computeDateDiff,
  formatDate,
  formatNum,
  parseLocalDate,
  translations,
} from '../data/epiData';
import type {Language} from '../types';

interface AdolescentCareViewProps {
  lang: Language;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdolescentCareView: React.FC<AdolescentCareViewProps> = ({lang, onNotify}) => {
  const t = translations[lang];
  const [girlDob, setGirlDob] = useState('');
  const [evaluatedDob, setEvaluatedDob] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!girlDob) {
      onNotify(
        lang === 'bn' ? 'কিশোরীর জন্ম তারিখ দিন।' : 'Please enter date of birth.',
        'error'
      );
      return;
    }
    setEvaluatedDob(parseLocalDate(girlDob));
  };

  const age = evaluatedDob ? computeDateDiff(evaluatedDob, new Date()) : null;
  const td1 = evaluatedDob ? addDays(evaluatedDob, 5475) : null;

  const tdSchedule = td1
    ? [
        {
          dose: 'Td-1',
          time: lang === 'bn' ? '১৫ বছর পূর্ণ হলে' : 'At 15 years',
          date: formatDate(td1),
        },
        {
          dose: 'Td-2',
          time: lang === 'bn' ? '৪ সপ্তাহ পর' : 'After 4 weeks',
          date: formatDate(addDays(td1, 28)),
        },
        {
          dose: 'Td-3',
          time: lang === 'bn' ? '৬ মাস পর' : 'After 6 months',
          date: formatDate(addDays(td1, 208)),
        },
        {
          dose: 'Td-4',
          time: lang === 'bn' ? '১ বছর পর' : 'After 1 year',
          date: formatDate(addDays(td1, 573)),
        },
        {
          dose: 'Td-5',
          time: lang === 'bn' ? '১ বছর পর' : 'After 1 year',
          date: formatDate(addDays(td1, 938)),
        },
      ]
    : [];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
          <UserCheck className="w-5 h-5" />
        </div>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">{t.adoHeading}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
        <div className="sm:col-span-8">
          <label htmlFor="girlDobInput" className="block text-xs font-bold text-slate-600 mb-1.5">
            {t.labelGirlDob}
          </label>
          <input
            id="girlDobInput"
            type="date"
            value={girlDob}
            onChange={(e) => setGirlDob(e.target.value)}
            className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
          />
        </div>
        <div className="sm:col-span-4">
          <button
            type="submit"
            className="w-full min-h-[46px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm transition"
          >
            {t.btnVerifyAdo}
          </button>
        </div>
      </form>

      {evaluatedDob && age && (
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-sm sm:text-base">
            {lang === 'bn' ? 'কিশোরীর বর্তমান বয়স: ' : 'Current Age: '}
            <strong className="tabular-nums">
              {formatNum(age.years, lang)} {lang === 'bn' ? 'বছর' : 'years'},{' '}
              {formatNum(age.months, lang)} {lang === 'bn' ? 'মাস' : 'months'},{' '}
              {formatNum(age.days, lang)} {lang === 'bn' ? 'দিন' : 'days'}
            </strong>
          </div>

          {age.years >= 10 ? (
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-purple-900 text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'bn' ? 'এইচপিভি (HPV) টিকা' : 'HPV Vaccine'}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 tabular-nums">
                {lang === 'bn' ? '১০ বছর পূর্ণ হওয়ার তারিখ: ' : '10th Birthday Target: '}
                {formatDate(addDays(evaluatedDob, 3650))}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
              {lang === 'bn'
                ? `১০ বছর পূর্ণ হলে HPV টিকার উপযুক্ত হবে (${formatDate(addDays(evaluatedDob, 3650))})।`
                : `Eligible for HPV vaccine upon turning 10 (${formatDate(addDays(evaluatedDob, 3650))}).`}
            </div>
          )}

          {age.years >= 15 && (
            <div className="border border-teal-200 rounded-2xl overflow-hidden">
              <div className="bg-teal-50 px-4 py-3 flex items-center gap-2 font-bold text-teal-900 text-sm">
                <Syringe className="w-4 h-4" />
                <span>
                  {lang === 'bn'
                    ? 'টিডি (Td) টিকাদান শিডিউল (১৫ বছর পূর্ণ হলে)'
                    : 'Td Vaccination Schedule (At 15+ years)'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse tabular-nums">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <th className="px-4 py-2.5 text-left font-bold">{t.tdDose}</th>
                      <th className="px-4 py-2.5 text-left font-bold">{t.tdTime}</th>
                      <th className="px-4 py-2.5 text-right font-bold">{t.tdDate}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tdSchedule.map((row) => (
                      <tr key={row.dose}>
                        <td className="px-4 py-2.5 font-bold text-slate-900">{row.dose}</td>
                        <td className="px-4 py-2.5 text-slate-600">{row.time}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-teal-800">
                          {row.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
