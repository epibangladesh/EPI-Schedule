import React from 'react';
import type {User} from 'firebase/auth';
import {
  ChevronRight,
  Cloud,
  CloudOff,
  History,
  Info,
  LogOut,
  RefreshCw,
  ShieldAlert,
  Stethoscope,
  Syringe,
  Trash2,
  X,
} from 'lucide-react';
import {
  diseaseDetailInfo,
  epiDataConfig,
  formatDate,
  parseLocalDate,
  translations,
} from '../data/epiData';
import type {HistoryEntry, Language, SyncStatus} from '../types';

/* ================= DISEASE LIST & DETAIL MODALS ================= */
interface DiseaseModalsProps {
  lang: Language;
  listOpen: boolean;
  selectedDiseaseKey: string | null;
  onCloseList: () => void;
  onSelectDisease: (key: string) => void;
  onCloseDetail: () => void;
}

export const DiseaseModals: React.FC<DiseaseModalsProps> = ({
  lang,
  listOpen,
  selectedDiseaseKey,
  onCloseList,
  onSelectDisease,
  onCloseDetail,
}) => {
  const t = translations[lang];
  const items = epiDataConfig[lang];
  const detail = selectedDiseaseKey ? diseaseDetailInfo[lang][selectedDiseaseKey] : null;

  return (
    <>
      {listOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-2xl bg-slate-50 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="bg-gradient-to-r from-teal-950 to-teal-700 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5" />
                <h2 className="font-bold text-base sm:text-lg">{t.resTitle}</h2>
              </div>
              <button
                type="button"
                onClick={onCloseList}
                aria-label="Close"
                className="min-h-[44px] min-w-[44px] -mr-2 rounded-xl flex items-center justify-center hover:bg-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5">
              <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                <Info className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{t.clickHintText}</span>
              </p>

              {items.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectDisease(item.key)}
                  className="w-full min-h-[58px] bg-white border border-slate-200 hover:border-teal-600 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 text-left transition"
                >
                  <div className="font-bold text-sm sm:text-base text-slate-900">
                    {item.disease}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-teal-800">
                    <Syringe className="w-3.5 h-3.5" />
                    <span>{item.vaccine}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {detail && (
        <div className="fixed inset-0 z-[60] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-gradient-to-r from-teal-950 to-teal-700 text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base sm:text-lg pr-2">{detail.title}</h3>
              <button
                type="button"
                onClick={onCloseDetail}
                aria-label="Close"
                className="min-h-[44px] min-w-[44px] -mr-2 rounded-xl flex items-center justify-center hover:bg-white/15 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-teal-900 text-sm mb-1.5">
                  <Stethoscope className="w-4 h-4" />
                  <span>{t.lblSymptomsHeader}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{detail.symptoms}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{t.lblPreventionHeader}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{detail.prevention}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ================= HISTORY DRAWER ================= */
interface HistoryDrawerProps {
  lang: Language;
  open: boolean;
  history: HistoryEntry[];
  onClose: () => void;
  onSelectDob: (dob: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  lang,
  open,
  history,
  onClose,
  onSelectDob,
  onClearAll,
}) => {
  const t = translations[lang];
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-start">
      <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
        <div className="bg-gradient-to-r from-teal-950 to-teal-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5" />
            <h2 className="font-bold text-base">{t.sidebarTitle}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="min-h-[44px] min-w-[44px] -mr-2 rounded-xl flex items-center justify-center hover:bg-white/15"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs text-slate-500 mb-3">{t.sidebarDesc}</p>

          {history.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">{t.noHistory}</p>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {history.map((item) => (
                <button
                  key={item.dob}
                  type="button"
                  onClick={() => {
                    onSelectDob(item.dob);
                    onClose();
                  }}
                  className="w-full px-4 py-3.5 text-left hover:bg-teal-50/50 flex items-center justify-between gap-2 transition"
                >
                  <span className="font-bold text-sm text-teal-900 tabular-nums">
                    {lang === 'bn' ? 'জন্ম তারিখ: ' : 'DOB: '}
                    {formatDate(parseLocalDate(item.dob))}
                  </span>
                  <span className="text-xs text-slate-400 tabular-nums">{item.time}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClearAll}
              className="w-full min-h-[44px] rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold text-sm inline-flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.clearHistoryBtn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= GOOGLE CLOUD SYNC MODAL ================= */
interface CloudSyncModalProps {
  lang: Language;
  open: boolean;
  user: User | null;
  syncStatus: SyncStatus;
  onClose: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onSyncNow: () => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  lang,
  open,
  user,
  syncStatus,
  onClose,
  onSignIn,
  onSignOut,
  onSyncNow,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        <div className="bg-gradient-to-r from-teal-950 to-teal-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cloud className="w-5 h-5" />
            <h2 className="font-bold text-base">
              {lang === 'bn' ? 'ক্লাউড অটো-সিংক (Auto-Sync)' : 'Cloud Auto-Sync'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="min-h-[44px] min-w-[44px] -mr-2 rounded-xl flex items-center justify-center hover:bg-white/15"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          {!user ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                <CloudOff className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === 'bn'
                    ? 'Google অ্যাকাউন্ট দিয়ে অটো-সিংক চালু করুন'
                    : 'Enable Cloud Auto-Sync with Google'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'সাইন-ইন করলে আপনার নোটস, মাইক্রোপ্লান ও হিস্ট্রি স্বয়ংক্রিয়ভাবে ক্লাউডে সংরক্ষিত থাকবে।'
                    : 'Sign in to automatically back up and sync your notes, microplan, and history across devices.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onSignIn}
                className="w-full min-h-[48px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm transition"
              >
                {lang === 'bn' ? 'Google দিয়ে সাইন-ইন করুন' : 'Sign in with Google'}
              </button>
            </>
          ) : (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full mx-auto border-2 border-teal-200 object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full mx-auto bg-teal-700 text-white flex items-center justify-center font-bold text-xl">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}

              <div>
                <div className="font-bold text-slate-900 text-base">
                  {user.displayName || 'User'}
                </div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-xl px-3.5 py-2">
                {syncStatus === 'syncing' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>
                      {lang === 'bn' ? 'ক্লাউডে সিংক হচ্ছে...' : 'Syncing to cloud...'}
                    </span>
                  </>
                ) : syncStatus === 'synced' ? (
                  <>
                    <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {lang === 'bn'
                        ? 'ক্লাউডের সাথে সম্পূর্ণ সিংক করা আছে'
                        : 'Synced with cloud'}
                    </span>
                  </>
                ) : (
                  <>
                    <CloudOff className="w-3.5 h-3.5 text-slate-500" />
                    <span>{lang === 'bn' ? 'অফলাইন মোড' : 'Offline mode'}</span>
                  </>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={onSyncNow}
                  className="w-full min-h-[44px] rounded-xl border border-teal-600 text-teal-800 hover:bg-teal-50 font-bold text-sm inline-flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'এখনই সিংক করুন' : 'Sync Now'}</span>
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="w-full min-h-[44px] rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold text-sm inline-flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সাইন-আউট করুন' : 'Sign Out'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
