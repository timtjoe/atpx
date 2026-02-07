import { useState, useEffect } from "react";

/**
 * Standard TypeScript signature for a custom hook.
 * Returns a boolean representing the browser's connectivity status.
 */
export const useOnline = (): boolean => {
  // Initialize state. We check for 'window' to avoid errors during SSR (Next.js/Remix)
  const [isOnline, setOnline] = useState<boolean>(
    typeof window !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    // Explicitly typing the handlers as EventListener functions
    const handleOnline: EventListener = () => setOnline(true);
    const handleOffline: EventListener = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup phase
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};