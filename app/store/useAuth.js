import { create } from "zustand";
import {
  where,
  query,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
} from "@firebase/firestore";
import { firestore } from "@/firebase";

/**
 * Alarm
 * {
 *   id
 *   message: string,
 *   redirectURL?: string,
 * }
 */

export const useAuth = create((set, get) => ({
  user: null,
  signIn: (user) => set({ user }),
  signOut: () => {
    set({ user: null });
  },
  subscribeAlarm: () => {
    const currentUser = get().user;
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(firestore, "alarms", currentUser.id, "notifications"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            window.alert(change.doc.data().message);
          }
        });
      }
    );
    return unsubscribe;
  },
}));
