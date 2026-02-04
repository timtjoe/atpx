import { AtpAgent } from '@atproto/api';

export const agent = new AtpAgent({ service: 'https://bsky.social' });

export const authenticate = async () => {
  if (agent.hasSession) return; 

  return await agent.login({
    identifier: import.meta.env.VITE_BSKY_USER as string,
    password: import.meta.env.VITE_BSKY_PASS as string,
  });
};

export const fetchFeeds = async ({ pageParam }: { pageParam?: string }) => {
  const { data } = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 30,
    cursor: pageParam,
  });
  return data;
};

export const fetchTrending = async () => {
  const { data } = await agent.app.bsky.unspecced.getTrendingTopics();
  return data.topics as any[];
};