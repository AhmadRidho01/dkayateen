import { create } from "zustand";
import type { IAuthState } from "@/types";

export const useAuthStore = create<IAuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false });
  },
}));
