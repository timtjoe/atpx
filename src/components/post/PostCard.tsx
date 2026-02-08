import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IPost as Post } from "@/types/post";

export const PostCard = ({ post }: { post: Post }) => {
  const sourceEmoji = post.source === "bsky" ? "🦋" : "🐘";
  const totalReactions = (
    post.likes +
    post.reposts +
    post.replies
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
      <Header>
        <AuthorLink href={post.profileUrl} target="_blank">
          <Avatar src={post.authorAvatar} alt="" />
          <AuthorMeta>
            <Name>{post.authorName || post.authorHandle}</Name>
            <Handle>@{post.authorHandle}</Handle>
          </AuthorMeta>
        </AuthorLink>

        <SourceLink
          href={
            post.source === "bsky"
              ? "https://bsky.app"
              : "https://joinmastodon.org"
          }
          target="_blank"
        >
          {sourceEmoji}
        </SourceLink>
      </Header>

      <ContentLink href={post.postUrl} target="_blank">
        <ContentText>{post.content}</ContentText>
      </ContentLink>

      <Footer>
        <FooterText>
          <Bold>{totalReactions} reactions</Bold> &middot;{" "}
          {post.category || "trending"} &middot; {formattedDate}
        </FooterText>
      </Footer>
    </CardWrapper>
  );
};

/* --- Styled Components with Visual Breathing Room --- */

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md); /* Standard breathing room */
  background: transparent;
  /* border-bottom: 1px solid var(--border-light); */
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px; /* Gap between header and content */
`;

const AuthorLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  min-width: 0;

  &:hover span {
    text-decoration: underline;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-soft);
`;

const AuthorMeta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-bold);
  line-height: 1.2;
`;

const Handle = styled.span`
  font-size: 12px;
  color: var(--text-muted);
`;

const SourceLink = styled.a`
  font-size: 18px;
  text-decoration: none;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: var(--bg-soft);
  }
`;

const ContentLink = styled.a`
  text-decoration: none;
  color: inherit;
  margin-bottom: 16px; /* Space before footer */

  &:hover p {
    color: var(--text-main-hover, #000);
  }
`;

const ContentText = styled.p`
  font-size: 15px;
  line-height: 1.6; /* High readability line height */
  color: var(--text-main);
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  padding-top: 12px;
  /* border-top: 1px solid var(--border-extra-light, #f5f5f5); */
`;

const FooterText = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Bold = styled.span`
  font-weight: 700;
  color: var(--text-bold);
`;
