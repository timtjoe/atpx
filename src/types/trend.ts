/**
 * Represents a social media post associated with a trend, supporting Bluesky and Mastodon formats.
 */
export interface Post {
  id?: string;
  uri: string;
  url?: string;
  author: {
    handle: string;
    displayName?: string;
    avatar?: string;
  };
  record?: {
    text?: string;
  };
  [key: string]: unknown;
}

/**
 * Represents a user or entity participating in a trending topic.
 */
export interface Actor {
  id?: string | number;
  handle?: string;
  name?: string;
  displayName?: string;
  avatar?: string;
  url?: string;
}

/**
 * Represents the core data and metadata for a trending topic across different platforms.
 */
export interface Trend {
  topic: string;
  displayName: string;
  postCount: number;
  status?: "hot" | "trending" | string;
  source?: "bluesky" | "mastodon" | string;
  actors?: Actor[];
  posts?: Post[];
  reactions?: string[];
  reactionCount?: number;
  [key: string]: unknown;
}

/**
 * Props configuration for Trend components.
 */
export interface ITrendCard {
  topic: Trend;
  rank: number;
  onClick: () => void;
}

/**
 * Props for the individual post display component.
 */
export interface ITrendPost {
  post: Post;
}

/**
 * Props for the actor/user display component.
 */
export interface IActorItem {
  actor: Actor;
}