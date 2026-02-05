import { Agents } from "@/utils/agents";

export type Community = {
  uri: string;
  displayName: string;
  description?: string;
  avatar?: string | null;
  creatorHandle?: string;
  feedUrl: string;
  profileUrl: string;
  source: "bsky" | "mastodon" | string;
  activeCount: number;
};

class CommunityServiceClass {
  private cache: Community[] = [];
  private pollHandle: any = null;

  async list(limit = 30, cursor?: string) {
    const results: Community[] = [];

    // BlueSky popular feed generators
    try {
      const tryAgents = [Agents.public, Agents.bsky];
      for (const a of tryAgents) {
        if (!a || !a.app) continue;
        try {
          const { data } = await a.app.bsky.unspecced.getPopularFeedGenerators({
            limit,
            cursor,
          });
          const mapped = (data.feeds || []).map((feed: any) => {
            const creatorHandle = feed.creator?.handle || "";
            return {
              uri: feed.uri,
              displayName: feed.displayName,
              description: feed.description,
              avatar: feed.avatar,
              creatorHandle,
              feedUrl: `https://bsky.app/profile/${feed.creator?.did || ""}/feed/${feed.uri.split("/").pop()}`,
              profileUrl: `https://bsky.app/profile/${creatorHandle}`,
              source: "bsky" as const,
              activeCount: feed.likeCount || 0,
            };
          });
          results.push(...mapped);
          break;
        } catch (err) {
          // try next agent
        }
      }
    } catch (e) {
      console.warn("bsky communities list failed", e);
    }

    // Mastodon server/hashtag info (sample alternative)
    try {
      const mastodonBase = Agents.mastodon as string | undefined;
      if (mastodonBase) {
        let base = mastodonBase;
        if (base.endsWith("/")) base = base.slice(0, -1);
        if (base.includes("/api/v1")) base = base.replace(/\/api\/v1.*$/, "");
        // Fetch trending hashtags as communities
        const url = `${base}/api/v1/trends/tags`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const mapped = (data || []).slice(0, limit).map((tag: any) => ({
            uri: `mastodon:tag:${tag.name}`,
            displayName: `#${tag.name}`,
            description: `${tag.following ? "Following" : "Trending"} community`,
            avatar: null,
            creatorHandle: "",
            feedUrl: `${base}/tags/${tag.name}`,
            profileUrl: `${base}/tags/${tag.name}`,
            source: "mastodon" as const,
            activeCount: tag.history?.[0]?.uses || 0,
          }));
          results.push(...mapped);
        }
      }
    } catch (e) {
      console.warn("mastodon communities list failed", e);
    }

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

  subscribe(callback: (items: Community[]) => void, intervalMs = 25000) {
    let mounted = true;
    const run = async () => {
      try {
        const { items } = await this.list(30);
        if (!mounted) return;
        callback(items);
      } catch (e) {
        console.warn("CommunityService subscribe failed", e);
      }
    };

    run();
    this.pollHandle = setInterval(run, intervalMs);

    return () => {
      mounted = false;
      if (this.pollHandle) clearInterval(this.pollHandle);
    };
  }

  remove(uri: string) {
    this.cache = this.cache.filter((c) => c.uri !== uri);
    return this.cache;
  }

  getCache() {
    return this.cache;
  }
}

export const CommunityService = new CommunityServiceClass();
export default CommunityService;
