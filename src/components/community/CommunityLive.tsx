import React, { useEffect } from "react";
import { Community } from "@/types/community";
import { CommunityService } from "./CommunityService";

interface Props {
  communities: Community[]; 
  setCommunities: React.Dispatch<React.SetStateAction<Community[]>>;
  pollIntervalMs?: number;
}

export const CommunityLive = ({
  communities,
  setCommunities,
  pollIntervalMs = 25000,
}: Props) => {
  useEffect(() => {
    // Subscribe to the service for real-time updates
    const unsub = CommunityService.subscribe((items: Community[]) => {
      const incomingMap = new Map(items.map((i) => [i.uri, i]));

      setCommunities((prev) => {
        // Update existing items with new data (like activeCount)
        const updated = prev.map((current) => {
          const freshData = incomingMap.get(current.uri);
          if (!freshData) return current;
          return { ...current, ...freshData };
        });

        // Add brand new items that appeared in the feed
        const existingUris = new Set(prev.map((c) => c.uri));
        const newItems = items.filter((it) => !existingUris.has(it.uri));

        return newItems.length ? [...updated, ...newItems] : updated;
      });
    }, pollIntervalMs);

    // Clean up interval on unmount
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [setCommunities, pollIntervalMs]);

  return null;
};

