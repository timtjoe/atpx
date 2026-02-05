import { AtpAgent } from '@atproto/api';

export const agent = new AtpAgent({ service: 'https://bsky.social' });
let nextCursor: string | undefined = undefined;

let loginPromise: Promise<void> | null = null;

export async function authenticate() {
  if (agent.hasSession) return;

  if (loginPromise) {
    return loginPromise;
  }

  loginPromise = (async () => {
    try {
      await agent.login({
        identifier: import.meta.env.VITE_BSKY_USER as string,
        password: import.meta.env.VITE_BSKY_PASS as string,
      });
    } catch (err) {
      loginPromise = null;
      throw err;
    }
  })();

  return loginPromise;
}

export async function fetchPopular(isLoadMore = false) {
  if (!isLoadMore) nextCursor = undefined;
  
  const { data } = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 30,
    cursor: nextCursor,
  });
  
  nextCursor = data.cursor;

  return {
    // Ensure we are mapping 'feeds' correctly
    items: data.feeds.map(f => ({
      uri: f.uri,
      displayName: f.displayName,
      description: f.description,
      avatar: f.avatar,
      creator: f.creator,
      likeCount: f.likeCount,
      type: 'popular'
    })),
    cursor: data.cursor
  };
}

export async function fetchTrending() {
  const { data } = await agent.app.bsky.unspecced.getTrendingTopics();
  console.log("Fetched trending topics:", JSON.stringify(data, null, 2));
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

export async function fetchPeople() {
  const { data } = await agent.app.bsky.actor.getSuggestions({ limit: 30 });
  
  return {
    items: data.actors.map((actor: any) => ({
      uri: actor.did, // Use DID as the unique key
      displayName: actor.displayName || actor.handle,
      description: actor.description,
      avatar: actor.avatar,
      handle: actor.handle,
      type: 'person', // Important for conditional rendering
      likeCount: 0 // Placeholder to match your feed structure
    })),
    cursor: undefined // Suggestions usually don't paginate via cursor
  };
}