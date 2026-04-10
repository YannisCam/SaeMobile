import { create } from "zustand";
import { apiService } from "@/services/api";

interface AuthStore {
  isLoggedIn: boolean;
  user: { id: string; identifiant: string; role: "user" | "admin" } | null;
  login: (identifiant: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  login: async (identifiant: string, password: string) => {
    try {
      const response = await apiService.login(identifiant, password);
      
      if (response.error) {
        return { success: false, error: response.error };
      }

      if (response.data) {
        await apiService.setToken(response.data.token);
        set({
          isLoggedIn: true,
          user: {
            id: String(response.data.id),
            identifiant: response.data.identifiant,
            role: "admin", // API doesn't specify, assuming admin for now
          },
        });
        return { success: true };
      }

      return { success: false, error: "Unknown error" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  logout: async () => {
    await apiService.clearToken();
    set({ isLoggedIn: false, user: null });
  },
}));
