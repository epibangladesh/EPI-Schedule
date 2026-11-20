import React, {useState} from 'react';
import {
  Baby,
  Cake,
  Calculator,
  CalendarCheck,
  ExternalLink,
  Globe,
  HeartPulse,
  IdCard,
  Share2,
  ShieldCheck,
  Syringe,
  Table2,
  UserCheck,
} from 'lucide-react';
import {addDays, formatDate, parseLocalDate, translations} from '../data/epiData';
import type {Language, TabId} from '../types';

interface DashboardHomeProps {
  lang: Language;
  selectedDob: string;
  onSelectDob: (dob: string) => void;
  onCalculateEpi: (dob: string) => void;
  onNavigateTab: (tab: TabId) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  lang,
  selectedDob,
  onSelectDob,
  onCalculateEpi,
  onNavigateTab,
  onNotify,
}) => {
  const t = translations[lang];
  const [calculatedDob, setCalculatedDob] = useState<string>(selectedDob);

  const handleOpenExternal = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (window.AndroidInterface && typeof window.AndroidInterface.openUrl === 'function') {
      e.preventDefault();
      window.AndroidInterface.openUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDob) {
      onNotify(
        lang === 'bn' ? 'শিশুর জন্ম তারিখ নির্বাচন করুন।' : "Please select the child's date of birth.",
        'error'
      );
      return;
    }
    setCalculatedDob(selectedDob);
    onCalculateEpi(selectedDob);
  };

  const activeDob = calculatedDob || selectedDob;
  const dobDate = activeDob ? parseLocalDate(activeDob) : null;
  const pentaDate = dobDate ? addDays(dobDate, 42) : null;
  const mr1Date = dobDate ? addDays(dobDate, 270) : null;
  const mr2Date = dobDate ? addDays(dobDate, 450) : null;

  const handleShare = async () => {
    if (!dobDate || !pentaDate || !mr1Date || !mr2Date) return;
    const text = [
      `${t.dobLabel}: ${formatDate(dobDate)}`,
      `${t.pentaLabel}: ${formatDate(pentaDate)}`,
      `${t.mr1Label}: ${formatDate(mr1Date)}`,
      `${t.mr2Label}: ${formatDate(mr2Date)}`,
    ].join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: t.ageHeading,
          text,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard below
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      onNotify(
        lang === 'bn' ? 'টিকার সময়সূচি ক্লিপবোর্ডে কপি হয়েছে।' : 'Schedule copied to clipboard.',
        'success'
      );
    } catch {
      onNotify(lang === 'bn' ? 'শেয়ার করা যায়নি।' : 'Unable to share.', 'error');
    }
  };

  const modules: {
    tab: TabId;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconBg: string;
  }[] = [
    {
      tab: 'age',
      title: t.cardTitleAge,
      subtitle: t.cardSubAge,
      icon: <Calculator className="w-6 h-6" />,
      iconBg: 'bg-sky-50 text-sky-700',
    },
    {
      tab: 'microplan',
      title: t.cardTitleMicro,
      subtitle: t.cardSubMicro,
      icon: <Table2 className="w-6 h-6" />,
      iconBg: 'bg-teal-50 text-teal-700',
    },
    {
      tab: 'anc',
      title: t.cardTitleAnc,
      subtitle: t.cardSubAnc,
      icon: <HeartPulse className="w-6 h-6" />,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      tab: 'adolescent',
      title: t.cardTitleAdo,
      subtitle: t.cardSubAdo,
      icon: <UserCheck className="w-6 h-6" />,
      iconBg: 'bg-purple-50 text-purple-700',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Module Quick Grid */}
      <section aria-label="Health Care Modules">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {modules.map((mod) => (
            <button
              key={mod.tab}
              type="button"
              onClick={() => onNavigateTab(mod.tab)}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center gap-2 hover:border-teal-500 hover:shadow-sm active:scale-[0.98] transition min-h-[128px]"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${mod.iconBg}`}
              >
                {mod.icon}
              </div>
              <div className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {mod.title}
              </div>
              <div className="text-xs text-slate-500 font-medium">{mod.subtitle}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Main Split on Desktop: Child EPI Scheduler + Quick Gov Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Child EPI Scheduler */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {t.ageHeading}
              </h1>
              <p className="text-xs text-slate-500">
                {lang === 'bn'
                  ? 'পেন্টা (১ম ডোজ), এমআর-১ ও এমআর-২ নির্ধারক'
                  : 'Penta (1st dose), MR-1 & MR-2 calculator'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="childDobInput"
                className="block text-xs font-bold text-slate-600 mb-1.5"
              >
                {t.labelCalcDob}
              </label>
              <input
                id="childDobInput"
                type="date"
                value={selectedDob}
                onChange={(e) => onSelectDob(e.target.value)}
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.btnCalculateEpi}</span>
            </button>
          </form>

          {dobDate && pentaDate && mr1Date && mr2Date && (
            <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-sky-700 flex items-center justify-center shrink-0">
                    <Cake className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-600">{t.dobLabel}</div>
                    <div className="font-bold text-slate-900 tabular-nums">
                      {formatDate(dobDate)}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-teal-700 flex items-center justify-center shrink-0">
                    <Syringe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-teal-800">{t.pentaLabel}</div>
                    <div className="font-bold text-teal-950 tabular-nums">
                      {formatDate(pentaDate)}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-amber-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-amber-900">{t.mr1Label}</div>
                    <div className="font-bold text-slate-900 tabular-nums">
                      {formatDate(mr1Date)}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-purple-700 flex items-center justify-center shrink-0">
                    <Syringe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-purple-900">{t.mr2Label}</div>
                    <div className="font-bold text-slate-900 tabular-nums">
                      {formatDate(mr2Date)}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => void handleShare()}
                className="w-full min-h-[44px] rounded-xl border border-teal-600 bg-teal-50 text-teal-800 font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-teal-100 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.shareResultBtn}</span>
              </button>
            </div>
          )}
        </section>

        {/* External Official Portals */}
        <section className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-700">
              {lang === 'bn' ? 'সরকারি অনলাইন সেবা' : 'Official Health Portals'}
            </h2>

            <a
              href="https://everify.bdris.gov.bd/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleOpenExternal(e, 'https://everify.bdris.gov.bd/')}
              className="min-h-[64px] p-3.5 rounded-2xl border border-slate-200 hover:border-teal-600 hover:bg-teal-50/40 flex items-center justify-between gap-3 transition group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-900 group-hover:text-teal-800 truncate">
                    {t.btnBdrisPopupText}
                  </div>
                  <div className="text-xs text-slate-500 truncate">everify.bdris.gov.bd</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 shrink-0" />
            </a>

            <a
              href="https://smarthealthbd.dghs.gov.bd/epi-card-download"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) =>
                handleOpenExternal(e, 'https://smarthealthbd.dghs.gov.bd/epi-card-download')
              }
              className="min-h-[64px] p-3.5 rounded-2xl border border-slate-200 hover:border-teal-600 hover:bg-teal-50/40 flex items-center justify-between gap-3 transition group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <IdCard className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-900 group-hover:text-teal-800 truncate">
                    {t.btnEpiCardDownloadText}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    smarthealthbd.dghs.gov.bd
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 shrink-0" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
