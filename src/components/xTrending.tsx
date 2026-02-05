import { useState, useEffect } from "react";
import { authenticate, fetchTrending } from "@/utils/api";
import styled from "styled-components";

export const Trending = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingData = async () => {
    try {
      await authenticate();
      const result = await fetchTrending();
      setTopics(result.items.slice(0, 10));
    } catch (e) {
      console.error("Trends fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  if (loading || topics.length === 0) {
    return (
      <TrendingContainer>
        <SectionTitle>loading trends...</SectionTitle>
      </TrendingContainer>
    );
  }

  return (
    <TrendingContainer>
      <SectionTitle>trending topics</SectionTitle>
      <Grid>
        {topics.map((topic, i) => (
          <TrendItem key={topic.uri || i}>
            <Rank>{i + 1}</Rank>
            <TrendInfo>
              <TrendLink
                href={`https://bsky.app/search?q=${encodeURIComponent(topic.displayName)}`}
                target="_blank"
              >
                {topic.displayName}
              </TrendLink>
              <Tagline>
                <Badge>Popular</Badge>
                {topic.likeCount?.toLocaleString()} posts today
              </Tagline>
            </TrendInfo>
          </TrendItem>
        ))}
      </Grid>
    </TrendingContainer>
  );
};

export const TrendingContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--orange);
  text-transform: lowercase;
  display: flex;
  align-items: center;
  gap: 6px;

  /* &::before {
    content: "📈";
    font-size: 12px;
  } */
`;

 const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

 const TrendItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
  padding: 5px 0;
`;

 const Rank = styled.span`
  font-size: 11px;
  color: #ccc;
  font-weight: bold;
  margin-top: 2px;
`;

 const TrendInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

 const TrendLink = styled.a`
  text-decoration: none;
  color: var(--fb-blue); /* Blue for links */
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const Tagline = styled.span`
  color: var(--hn-gray);
  font-size: 9px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Badge = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 8px;
  text-transform: uppercase;
  font-weight: bold;
`;
