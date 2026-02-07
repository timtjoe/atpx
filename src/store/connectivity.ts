import { atom, useAtom } from 'jotai';

/**
 * Internal Jotai atom that tracks the browser's connectivity state.
 * Initialized with the current navigator status if available (SSR safe).
 * * @private
 */
const baseAtom = atom<boolean>(
  typeof window !== "undefined" ? window.navigator.onLine : true
);

/**
 * Lifecycle management for the connectivity atom.
 * Handles event listener attachment on first mount and automatic 
 * cleanup when no components are observing the state.
 */
baseAtom.onMount = (setAtom) => {
  console.log("🌐 Connectivity Monitor: Mounted");

  const handleStatus = () => {
    const status = window.navigator.onLine;
    console.log(`🌐 Connectivity Change: ${status ? "Online" : "Offline"}`);
    setAtom(status);
  };

  window.addEventListener("online", handleStatus);
  window.addEventListener("offline", handleStatus);

  return () => {
    console.log("🌐 Connectivity Monitor: Unmounted");
    window.removeEventListener("online", handleStatus);
    window.removeEventListener("offline", handleStatus);
  };
};

/**
 * A custom hook that provides the current browser connectivity status.
 * * This hook uses a global Jotai atom under the hood, ensuring that only one
 * set of event listeners is active regardless of how many components call it.
 * * @example
 * const isOnline = useOnline();
 * if (!isOnline) return <OfflineWarning />;
 * * @returns {boolean} True if the browser is online, false otherwise.
 * @category Hooks
 */
export const useOnline = (): boolean => {
  const [isOnline] = useAtom(baseAtom);
  return isOnline;
};