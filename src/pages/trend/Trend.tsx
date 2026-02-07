import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { ExternalLink } from "lucide-react";
import { TrendingService, TrendPost, TechnicalError } from "@components";
import { Trend, Post, Actor } from "@types";
import { RootContextType } from "@types";

export const TrendPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();

  // Use the strict context type from root.ts
  const { setNavConfig } = useOutletContext<RootContextType>();

  const [topic, setTopic] = useState<Trend | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    setError(false);
    try {
      const details = await TrendingService.get(id);

      if (details) {
        setTopic(details);

        // Push data up to the Global Navigation using the shared type structure
        setNavConfig((prev) => ({
          ...prev,
          title: details.displayName,
          showBack: true,
          tabs: [],
        }));
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // No cleanup needed here anymore because Root.tsx watches
    // the route and resets the title automatically!
  }, [id]);

  const getPostLink = (post: Post) => {
    if (post.url) return post.url;
    const postId = post.uri.split("/").pop();
    return `https://bsky.app/profile/${post.author.handle}/post/${postId}`;
  };

  if (loading && !topic) return <TrendPageSkeleton />;
  if (error || !topic) return <TechnicalError onRetry={fetchData} />;

  return (
    <PageWrapper>
      <Header>
        <MetaRow>
          {topic.status && <Badge $status={topic.status}>{topic.status}</Badge>}
          <SourceTag $source={topic.source}>{topic.source}</SourceTag>
        </MetaRow>
      </Header>

      <ScrollArea>
        {topic.posts && topic.posts.length > 0 && (
          <Section>
            <SectionHeader>Featured Discussions</SectionHeader>
            <PostGrid>
              {topic.posts.map((post) => (
                <ExternalAnchor
                  key={post.uri}
                  href={getPostLink(post)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TrendPost post={post} />
                </ExternalAnchor>
              ))}
            </PostGrid>
          </Section>
        )}

        {topic.actors && topic.actors.length > 0 && (
          <Section>
            <SectionHeader>Key Voices</SectionHeader>
            <ActorList>
              {topic.actors.map((actor: Actor) => (
                <ActorLink
                  key={actor.id}
                  href={
                    actor.url ||
                    `https://bsky.app/profile/${actor.handle || actor.id}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Avatar
                    src={actor.avatar}
                    alt={actor.displayName || actor.handle}
                  />
                  <ActorMeta>
                    <strong>{actor.displayName || actor.handle}</strong>
                    <span>@{actor.handle || actor.id}</span>
                  </ActorMeta>
                  <ExternalLink size={12} />
                </ActorLink>
              ))}
            </ActorList>
          </Section>
        )}
      </ScrollArea>
    </PageWrapper>
  );
};

/* --- Skeleton Components & Styles --- */

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const skeletonBase = css`
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite forwards;
  border-radius: 4px;
`;

const SkeletonLine = styled.div`
  ${skeletonBase} height: 14px;
  margin-bottom: 8px;
`;
const SkeletonBlock = styled.div`
  ${skeletonBase} height: 120px;
  width: 100%;
  border-radius: 12px;
`;

const TrendPageSkeleton = () => (
  <PageWrapper>
    <Header>
      <SkeletonLine style={{ width: "40%", height: "20px" }} />
    </Header>
    <ScrollArea>
      <Section>
        <SkeletonLine style={{ width: "120px", marginBottom: "20px" }} />
        <PostGrid>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBlock key={i} />
          ))}
        </PostGrid>
      </Section>
    </ScrollArea>
  </PageWrapper>
);

const PageWrapper = styled.div`
  padding: 0 var(--spacing-lg) var(--spacing-lg);
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 8px;
`;

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionHeader = styled.h4`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
  letter-spacing: 0.05em;
`;

const PostGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ExternalAnchor = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ActorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActorLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: var(--bg-soft);
  text-decoration: none;
  color: inherit;
  transition: transform 0.1s;
  &:hover {
    transform: translateX(4px);
  }
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const ActorMeta = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  strong {
    font-size: 14px;
  }
  span {
    font-size: 12px;
    color: var(--text-muted);
  }
`;

const Badge = styled.span<{ $status?: string }>`
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 99px;
  background: #f1f5f9;
  color: #64748b;
  text-transform: uppercase;
`;

const SourceTag = styled(Badge)<{ $source?: string }>`
  color: ${(props) => (props.$source === "mastodon" ? "#8c8dff" : "#0085ff")};
`;
