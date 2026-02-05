import { useEffect } from "react";
import { Post, PostService } from "./PostService";

type Props = {
  posts: Post[];
  setPosts: (fn: (prev: Post[]) => Post[]) => void;
  pollIntervalMs?: number;
};

export const PostLive = ({
  posts,
  setPosts,
  pollIntervalMs = 20000,
}: Props) => {
  useEffect(() => {
    const unsub = PostService.subscribe(async (items: Post[]) => {
      const incoming = new Map(items.map((i) => [i.uri, i]));

      setPosts((prev) => {
        // Update engagement metrics for existing posts
        const updated = prev.map((p) => {
          const fresh = incoming.get(p.uri);
          if (!fresh) return p;
          // Keep existing post but update engagement metrics
          return {
            ...p,
            likes: fresh.likes,
            reposts: fresh.reposts,
            replies: fresh.replies,
            engagement: fresh.engagement,
          };
        });

        // Re-sort by engagement (popularity)
        const sorted = [...updated].sort((a, b) => b.engagement - a.engagement);

        // Append any new items not yet in the list
        const existingUris = new Set(updated.map((p) => p.uri));
        const newPosts = items.filter((i) => !existingUris.has(i.uri));
        if (newPosts.length > 0) {
          sorted.push(...newPosts.sort((a, b) => b.engagement - a.engagement));
        }

        return sorted.slice(0, 50); // Keep max 50 posts for perf
      });
    }, pollIntervalMs);

    return unsub;
  }, [setPosts, pollIntervalMs]);

  return null;
};
