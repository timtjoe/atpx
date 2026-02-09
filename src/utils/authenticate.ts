import { AtpAgent } from '@atproto/api';

const BSKY_SERVICE = 'https://bsky.social';
export const bskyAgent = new AtpAgent({ service: BSKY_SERVICE });

let loginPromise: Promise<void> | null = null;

const authenticate = async (): Promise<void> => {
  if (bskyAgent.hasSession) return;

  if (loginPromise) return loginPromise;

  loginPromise = (async () => {
    try {
      await bskyAgent.login({
        identifier: import.meta.env.VITE_BSKY_USER as string,
        password: import.meta.env.VITE_BSKY_PASS as string,
      });
    } catch (err) {
      loginPromise = null; // Reset so we can retry
      throw err;
    }
  })();

  return loginPromise;
};