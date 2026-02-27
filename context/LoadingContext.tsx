"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface LoadingContextValue {
  /** Call this with any promise that must resolve before the page is shown. */
  registerLoading: (promise: Promise<unknown>) => void;
  /**
   * Re-show the overlay (for client-side navigation).
   * Call this in a useLayoutEffect at the top of the page component,
   * then immediately registerLoading() with the work that needs to finish.
   */
  startLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  registerLoading: () => {},
  startLoading: () => {},
});

export function useLoading() {
  return useContext(LoadingContext);
}

interface Props {
  children: ReactNode;
  /** Overlay component rendered while loading */
  overlay: ReactNode;
}

export function LoadingProvider({ children, overlay }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const pendingRef = useRef(0);
  const resolvedRef = useRef(false);

  const resolve = useCallback(() => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    setFadeOut(true);
    setTimeout(() => setIsLoaded(true), 700);
  }, []);

  /** Re-show the overlay — resets all state so registerLoading works again. */
  const startLoading = useCallback(() => {
    resolvedRef.current = false;
    pendingRef.current = 0;
    setFadeOut(false);
    setIsLoaded(false);
  }, []);

  const registerLoading = useCallback(
    (promise: Promise<unknown>) => {
      pendingRef.current += 1;
      promise.finally(() => {
        pendingRef.current -= 1;
        if (pendingRef.current <= 0) resolve();
      });
    },
    [resolve]
  );

  // If nothing was registered within the first paint, resolve after 200 ms.
  useEffect(() => {
    const t = setTimeout(() => {
      if (pendingRef.current === 0) resolve();
    }, 200);
    return () => clearTimeout(t);
  }, [resolve]);

  // Absolute safety net — never block the user for more than 8 s.
  useEffect(() => {
    const t = setTimeout(resolve, 8000);
    return () => clearTimeout(t);
  }, [resolve]);

  return (
    <LoadingContext.Provider value={{ registerLoading, startLoading }}>
      {/* Overlay — always mounted while !isLoaded so it fades out gracefully */}
      {!isLoaded && (
        <div
          className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black
            transition-opacity duration-700
            ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          {overlay}
        </div>
      )}

      {/* Page content — fades in once loading is done */}
      <div
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
