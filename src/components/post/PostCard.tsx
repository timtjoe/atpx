import styled from "styled-components";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Post } from "./PostService";

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const sourceEmoji = post.source === "bsky" ? "🦋" : "🐘";

  return (
    <Card
      as={motion.a}
      href={post.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
    >
      <SourceBadge>{sourceEmoji}</SourceBadge>

      <Header>
        <AuthorAvatar src={post.authorAvatar} alt={post.authorHandle} />
        <AuthorInfo>
          <AuthorName>{post.authorName || post.authorHandle}</AuthorName>
          <AuthorHandle>@{post.authorHandle}</AuthorHandle>
        </AuthorInfo>
      </Header>

      <Content>{post.content}</Content>

      <EngagementMetrics>
        <MetricItem>
          <MessageCircle size={14} />
          <MetricValue>{post.replies > 0 ? post.replies : "0"}</MetricValue>
        </MetricItem>
        <MetricItem>
          <Repeat2 size={14} />
          <MetricValue>{post.reposts > 0 ? post.reposts : "0"}</MetricValue>
        </MetricItem>
        <MetricItem>
          <Heart size={14} />
          <MetricValue>{post.likes > 0 ? post.likes : "0"}</MetricValue>
        </MetricItem>
      </EngagementMetrics>

      <Timestamp>{formatTime(post.createdAt)}</Timestamp>
    </Card>
  );
};

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export const Card = styled.a`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 14px;
  gap: 10px;
  width: 100%;
  max-height: 420px;
  min-height: 320px;
  cursor: pointer;
  position: relative;
  transition: all 0.25s ease;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &:hover {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    background: #fafafa;
  }

  /* Tablet sizing */
  @media (max-width: 1024px) {
    padding: 12px;
    gap: 8px;
    max-height: 380px;
    min-height: 300px;
  }

  /* Mobile sizing - smaller cards */
  @media (max-width: 768px) {
    padding: 10px;
    gap: 6px;
    max-height: 360px;
    min-height: 280px;
  }

  /* Small mobile */
  @media (max-width: 480px) {
    padding: 8px;
    gap: 5px;
    max-height: 340px;
    min-height: 240px;
  }
`;

export const SourceBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  opacity: 0.8;
  z-index: 5;
  transition: opacity 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-top: 4px;
`;

export const AuthorAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: #eee;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`;

export const AuthorName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const AuthorHandle = styled.div`
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const Content = styled.div`
  font-size: 14px;
  color: #222;
  line-height: 1.5;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  flex: 1;
  margin: 2px 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
    -webkit-line-clamp: 3;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
`;

export const EngagementMetrics = styled.div`
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #666;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 10px;
    font-size: 11px;
    padding-top: 8px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    font-size: 10px;
    padding-top: 6px;
  }
`;

export const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    color: #ff6600;
    opacity: 0.8;
  }
`;

export const MetricValue = styled.span`
  font-size: 11px;
  color: #666;
  font-weight: 500;
`;

export const Timestamp = styled.div`
  font-size: 11px;
  color: #999;
  margin-top: 6px;
`;
