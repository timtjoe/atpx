import { Agents } from "@/utils/agents";
import { Community, CommunityListResponse } from "@types";

class CommunityServiceClass {
  private cache: Community[] = [];
  private pollHandle: ReturnType<typeof setInterval> | null = null;

  /**
   * Fetches communities from BlueSky and Mastodon
   */
  public async list(
    limit: number = 30,
    cursor?: string,
  ): Promise<CommunityListResponse> {
    const results: Community[] = [];

    // 1. BlueSky popular feed generators
    try {
      const tryAgents = [Agents.public, Agents.bsky];
      for (const a of tryAgents) {
        if (!a?.app) continue;
        try {
          const { data } = await a.app.bsky.unspecced.getPopularFeedGenerators({
            limit,
            cursor,
          });

          const mapped: Community[] = (data.feeds || []).map((feed: any) => {
            const creatorHandle = feed.creator?.handle || "";
            return {
              uri: feed.uri,
              displayName: feed.displayName,
              description: feed.description,
              avatar: feed.avatar,
              creatorHandle,
              feedUrl: `https://bsky.app/profile/${feed.creator?.did || ""}/feed/${feed.uri.split("/").pop()}`,
              profileUrl: `https://bsky.app/profile/${creatorHandle}`,
              source: "bsky",
              activeCount: feed.userCount || feed.likeCount || 0,
            };
          });
          results.push(...mapped);
          break;
        } catch (err) {
          continue;
        }
      }
    } catch (e) {
      console.warn("bsky communities list failed", e);
    }

    // 2. Mastodon trending tags
    try {
      const mastodonBase = Agents.mastodon as string | undefined;
      if (mastodonBase) {
        const base = mastodonBase
          .replace(/\/$/, "")
          .replace(/\/api\/v1.*$/, "");
        const res = await fetch(`${base}/api/v1/trends/tags`);

        if (res.ok) {
          const data = await res.json();
          const mapped: Community[] = (data || [])
            .slice(0, limit)
            .map((tag: any) => ({
              uri: `mastodon:tag:${tag.name}`,
              displayName: `#${tag.name}`,
              description: `${tag.history?.[0]?.accounts || 0} people talking about this`,
              avatar: null,
              creatorHandle: "",
              feedUrl: `${base}/tags/${tag.name}`,
              profileUrl: `${base}/tags/${tag.name}`,
              source: "mastodon",
              activeCount: tag.history?.[0]?.uses || 0,
            }));
          results.push(...mapped);
        }
      }
    } catch (e) {
      console.warn("mastodon communities list failed", e);
    }

    const seen = new Set<string>();
    const deduped = results.filter((r) => {
      if (seen.has(r.uri)) return false;
      seen.add(r.uri);
      return true;
    });

    this.cache = deduped;
    return { items: deduped, cursor: undefined };
  }

  /**
   * Real-time subscription for UI updates
   */
  public subscribe(
    callback: (items: Community[]) => void,
    intervalMs: number = 25000,
  ): () => void {
    let mounted = true;

    const run = async () => {
      try {
        const { items } = await this.list(30);
        if (mounted) callback(items);
      } catch (e) {
        console.warn("CommunityService subscribe failed", e);
      }
    };

    run();
    const handle = setInterval(run, intervalMs);

    return () => {
      mounted = false;
      clearInterval(handle);
    };
  }

  public remove(uri: string): Community[] {
    this.cache = this.cache.filter((c) => c.uri !== uri);
    return this.cache;
  }

  public getCache(): Community[] {
    return this.cache;
  }
}

export const CommunityService = new CommunityServiceClass();
