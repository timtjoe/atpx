import { Agents } from "@/utils/agents";
import { IPost as Post } from "@/types";

class PostServiceClass {
  private cache: Post[] = [];
  private pollHandle: any = null;


  async list(limit = 30, currentUris: string[] = []) {
    try {
      // If cache is empty, do the initial fetch
      if (this.cache.length === 0) {
        const baseUrl = Agents.mastodon || "https://mastodon.social";
        const normalized = baseUrl.replace(/\/$/, "");
        const res = await fetch(`${normalized}/api/v1/trends/statuses?limit=80`);
        
        if (res.ok) {
          const statuses = await res.json();
          this.cache = statuses.map((status: any) => ({
            uri: status.url,
            authorHandle: status.account.acct,
            authorName: status.account.display_name,
            authorAvatar: status.account.avatar,
            content: status.content.replace(/<[^>]*>/g, "").substring(0, 280),
            createdAt: status.created_at,
            likes: status.favourites_count || 0,
            reposts: status.reblogs_count || 0,
            replies: status.replies_count || 0,
            source: "mastodon",
            postUrl: status.url,
            profileUrl: status.account.url,
            engagement: (status.favourites_count || 0) + (status.reblogs_count * 2)
          })).sort((a: any, b: any) => b.engagement - a.engagement);
        }
      }

      // Pagination logic: Return items NOT already in currentUris
      const unseen = this.cache.filter(p => !currentUris.includes(p.uri));
      const items = unseen.slice(0, limit);

      return { 
        items, 
        hasMore: unseen.length > limit 
      };
    } catch (e) {
      throw e; // Throw so ErrorBoundary can catch it
    }
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
