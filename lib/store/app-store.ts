import { create } from "zustand";

type AppState = {
  isOnline: boolean;
  language: "en" | "tl";
  setOnlineStatus: (isOnline: boolean) => void;
  setLanguage: (language: "en" | "tl") => void;
};

export const useAppStore = create<AppState>((set) => ({
  isOnline: true,
  language: "en",
  setOnlineStatus: (isOnline) => set({ isOnline }),
  setLanguage: (language) => set({ language }),
}));
