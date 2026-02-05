import { useEffect } from "react";
import { CommunityService, Community } from "./CommunityService";

type Props = {
  communities: Community[];
  setCommunities: (
    fn: (prev: Community[]) => Community[] | Community[],
  ) => void;
  pollIntervalMs?: number;
};

export const CommunityLive = ({
  communities,
  setCommunities,
  pollIntervalMs = 25000,
}: Props) => {
  useEffect(() => {
    const unsub = CommunityService.subscribe(async (items: Community[]) => {
      const incoming = new Map(items.map((i) => [i.uri, i]));

      setCommunities((prev) => {
        // Merge updates into existing order, maintain position
        const merged = prev.map((c) => {
          const update = incoming.get(c.uri);
          if (!update) return c;
          return { ...c, ...update } as Community;
        });

        // Append any new items
        const existingUris = new Set(prev.map((c) => c.uri));
        const toAppend = items.filter((it) => !existingUris.has(it.uri));
        if (toAppend.length) return merged.concat(toAppend);
        return merged;
      });
    }, pollIntervalMs);

    return () => {
      if (unsub) unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCommunities]);

  return null;
};

export default CommunityLive;
