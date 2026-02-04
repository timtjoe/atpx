import { AtpAgent } from '@atproto/api';

export const agent = new AtpAgent({ service: 'https://bsky.social' });
let nextCursor: string | undefined = undefined;

export async function authenticate() {
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
  return data.feeds.map(f => ({ ...f, type: 'popular' }));
}

export async function fetchTrending() {
  const { data } = await agent.app.bsky.unspecced.getTrendingTopics();
  return data.topics.map((t: any) => ({
    uri: t.link,
    displayName: t.topic,
    description: t.description,
    avatar: t.avatar,
    likeCount: t.activeItemCount,
    type: 'trending'
  }));
}