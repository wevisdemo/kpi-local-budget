"use client";

import "@wevisdemo/ui/styles/cookie-consent.css";
import WvCookieConsent from "@wevisdemo/ui/react/cookie-consent";
import { useCookieConsentStore } from "../stores/useCookieConsentStore";

const cookieOptions = ["Functionality", "Performance", "Advertising"] as const;

export default function CookieConsent() {
  const setCookieConsent = useCookieConsentStore((state) => state.setCookieConsent);

  return (
    <WvCookieConsent
      policyUrl="https://punchup.world"
      cookieOptions={[...cookieOptions]}
      daysToExpire={30}
      onAccept={(option) => {
        setCookieConsent(option);

        if (option["Performance"]) {
          // Initialize or enable analytics
        }
      }}
    />
  );
}
