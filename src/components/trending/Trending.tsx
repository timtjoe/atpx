import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { withTrend, trendActions } from "./TrendStore";
import { Treleton } from "./Treleton";
import {
  Title,
  TechnicalError,
  ErrorBoundary,
  Subtitle,
} from "@components";
import { TrendCard } from "./TrendCard";
import { Trend } from "@types";

const TrendingContent = (): React.JSX.Element => {
  const [topics] = useAtom(withTrend);
  const [, fetchTrends] = useAtom(trendActions);
  const navigate = useNavigate();
  // const forceError = (undefined as any).crash();

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
          <Title>Trending Topics</Title>
        <Subtitle>Conversations surfacing right now in the Fediverse</Subtitle>
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
  padding: 0;
  margin: 0;
  background-color: var(--bg-grey);
  padding-bottom: var(--spacing-sm);
`;

const TrendHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  justify-content: space-between;
  align-items: flex-start;
  margin: calc(var(--spacing-lg));
`;

const Headrow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const Grid = styled.div`
  margin: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-md);
`;
