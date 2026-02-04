import { AtpAgent } from '@atproto/api';

// Configurable service endpoint
const SERVICE_URL = 'https://bsky.social'; 
const agent = new AtpAgent({ service: SERVICE_URL });

export async function authenticate() {
  await agent.login({
    identifier: import.meta.env.VITE_BSKY_USER || '',
    password: import.meta.env.VITE_BSKY_PASS || '',
  });
}

export async function fetchEntries(limit = 30) {
  // Using the 'unspecced' generic endpoint for global discovery
  const { data } = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit,
  });
  return data.feeds;
}