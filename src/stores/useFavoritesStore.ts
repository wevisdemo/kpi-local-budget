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

// One year in seconds.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const target = `${encodeURIComponent(name)}=`;
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    if (part.startsWith(target)) {
      return decodeURIComponent(part.slice(target.length));
    }
  }
  return null;
};

const writeCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  const encoded = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  document.cookie = `${encoded}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0; SameSite=Lax`;
};

// Storage that only reads/writes to cookies if the user granted
// the Functionality cookie. Otherwise favorites live in memory only.
const consentAwareStorage = createJSONStorage<FavoritesState>(() => ({
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    if (!hasFunctionalityConsent(useCookieConsentStore.getState().selectedOptions)) {
      return null;
    }
    return readCookie(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    if (!hasFunctionalityConsent(useCookieConsentStore.getState().selectedOptions)) {
      return;
    }
    writeCookie(name, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    deleteCookie(name);
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
