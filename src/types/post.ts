export type IPost = {
  uri: string;
  cid?: string;
  authorHandle: string;
  authorName?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  reposts: number;
  replies: number;
  source: "bsky" | "mastodon";
  postUrl: string;
  profileUrl: string;
  engagement: number;
  category?: string;
};

interface PostListResponse {
  items: IPost[];
  cursor?: string;
}