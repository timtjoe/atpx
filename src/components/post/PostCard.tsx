import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { IPost as Post } from "@/types/post";
import { Icons } from "@/components/icons";
import { Chip, Dot, LinkButton } from "@components";

/* --- Utilities --- */
const getSourceIcon = (source: string) => {
  switch (source.toLowerCase()) {
    case "bsky":
      return <Icons.bluesky size={14} />;
    case "mastodon":
      return <Icons.mastodon size={14} />;
    default:
      return <Icons.globe />;
  }
};

const decodeHTMLEntities = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

/* --- Main Component --- */

export const PostCard = ({ post }: { post: Post }) => {
  const Icon = useMemo(() => getSourceIcon(post.source), [post.source]);
  const decodedContent = useMemo(
    () => decodeHTMLEntities(post.content || ""),
    [post.content],
  );

  const meta = useMemo(() => {
    const total = (post.likes || 0) + (post.reposts || 0) + (post.replies || 0);
    const date = new Date(post.createdAt).toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return { total: total.toLocaleString(), date };
  }, [post.likes, post.reposts, post.replies, post.createdAt]);

  const reactions =
    Number(meta.total) < 1000
      ? meta.total
      : new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 1,
        })
          .format(Number(meta.total))
          .toLowerCase();

  return (
    <Card>
      <Header>
        <Author
          href={post.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar
            src={post.authorAvatar || "/fallback-avatar.png"}
            alt=""
            loading="lazy"
          />
          <AuthorMeta>
            <AuthorName>{post.authorName || post.authorHandle}</AuthorName>
            <Middot />
            <AuthorHandle>@{post.authorHandle}</AuthorHandle>
          </AuthorMeta>
        </Author>
        {/* <SourceBadge
          href={
            post.source === "bsky"
              ? "https://bsky.app"
              : "https://joinmastodon.org"
          }
          target="_blank"
        >
          {Icon}
        </SourceBadge> */}
      </Header>

      <ContentWrapper>
        <ContentText>{decodedContent}</ContentText>
      </ContentWrapper>

      <Footer>
        <FooterText>
          <ExButton
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {Icon}
            <span>Open link</span>
            <Icons.external size={10} />
          </ExButton>
          <IconChip>
            <IconStack>
              {/* <Icons.heart size={13} /> */}
              <Icons.comment size={13} />
            </IconStack>
            {meta.total} Reactions
          </IconChip>

          <RightMeta>
            <time dateTime={post.createdAt}>{meta.date}</time>
          </RightMeta>
        </FooterText>
      </Footer>
    </Card>
  );
};

/* --- Animations --- */
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* --- Styled Components --- */
const Card = styled.article`
  display: flex;
  flex-direction: column;
  padding: 0;
  background: var(--bg-white);
  width: 100%;
  animation: ${slideDown} 0.2s ease-out forwards;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
`;

const Author = styled.a`
  display: flex;
  align-items: center;
  gap: 2.5px;
  text-decoration: none;
  min-width: 0;
`;

const Avatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-grey);
  border: thin solid var(--border-subtle);
  margin-right: var(--spacing-xs);
`;

const AuthorMeta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
  gap: var(--spacing-sm);
`;

const AuthorName = styled.span`
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--text-bold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AuthorHandle = styled.span`
  font-size: var(--font-xs);
  color: var(--text-grey);
`;

const SourceBadge = styled.a`
  margin-left: auto;
`;

const Middot = styled(Dot)`
  padding: 0;
  margin: 0;
  width: 2px;
  height: 2px;
  background-color: var(--text-grey);
`;

const ContentWrapper = styled.div`
  margin: var(--spacing-sm) var(--spacing-md);
  margin-top: 0;
  cursor: default;
`;

const ContentText = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: normal;
  color: var(--text-black);
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  hyphens: auto;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-wrap;

  /* font-family:
    "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif; */

  @media screen and (max-width: 768px) {
  }
`;

const Footer = styled(Header)`
  padding: 0 var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--spacing-sm);
`;

const ExButton = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-soft);
  border-radius: var(--radius-md);
  font-size: var(--font-xs);
  color: var(--text-black);
  border: thin solid var(--border-subtle);

  &:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 768px) {
    padding: var(--spacing-sm);
  }
`;

const IconChip = styled(Chip)`
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: normal;
  color: var(--text-black);
  font-size: var(--font-xs);
  border: unset;

  @media screen and (max-width: 768px) {
    padding: var(--spacing-sm);
  }
`;

const IconStack = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    background: var(--bg-white);
  }
`;

const RightMeta = styled.div`
  margin-left: auto;
  text-transform: uppercase;
  color: var(--text-grey);
  font-size: var(--font-xs);
`;
