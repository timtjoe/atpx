export interface Community {
  uri: string;
  displayName: string;
  description?: string;
  avatar?: string | null;
  creatorHandle?: string;
  feedUrl: string;
  profileUrl: string;
  source: "bsky" | "mastodon" | string;
  activeCount: number;
}

export interface CommunityListResponse {
  items: Community[];
  cursor?: string;
}