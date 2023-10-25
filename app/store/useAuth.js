import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  signIn: (user) => set({ user }),
  signOut: () => {
    set({ user: null });
  },
}));
