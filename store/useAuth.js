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
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "@/firebase";
import { toast } from "react-toastify";

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
  subscribeAlarm: (router) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(firestore, "alarms", currentUser.id, "notifications"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const targetDoc = change.doc;
            if (targetDoc.data().read) return;
            if (window.location.pathname === targetDoc.data().redirectURL) {
              updateDoc(
                doc(
                  firestore,
                  "alarms",
                  currentUser.id,
                  "notifications",
                  targetDoc.id
                ),
                { read: true }
              );
              return;
            }
            toast.info(
              <div
                onClick={async () => {
                  await updateDoc(
                    doc(
                      firestore,
                      "alarms",
                      currentUser.id,
                      "notifications",
                      targetDoc.id
                    ),
                    { read: true }
                  );
                  router.push(targetDoc.data().redirectURL);
                }}
              >
                {targetDoc.data().message}
              </div>,
              {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              }
            );
          }
        });
      }
    );
    return unsubscribe;
  },
}));
