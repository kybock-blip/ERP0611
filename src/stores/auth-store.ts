import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/lib/types";
import { mockUser } from "@/lib/mock/seed";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, _password: string) => {
        if (email) {
          set({ user: { ...mockUser, email }, isAuthenticated: true });
          return true;
        }
        return false;
      },

      loginWithGoogle: async () => {
        set({ user: mockUser, isAuthenticated: true });
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      setRole: (role) =>
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        })),
    }),
    { name: "greentree-auth" }
  )
);
