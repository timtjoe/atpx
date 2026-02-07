import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ArrowLeft, ExternalLink, RotateCw } from "lucide-react";
import { TrendingService } from "@components";
import { TrendPost } from "@components";
import { TechnicalError } from "@components";
import { Trend, Post, Actor } from "@types";

export const TrendPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<Trend | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    setError(false);
    try {
      const details = await TrendingService.get(id);
      setTopic(details);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const getPostLink = (post: Post) => {
    if (post.url) return post.url;
    return `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`;
  };

  if (loading)
    return (
      <PageWrapper>
        <LoadingState>Fetching insights...</LoadingState>
      </PageWrapper>
    );
  if (error || !topic) return <TechnicalError onRetry={fetchData} />;

  return (
    <PageWrapper>
      <nav
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </IconButton>
        <IconButton onClick={fetchData} $loading={loading}>
          <RotateCw size={18} />
        </IconButton>
      </nav>

      <Header>
        <Title>{topic.displayName}</Title>
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
                  href={`https://bsky.app/profile/${actor.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Avatar src={actor.avatar} />
                  <ActorMeta>
                    <strong>{actor.name}</strong>
                    <span>@{actor.id}</span>
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

/* --- STYLES --- */

const PageWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  background: var(--bg-white);
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  color: var(--text-bold);
`;

const MetaRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Section = styled.section`
  margin-top: 32px;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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

const IconButton = styled.button<{ $loading?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-soft);
  border: none;
  cursor: pointer;
  svg {
    animation: ${(props) => (props.$loading ? spin : "none")} 1s linear infinite;
  }
`;

const spin = keyframes` from { transform: rotate(0deg); } to { transform: rotate(360deg); } `;
const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px;
  color: var(--text-muted);
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
  color: ${(props) =>
    props.$source === "mastodon" ? "var(--text-purple)" : "var(--text-blue)"};
`;
const ScrollArea = styled.div`
  margin-top: 20px;
`;
const Header = styled.header`
  margin-bottom: 24px;
`;
