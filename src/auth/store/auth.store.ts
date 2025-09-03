import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../action/login.action";
import { checkAuthAction } from "../action/check-auth.action";
import { registerAction } from "../action/register.action";

type AuthStatus = "authenticated" | "unauthenticated" | "checking";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Implementacion del Store
  user: null,
  token: null,
  authStatus: "checking",

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
  },

  // Actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "unauthenticated" });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "unauthenticated" });
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user: user, token: token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      set({ user: undefined, token: undefined, authStatus: "unauthenticated" });
      return false;
    }
  },
  register: async (fullName: string, email: string, password: string) => {
    try {
      const data = await registerAction(fullName, email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "unauthenticated" });
      return false;
    }
  },
}));
