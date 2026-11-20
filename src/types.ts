export type Language = 'bn' | 'en';

export type TabId = 'epi' | 'microplan' | 'anc' | 'adolescent' | 'age' | 'notes';

export type DayPairKey = 'mon-thu' | 'sun-wed' | 'sat-tue';

export type SyncStatus = 'offline' | 'syncing' | 'synced';

export interface KeepNote {
  id: number;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  date: string;
}

export interface HistoryEntry {
  dob: string;
  time: string;
}

export interface CenterConfig {
  code: string;
  name: string;
}

export interface MicroplanRow {
  code: string;
  name: string;
  dates: Date[];
}

export type OverridesMap = Record<string, Record<number, string>>;

export type CenterNamesMap = Record<string, string>;

export interface VaccineDiseaseConfigItem {
  vaccine: string;
  disease: string;
  key: string;
}

export interface DiseaseDetail {
  title: string;
  symptoms: string;
  prevention: string;
}

export interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

declare global {
  interface Window {
    AndroidInterface?: {
      openUrl?: (url: string) => void;
    };
  }
}
