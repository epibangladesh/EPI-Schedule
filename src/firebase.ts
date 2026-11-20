import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {
  doc,
  getDocFromServer,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import type {CenterNamesMap, HistoryEntry, KeepNote, OverridesMap} from './types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
void testConnection();

export interface UserBackupData {
  ownerId: string;
  notes: KeepNote[];
  history: HistoryEntry[];
  centerNames: CenterNamesMap;
  overrides: Record<string, OverridesMap>;
  updatedAt?: unknown;
}

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signOutGoogle() {
  return signOut(auth);
}

export async function saveUserBackup(
  uid: string,
  payload: Omit<UserBackupData, 'ownerId' | 'updatedAt'>
): Promise<void> {
  const path = `epi_users_backup/${uid}`;
  const sanitizedNotes = payload.notes.slice(0, 200).map((note) => ({
    id: Number(note.id) || Date.now(),
    title: String(note.title || '').slice(0, 200),
    content: String(note.content || '').slice(0, 4000),
    color: String(note.color || '#ffffff').slice(0, 30),
    pinned: Boolean(note.pinned),
    date: String(note.date || '').slice(0, 40),
  }));

  const sanitizedHistory = payload.history.slice(0, 100).map((entry) => ({
    dob: String(entry.dob || '').slice(0, 20),
    time: String(entry.time || '').slice(0, 40),
  }));

  const sanitizedCenterNames: CenterNamesMap = {};
  Object.entries(payload.centerNames || {})
    .slice(0, 20)
    .forEach(([k, v]) => {
      sanitizedCenterNames[String(k).slice(0, 20)] = String(v).slice(0, 200);
    });

  const sanitizedOverrides: Record<string, OverridesMap> = {};
  Object.entries(payload.overrides || {})
    .slice(0, 150)
    .forEach(([k, v]) => {
      sanitizedOverrides[String(k).slice(0, 40)] = v;
    });

  try {
    await setDoc(doc(db, 'epi_users_backup', uid), {
      ownerId: uid,
      notes: sanitizedNotes,
      history: sanitizedHistory,
      centerNames: sanitizedCenterNames,
      overrides: sanitizedOverrides,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeUserBackup(
  uid: string,
  onData: (data: UserBackupData | null) => void,
  onError: (err: Error) => void
): Unsubscribe {
  const path = `epi_users_backup/${uid}`;
  return onSnapshot(
    doc(db, 'epi_users_backup', uid),
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as UserBackupData);
      } else {
        onData(null);
      }
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (wrapped) {
        onError(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
      }
    }
  );
}
