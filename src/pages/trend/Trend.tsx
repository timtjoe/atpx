import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { TrendingService, TechnicalError } from "@components";
import { PostCard } from "@components/post"; 
import { PeopleCard } from "@components/people";
import { Trend, Post, Actor, RootContextType } from "@types";
import { Person } from "@components/people/PeopleService";
import { IPost } from "@/types/post";

export const TrendPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
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
  }, [id]);

const mapToPostCardData = (p: Post): IPost => {
  // Explicitly cast numbers to ensure they aren't treated as unknown
  const likes = Number(p.likeCount || 0);
  const reposts = Number(p.repostCount || 0);
  const replies = Number(p.replyCount || 0);
  
  return {
    uri: String(p.uri),
    cid: String(p.cid || ""),
    authorHandle: String(p.author.handle || ""),
    authorName: String(p.author.displayName || p.author.handle || ""),
    authorAvatar: p.author.avatar ? String(p.author.avatar) : undefined,
    profileUrl: `https://bsky.app/profile/${p.author.handle}`,
    content: String(p.record?.text || p.content || ""),
    createdAt: String(p.indexedAt || new Date().toISOString()),
    postUrl: p.url || `https://bsky.app/profile/${p.author.handle}/post/${String(p.uri).split("/").pop()}`,
    likes,
    reposts,
    replies,
    engagement: likes + reposts + replies,
    source: (topic?.source || "bsky") as "bsky" | "mastodon",
  };
};

  const mapActorToPerson = (actor: Actor): Person => ({
    uri: String(actor.id),
    handle: actor.handle,
    displayName: actor.displayName || actor.handle || "",
    avatar: actor.avatar || null,
    profileUrl: actor.url || `https://bsky.app/profile/${actor.handle || actor.id}`,
    source: topic?.source || "bsky",
  });

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
                <PostCard key={post.uri} post={mapToPostCardData(post)} />
              ))}
            </PostGrid>
          </Section>
        )}

        {topic.actors && topic.actors.length > 0 && (
          <Section>
            <SectionHeader>Key Voices</SectionHeader>
            <PeopleGrid>
              {topic.actors.map((actor: Actor) => (
                <PeopleCard key={actor.id} person={mapActorToPerson(actor)} />
              ))}
            </PeopleGrid>
          </Section>
        )}
      </ScrollArea>
    </PageWrapper>
  );
};

/* --- Styled Components --- */

const PageWrapper = styled.div`
  padding-bottom:  var(--spacing-lg);
`;

const Header = styled.header`
  margin-bottom: 24px;
  padding-top: var(--spacing-md);
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
  margin-bottom: 40px;
`;

const SectionHeader = styled.h4`
  font-size: var(--font-sm);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  letter-spacing: 0.08em;
`;

const PostGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-md);
  justify-items: start;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }
  margin: 0 var(--spacing-md);
`;

const Badge = styled.span<{ $status?: string }>`
  font-size: 10px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 99px;
  background: var(--bg-soft);
  color: var(--text-muted);
  text-transform: uppercase;
`;

const SourceTag = styled(Badge)<{ $source?: string }>`
  background: ${(props) =>
    props.$source === "mastodon"
      ? "rgba(140, 141, 255, 0.1)"
      : "rgba(0, 133, 255, 0.1)"};
  color: ${(props) => (props.$source === "mastodon" ? "#8c8dff" : "#0085ff")};
`;

/* --- Skeleton --- */
const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const SkeletonBlock = styled.div`
  width: 100%;
  height: 150px;
  background: var(--bg-soft);
  border-radius: 12px;
  animation: ${shimmer} 1.5s infinite linear;
`;

const TrendPageSkeleton = () => (
  <PageWrapper>
    <Header>
      <SkeletonBlock style={{ height: "30px", width: "30%" }} />
    </Header>
    <Section>
      <SkeletonBlock />
    </Section>
    <Section>
      <SkeletonBlock />
    </Section>
  </PageWrapper>
);