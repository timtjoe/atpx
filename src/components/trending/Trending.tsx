import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TrendingUp, Cloud, Globe } from "lucide-react";

import { withTrend, trendActions } from "./TrendStore";
import { Treleton } from "./Treleton";
import { Title, TechnicalError, Header, ErrorBoundary } from "@components";
import { TrendCard } from "./TrendCard";
import { Icon } from "@components";
import { Trend } from "@types";

// Rename the inner component so we can wrap the export
const TrendingContent = (): React.JSX.Element => {
  const [topics] = useAtom(withTrend);
  const [, fetchTrends] = useAtom(trendActions);
  const navigate = useNavigate();
  // TODO: remove
  // const forcedError = (undefined as any).crash();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleFetch = async () => {
    setLoading(true);
    setError(false);
    try {
      await fetchTrends();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading && topics.length === 0) return <Treleton />;
  if (error) return <TechnicalError onRetry={handleFetch} />;

  return (
    <Container>
      <TrendHead>
        <TitleGroup>
          <Title>Trending Topics</Title>
          <Icon as={TrendingUp} size={16} color="var(--text-muted)" />
        </TitleGroup>
        <SourceLegend>
          <SourceItem>
            <Cloud size={10} /> Bluesky
          </SourceItem>
          <SourceItem>
            <Globe size={10} /> Mastodon
          </SourceItem>
        </SourceLegend>
      </TrendHead>

      <Grid>
        {topics.slice(0, 12).map((item: Trend, i: number) => (
          <TrendCard
            key={`${item.source}-${item.topic}`}
            topic={item}
            rank={i + 1}
            onClick={() =>
              navigate(
                `/trend/${encodeURIComponent(item.topic)}?source=${item.source}`,
              )
            }
          />
        ))}
      </Grid>
    </Container>
  );
};

export const Trending = () => {
  const [key, setKey] = useState(0);

  const handleRetry = () => setKey((prev) => prev + 1);

  return (
    <ErrorBoundary
      key={key}
      fallback={
        <TechnicalError
          message="Trending is temporarily unavailable."
          onRetry={handleRetry}
          autoRetrySeconds={5}
        />
      }
    >
      <TrendingContent />
    </ErrorBoundary>
  );
};

/* --- Styled Components --- */

const Container = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--bg-grey);
`;

const TrendHead = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const SourceLegend = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

const SourceItem = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-md);
`;
