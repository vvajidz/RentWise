// store/userStore.ts

import { create } from "zustand";

type User = {
  fullName: string;
  email: string;
  role: "tenant" | "owner" | "admin";
  // You can add more fields later: properties, rent status, etc.
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
