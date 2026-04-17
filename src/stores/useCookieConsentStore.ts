import { create } from "zustand";
import type { ComponentProps } from "react";
import type WvCookieConsent from "@wevisdemo/ui/react/cookie-consent";

type CookieSelections = Parameters<
  ComponentProps<typeof WvCookieConsent>["onAccept"]
>[0];

interface CookieConsentState {
  consentId: string | null;
  selectedOptions: CookieSelections | null;
  acceptedAt: string | null;
  setCookieConsent: (selectedOptions: CookieSelections) => void;
}

const generateConsentId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `consent-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useCookieConsentStore = create<CookieConsentState>((set) => ({
  consentId: null,
  selectedOptions: null,
  acceptedAt: null,
  setCookieConsent: (selectedOptions) =>
    set({
      consentId: generateConsentId(),
      selectedOptions,
      acceptedAt: new Date().toISOString(),
    }),
}));
