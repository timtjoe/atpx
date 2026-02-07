import React, { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useOnline } from "@/store/connectivity";
import { withToaster } from "@/store/toaster";

export const ConnectivityManager: React.FC = (): null => {
  const isOnline = useOnline(); // Read-only global state
  const { showToast } = withToaster();
  
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    // Avoid firing toasts on page reload
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!isOnline) {
      showToast(
        <span>
          <strong>Connection Lost:</strong> You are offline.
        </span>,
        {
          id: "connection-error",
          duration: Infinity,
          icon: "🌐",
        }
      );
    } else {
      toast.success("Back online!", { id: "connection-error" });
    }
  }, [isOnline, showToast]);

  return null;
};