import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  hasFunctionalityConsent,
  useCookieConsentStore,
} from "./useCookieConsentStore";

interface FavoritesState {
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const STORAGE_KEY = "kpi-local.favorites";

// Storage that only reads/writes to localStorage if the user granted
// the Functionality cookie. Otherwise favorites live in memory only.
const consentAwareStorage = createJSONStorage<FavoritesState>(() => ({
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    if (!hasFunctionalityConsent(useCookieConsentStore.getState().selectedOptions)) {
      return null;
    }
    return window.localStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    if (!hasFunctionalityConsent(useCookieConsentStore.getState().selectedOptions)) {
      return;
    }
    window.localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(name);
  },
}));

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      toggleFavorite: (id) =>
        set((state) => {
          const next = { ...state.favorites };
          if (next[id]) {
            delete next[id];
          } else {
            next[id] = true;
          }
          return { favorites: next };
        }),
      isFavorite: (id) => !!get().favorites[id],
    }),
    {
      name: STORAGE_KEY,
      storage: consentAwareStorage,
      partialize: (state) => ({ favorites: state.favorites }) as FavoritesState,
    },
  ),
);

// When the user first grants Functionality consent, merge anything already
// saved on this device and flush any in-memory favorites to storage.
if (typeof window !== "undefined") {
  let previouslyAllowed = hasFunctionalityConsent(
    useCookieConsentStore.getState().selectedOptions,
  );

  useCookieConsentStore.subscribe((state) => {
    const nowAllowed = hasFunctionalityConsent(state.selectedOptions);
    if (nowAllowed && !previouslyAllowed) {
      const inMemory = useFavoritesStore.getState().favorites;
      useFavoritesStore.persist.rehydrate();
      const afterRehydrate = useFavoritesStore.getState().favorites;
      useFavoritesStore.setState({
        favorites: { ...afterRehydrate, ...inMemory },
      });
    }
    previouslyAllowed = nowAllowed;
  });
}
