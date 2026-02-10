import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { withTrend, trendActions } from "./TrendStore";
import { Treleton } from "./Treleton";
import { Title, TechnicalError, ErrorBoundary, Subtitle } from "@components";
import { TrendCard } from "./TrendCard";
import { Trend } from "@types";

const TrendingContent = (): React.JSX.Element => {
  const [topics] = useAtom(withTrend);
  const [, fetchTrends] = useAtom(trendActions);
  const navigate = useNavigate();

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
          <TrendItem key={`${item.source}-${item.topic}`} $idx={i}>
            <TrendCard
              topic={item}
              rank={i + 1}
              onClick={() =>
                navigate(
                  `/trend/${encodeURIComponent(item.topic)}?source=${item.source}`,
                )
              }
            />
          </TrendItem>
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

/* --- Animations --- */

const entry = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

/* --- Styled Components --- */

const Container = styled.div`
  background-color: var(--bg-grey);
  padding-bottom: var(--spacing-sm);
  width: 100%;
`;

const TrendHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin: var(--spacing-lg);
`;

const Grid = styled.div`
  margin: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-md);
`;

const TrendItem = styled.div<{ $idx: number }>`
  opacity: 0;
  animation: ${entry} 0.2s ease-out forwards;
  ${({ $idx }) => css`
    animation-delay: ${$idx * 0.04}s;
  `}
`;