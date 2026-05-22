"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PlanColorState {
  colorByCategory: Record<string, string>;
  setColor: (category: string, color: string) => void;
}

const STORAGE_KEY = "kpi-local.plan-color";

const sessionStorageJSON = createJSONStorage<PlanColorState>(() => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    };
  }
  return window.sessionStorage;
});

export const usePlanColorStore = create<PlanColorState>()(
  persist(
    (set) => ({
      colorByCategory: {},
      setColor: (category, color) =>
        set((state) => {
          if (state.colorByCategory[category] === color) return state;
          return {
            colorByCategory: {
              ...state.colorByCategory,
              [category]: color,
            },
          };
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: sessionStorageJSON,
      partialize: (state) =>
        ({ colorByCategory: state.colorByCategory }) as PlanColorState,
    },
  ),
);
