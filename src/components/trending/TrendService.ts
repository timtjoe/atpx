import { Agents } from "@/utils/agents";
import { Trend, Post, Actor } from "@types";

export const TrendingService = {
  list: async (): Promise<Trend[]> => {
    const [bskyTrends, mastodonTrends] = await Promise.all([
      TrendingService.listBsky(),
      TrendingService.listMastodon(),
    ]);

    return [...bskyTrends, ...mastodonTrends].sort(
      (a, b) => (b.postCount || 0) - (a.postCount || 0),
    );
  },

  listBsky: async () => {
    try {
      const { data } = await Agents.public.app.bsky.unspecced.getTrends();
      return data.trends.map((t: any) => ({
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
      const response = await fetch(
        "https://mastodon.social/api/v1/trends/tags",
      );
      const tags = await response.json();
      const top = (tags || []).slice(0, 10);

      // For each top tag try to fetch a few sample accounts to show as avatars.
      const results = await Promise.all(
        top.map(async (tag: any) => {
          try {
            const acctRes = await fetch(
              `https://mastodon.social/api/v2/search?q=${encodeURIComponent(tag.name)}&type=accounts&limit=3`,
            );
            const acctData = await acctRes.json();
            const actors = (acctData.accounts || []).map((a: any) => ({
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
    const trends = await TrendingService.list();
    const trend = trends.find((t) => t.topic === topicName);
    if (!trend) return null;

    return trend.source === "mastodon"
      ? await TrendingService.getMastodonDetails(trend)
      : await TrendingService.getBlueskyDetails(trend);
  },

  getBlueskyDetails: async (trend: any) => {
    try {
      // 1. Fetch Posts
      const { data: searchData } =
        await Agents.public.app.bsky.feed.searchPosts({
          q: trend.displayName,
          sort: "top",
          limit: 4,
        });

      // 2. Fetch Actors (using your existing working Bsky logic)
      const actors = await TrendingService.getActorsBsky(trend);

      return {
        ...trend,
        posts: searchData.posts,
        actors: actors, // This ensures they show up in the Modal list
      };
    } catch (err) {
      console.error("Error fetching Bluesky details:", err);
      return trend;
    }
  },

  getMastodonDetails: async (trend: any) => {
    try {
      // 1. Fetch Posts from Tag Timeline
      const postRes = await fetch(
        `https://mastodon.social/api/v1/timelines/tag/${encodeURIComponent(trend.topic)}?limit=4`,
      );
      const statuses = await postRes.json();

      // 2. Fetch Actors (Accounts) using the search API for that tag
      const actorRes = await fetch(
        `https://mastodon.social/api/v2/search?q=${encodeURIComponent(trend.topic)}&type=accounts&limit=5`,
      );
      const accountData = await actorRes.json();

      return {
        ...trend,
        posts: statuses.map((s: any) => ({
          uri: s.id,
          author: {
            handle: s.account.acct,
            displayName: s.account.display_name,
            avatar: s.account.avatar,
          },
          record: { text: s.content.replace(/<[^>]*>/g, "") },
          url: s.url,
        })),
        actors: (accountData.accounts || []).map((a: any) => ({
          id: a.id,
          handle: a.acct,
          displayName: a.display_name || a.username,
          avatar: a.avatar,
          url: a.url,
        })),
      };
    } catch (err) {
      console.error("Error fetching Mastodon details:", err);
      return trend;
    }
  },

  // Keep your working getActorsBsky logic here
  getActorsBsky: async (trend: any) => {
    const { data: searchData } = await Agents.public.app.bsky.feed.searchPosts({
      q: trend.displayName,
      sort: "top",
      limit: 10,
    });
    const actorMap = new Map();
    searchData.posts.forEach((post: any) => {
      if (post.author && !actorMap.has(post.author.did)) {
        actorMap.set(post.author.did, post.author);
      }
    });
    return Array.from(actorMap.values()).slice(0, 5);
  },
};
