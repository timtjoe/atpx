import { AtpAgent } from '@atproto/api';

const agent = new AtpAgent({ service: 'https://bsky.social' });

// 1. You must login to see private/restricted profiles
await agent.login({
  identifier: process.env.BSKY_USER || '', 
  password: process.env.BSKY_PASS || '',    
});

try {
  const profile = await agent.getProfile({ actor: 'bsky.app' });
  console.log("Success! Handle:", profile.data.handle);
} catch (e) {
  console.error("Still failed:", e);
}