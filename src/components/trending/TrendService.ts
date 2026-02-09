import { Agents } from "@/utils/agents";
import { Trend, Post, Actor } from "@types";

// Simple in-memory cache to prevent 429s during rapid navigation
const cache = {
  trends: null as { data: Trend[]; timestamp: number } | null,
  details: new Map<string, { data: Trend; timestamp: number }>(),
  TTL: 5 * 60 * 1000, // 5 minutes
};

export const TrendingService = {
  list: async (): Promise<Trend[]> => {
    if (cache.trends && Date.now() - cache.trends.timestamp < cache.TTL) {
      return cache.trends.data;
    }

    const [bskyTrends, mastodonTrends] = await Promise.all([
      TrendingService.listBsky(),
      TrendingService.listMastodon(),
    ]);

    const combined = [...bskyTrends, ...mastodonTrends].sort(
      (a, b) => (b.postCount || 0) - (a.postCount || 0),
    );

    cache.trends = { data: combined, timestamp: Date.now() };
    return combined;
  },

  listBsky: async () => {
    try {
      const { data } = await Agents.public.app.bsky.unspecced.getTrends();
      return (data.trends || []).map((t: any) => ({
        ...t,
        source: "bluesky",
      }));
    } catch (err) {
      console.error("Bluesky trends error:", err);
      return [];
    }
  },

  listMastodon: async () => {
    try {
      const response = await fetch("https://mastodon.social/api/v1/trends/tags");
      if (!response.ok) throw new Error(`Mastodon List Error: ${response.status}`);
      
      const tags = await response.json();
      if (!Array.isArray(tags)) return [];

      const top = tags.slice(0, 10);

      const results = await Promise.all(
        top.map(async (tag: any) => {
          try {
            const acctRes = await fetch(
              `https://mastodon.social/api/v2/search?q=${encodeURIComponent(tag.name)}&type=accounts&limit=3`,
            );
            const acctData = acctRes.ok ? await acctRes.json() : { accounts: [] };
            const accounts = Array.isArray(acctData.accounts) ? acctData.accounts : [];

            const actors = accounts.map((a: any) => ({
              id: a.id,
              handle: a.acct,
              displayName: a.display_name || a.username,
              avatar: a.avatar,
              url: a.url,
            }));

            return {
              topic: tag.name,
              displayName: tag.name,
              postCount: parseInt(tag.history?.[0]?.uses || 0),
              actors,
              reactions: [],
              reactionCount: 0,
              status: "trending",
              active: false,
              source: "mastodon",
            };
          } catch (err) {
            return {
              topic: tag.name,
              displayName: tag.name,
              postCount: parseInt(tag.history?.[0]?.uses || 0),
              actors: [],
              reactions: [],
              status: "trending",
              active: false,
              source: "mastodon",
            };
          }
        }),
      );

      return results;
    } catch (err) {
      console.error("Mastodon trends error:", err);
      return [];
    }
  },

  get: async (topicName: string): Promise<Trend | null> => {
    const cachedDetail = cache.details.get(topicName);
    if (cachedDetail && Date.now() - cachedDetail.timestamp < cache.TTL) {
      return cachedDetail.data;
    }

    const trends = await TrendingService.list();
    const trend = trends.find((t) => t.topic === topicName);
    if (!trend) return null;

    const result = trend.source === "mastodon"
      ? await TrendingService.getMastodonDetails(trend)
      : await TrendingService.getBlueskyDetails(trend);

    if (result) {
      cache.details.set(topicName, { data: result, timestamp: Date.now() });
    }

    return result;
  },

  getBlueskyDetails: async (trend: any) => {
    try {
      const { data: searchData } = await Agents.public.app.bsky.feed.searchPosts({
        q: trend.displayName,
        sort: "top",
        limit: 4,
      });

      const actors = await TrendingService.getActorsBsky(trend);

      return {
        ...trend,
        posts: searchData.posts || [],
        actors: actors,
      };
    } catch (err) {
      console.error("Error fetching Bluesky details:", err);
      return trend;
    }
  },

  getMastodonDetails: async (trend: any) => {
    try {
      const postRes = await fetch(
        `https://mastodon.social/api/v1/timelines/tag/${encodeURIComponent(trend.topic)}?limit=4`,
      );
      const statuses = postRes.ok ? await postRes.json() : [];

      const actorRes = await fetch(
        `https://mastodon.social/api/v2/search?q=${encodeURIComponent(trend.topic)}&type=accounts&limit=5`,
      );
      const accountData = actorRes.ok ? await actorRes.json() : { accounts: [] };

      return {
        ...trend,
        posts: Array.isArray(statuses) ? statuses.map((s: any) => ({
          uri: s.id,
          author: {
            handle: s.account?.acct,
            displayName: s.account?.display_name,
            avatar: s.account?.avatar,
          },
          record: { text: s.content?.replace(/<[^>]*>/g, "") || "" },
          url: s.url,
        })) : [],
        actors: Array.isArray(accountData.accounts) ? accountData.accounts.map((a: any) => ({
          id: a.id,
          handle: a.acct,
          displayName: a.display_name || a.username,
          avatar: a.avatar,
          url: a.url,
        })) : [],
      };
    } catch (err) {
      console.error("Error fetching Mastodon details:", err);
      return trend;
    }
  },

  getActorsBsky: async (trend: any) => {
    try {
      const { data: searchData } = await Agents.public.app.bsky.feed.searchPosts({
        q: trend.displayName,
        sort: "top",
        limit: 10,
      });
      const actorMap = new Map();
      (searchData.posts || []).forEach((post: any) => {
        if (post.author && !actorMap.has(post.author.did)) {
          actorMap.set(post.author.did, post.author);
        }
      });
      return Array.from(actorMap.values()).slice(0, 5);
    } catch (err) {
      return [];
    }
  },
};