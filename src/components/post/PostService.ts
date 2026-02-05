import { Agents } from "@/utils/agents";

export type Post = {
  uri: string;
  cid?: string;
  authorHandle: string;
  authorName?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  reposts: number;
  replies: number;
  source: "bsky" | "mastodon";
  postUrl: string;
  profileUrl: string;
  engagement: number; // Combined score for popularity
};

class PostServiceClass {
  private cache: Post[] = [];
  private pollHandle: any = null;

  async list(limit = 30, cursor?: string) {
    const results: Post[] = [];

    // Mastodon trending statuses (more reliable than public timeline)
    try {
      const baseUrl = Agents.mastodon || "https://mastodon.social/api/v1";
      const normalized = baseUrl
        .replace(/\/$/, "")
        .replace(/\/api\/v1\/?$/, "");

      // Use trending statuses endpoint which is more accessible
      const endpoint = `${normalized}/api/v1/trends/statuses?limit=${Math.min(limit, 40)}`;

      const res = await fetch(endpoint);
      if (res.ok) {
        const statuses = await res.json();
        const mapped = (statuses || []).map((status: any) => {
          const engagement =
            (status.favourites_count || 0) +
            (status.reblogs_count || 0) * 2 +
            (status.replies_count || 0);

          return {
            uri: status.url,
            cid: status.id,
            authorHandle: status.account.acct,
            authorName: status.account.display_name,
            authorAvatar: status.account.avatar,
            content: status.content
              .replace(/<[^>]*>/g, "")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .substring(0, 280),
            createdAt: status.created_at,
            likes: status.favourites_count || 0,
            reposts: status.reblogs_count || 0,
            replies: status.replies_count || 0,
            source: "mastodon" as const,
            postUrl: status.url,
            profileUrl: status.account.url,
            engagement,
          };
        });
        results.push(...mapped);
      } else {
        console.warn(`Mastodon trending failed with status ${res.status}`);
      }
    } catch (e) {
      console.warn("mastodon posts list failed", e);
    }

    // Sort by engagement (popularity) descending
    results.sort((a, b) => b.engagement - a.engagement);

    // Deduplicate by URI
    const seen = new Set<string>();
    const deduped = results.filter((r) => {
      if (seen.has(r.uri)) return false;
      seen.add(r.uri);
      return true;
    });

    this.cache = deduped;
    return { items: deduped, cursor: undefined };
  }

  subscribe(callback: (items: Post[]) => void, intervalMs = 20000) {
    let mounted = true;
    const run = async () => {
      try {
        const { items } = await this.list(30);
        if (!mounted) return;
        callback(items);
      } catch (e) {
        console.warn("PostService subscribe failed", e);
      }
    };

    run();
    this.pollHandle = setInterval(run, intervalMs);

    return () => {
      mounted = false;
      if (this.pollHandle) clearInterval(this.pollHandle);
    };
  }

  getCache() {
    return this.cache;
  }
}

export const PostService = new PostServiceClass();
