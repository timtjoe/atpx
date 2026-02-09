import { AtpAgent } from "@atproto/api";
import { bskyAgent } from "./authenticate";

// Public agent for trending/public discovery (faster, no auth needed)
const publicAgent = new AtpAgent({
  service: "https://public.api.bsky.app",
});

// Mastodon public API (no auth needed for public endpoints)
const mastodonAPI = "https://mastodon.social/api/v1";

export const Agents = {
  bsky: bskyAgent,
  public: publicAgent,
  mastodon: mastodonAPI,
  // Extendable for Mastodon/Fediverse agents later
};
