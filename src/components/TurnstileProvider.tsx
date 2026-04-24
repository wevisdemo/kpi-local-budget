"use client";

import {
  Turnstile,
  type TurnstileInstance,
} from "@marsidev/react-turnstile";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";

interface TurnstileContextValue {
  /**
   * Executes the invisible Turnstile widget and resolves with a fresh,
   * single-use response token. Tokens expire after ~5 minutes and cannot be
   * reused, so call this right before each protected request.
   */
  getToken: () => Promise<string>;
}

const TurnstileContext = createContext<TurnstileContextValue | null>(null);

interface PendingRequest {
  resolve: (token: string) => void;
  reject: (reason: Error) => void;
}

interface TurnstileProviderProps {
  children: ReactNode;
}

export function TurnstileProvider({ children }: TurnstileProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const widgetRef = useRef<TurnstileInstance | null>(null);
  const pendingRef = useRef<PendingRequest | null>(null);
  const queueRef = useRef<Promise<unknown>>(Promise.resolve());

  const handleSuccess = useCallback((token: string) => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    pending?.resolve(token);
  }, []);

  const handleError = useCallback(() => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    pending?.reject(new Error("Turnstile challenge failed"));
  }, []);

  const handleExpire = useCallback(() => {
    widgetRef.current?.reset();
  }, []);

  const getToken = useCallback((): Promise<string> => {
    if (!siteKey) {
      return Promise.reject(
        new Error("Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
      );
    }

    const next = queueRef.current.then(
      () =>
        new Promise<string>((resolve, reject) => {
          const widget = widgetRef.current;
          if (!widget) {
            reject(new Error("Turnstile widget is not ready"));
            return;
          }

          pendingRef.current = { resolve, reject };
          widget.reset();
          widget.execute();
        }),
    );

    queueRef.current = next.catch(() => undefined);
    return next;
  }, [siteKey]);

  return (
    <TurnstileContext.Provider value={{ getToken }}>
      {children}
      {siteKey ? (
        <Turnstile
          ref={widgetRef}
          siteKey={siteKey}
          options={{ execution: "execute", size: "invisible" }}
          onSuccess={handleSuccess}
          onError={handleError}
          onExpire={handleExpire}
          style={{ display: "none" }}
        />
      ) : null}
    </TurnstileContext.Provider>
  );
}

export function useTurnstile(): TurnstileContextValue {
  const ctx = useContext(TurnstileContext);
  if (!ctx) {
    throw new Error("useTurnstile must be used within a TurnstileProvider");
  }
  return ctx;
}
