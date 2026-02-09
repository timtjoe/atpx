import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IPost as Post } from "@/types/post";

export const PostCard = ({ post }: { post: Post }) => {
  const sourceEmoji = post.source === "bsky" ? "🦋" : "🐘";

  // Clean reactions logic
  const totalReactions = (
    (post.likes || 0) +
    (post.reposts || 0) +
    (post.replies || 0)
  ).toLocaleString();

  const formattedDate = new Date(post.createdAt)
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <CardWrapper
      as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <HeaderSection>
        <AuthorLink href={post.profileUrl} target="_blank">
          {/* Fixed: prevents empty string src error */}
          <Avatar src={post.authorAvatar || undefined} alt="" />
          <AuthorMeta>
            <AuthorName>{post.authorName || post.authorHandle}</AuthorName>
            <AuthorHandle>@{post.authorHandle}</AuthorHandle>
          </AuthorMeta>
        </AuthorLink>

        <SourceBadge
          href={
            post.source === "bsky"
              ? "https://bsky.app"
              : "https://joinmastodon.org"
          }
          target="_blank"
        >
          {sourceEmoji}
        </SourceBadge>
      </HeaderSection>

      <ContentLink href={post.postUrl} target="_blank">
        <ContentText>{post.content}</ContentText>
      </ContentLink>

      <FooterSection>
        <FooterText>
          <ReactionCount>{totalReactions} reactions</ReactionCount>
          <DotSeparator />
          {post.category || "trending"}
          <DotSeparator />
          {formattedDate}
        </FooterText>
      </FooterSection>
    </CardWrapper>
  );
};

/* --- Styled Components --- */

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background: var(--bg-white);
  width: 100%;
  border-bottom: 1px solid var(--border-light);
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const AuthorLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  min-width: 0;
  &:hover span:first-child {
    text-decoration: underline;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: var(--round);
  object-fit: cover;
  background: var(--bg-grey);
`;

const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const AuthorName = styled.span`
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--text-bold);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AuthorHandle = styled.span`
  font-size: var(--font-xs);
  color: var(--text-muted);
`;

const SourceBadge = styled.a`
  font-size: 18px;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: background 0.2s;
  &:hover {
    background: var(--bg-grey);
  }
`;

const ContentLink = styled.a`
  display: block;
  margin-bottom: var(--spacing-lg);
  &:hover p {
    color: var(--text-blue);
  }
`;

const ContentText = styled.p`
  display: -webkit-box;
  /* -webkit-line-clamp: 5; */
  /* -webkit-box-orient: vertical; */
  font-size: 30px;
  line-height: 40px;
  font-weight: 700;
  color: var(--text-black);
  overflow: hidden;
`;

const FooterSection = styled.div`
  padding-top: var(--spacing-md);
`;

const FooterText = styled.div`
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ReactionCount = styled.span`
  font-weight: 700;
  color: var(--text-bold);
`;

const DotSeparator = styled.span`
  &::before {
    content: "•";
  }
  opacity: 0.5;
`;
