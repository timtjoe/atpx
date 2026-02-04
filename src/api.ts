import { AtpAgent } from '@atproto/api';

export const agent = new AtpAgent({ service: 'https://bsky.social' });
let nextCursor: string | undefined = undefined;

export async function authenticate() {
  if (agent.hasSession) return;
  await agent.login({
    identifier: import.meta.env.VITE_BSKY_USER as string,
    password: import.meta.env.VITE_BSKY_PASS as string,
  });
}

export async function fetchPopular(isLoadMore = false) {
  if (!isLoadMore) nextCursor = undefined;
  const { data } = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 30,
    cursor: nextCursor,
  });
  nextCursor = data.cursor;
  return {
    items: data.feeds.map(f => ({ ...f, type: 'popular' })),
    cursor: data.cursor
  };
}

export async function fetchTrending() {
  const { data } = await agent.app.bsky.unspecced.getTrendingTopics();
  const items = data.topics.map((t: any) => ({
    uri: t.link,
    displayName: t.topic,
    description: t.description,
    avatar: t.avatar,
    likeCount: t.activeItemCount,
    type: 'trending'
  }));

  // Return an object structure identical to fetchPopular
  return {
    items: items,
    cursor: undefined // Trending doesn't support pagination yet
  };
}