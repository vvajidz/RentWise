import { useUserStore } from "@/store/zustand";
import { toast } from "react-hot-toast";

export const logoutUser = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    useUserStore.getState().clearUser();
    toast.success("Logged out");
  } catch (err) {
    console.error("Logout failed", err);
    toast.error("Failed to logout, try again.");
  }
};
