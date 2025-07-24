// store/userStore.ts

import { create } from "zustand";

import { persist } from "zustand/middleware";


// --------------------------------------------USER STORE--------------------
export type User = {
  fullName: string;
  email: string;
  role: "tenant" | "owner" | "admin";
  phoneNumber?: string;
  profileImageUrl?: string;
  createdAt?: string;
  // You can add more fields later: properties, rent status, etc.
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "rentwise-user", // saves to localStorage
    }
  )
);

