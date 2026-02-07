import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import styled, { keyframes, css } from "styled-components";
import { RotateCw, TrendingUp, AlertCircle } from "lucide-react";
import { trendingAtom, fetchTrendsAction } from "./TrendStore";
import { TrendingService } from "./TrendService";
import { TrendCard } from "./TrendCard";
import { TrendDialog } from "./TrendDialog";
import { IconButton } from "@components/IconButton";
import { Title, Header, Tagline } from "@components/Headers";
import { Icon } from "@components/index";

export const Trending = () => {
  const [topics] = useAtom(trendingAtom);
  const [, fetchTrends] = useAtom(fetchTrendsAction);

  const [isOpen, setOpen] = useState(false);
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (topics.length === 0) handleFetch();
  }, [topics.length]);

  const handleFetch = async () => {
    setRefreshing(true);
    setError(null);
    try {
      await fetchTrends();
    } catch (err) {
      setError("Failed to sync trends");
    } finally {
      // Keep loading visible slightly longer for smooth animation
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  const openDetail = async (name: string) => {
    setTopic(null);
    setOpen(true);
    setLoading(true);
    try {
      const details = await TrendingService.get(name);
      setTopic(details);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTopic(null);
  };

  return (
    <Container>
      <TrendHead>
        <Title>Trending Topics</Title>
        <Icon as={TrendingUp} size={16} />
        <IconButton
          style={{ marginLeft: "auto" }}
          variant="trans"
          size="small"
          onClick={handleFetch}
          disabled={isRefreshing}
        >
          <RotateIcon as={RotateCw} size={16} $isSpinning={isRefreshing} />
        </IconButton>
      </TrendHead>

      {error ? (
        <ErrorState>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={handleFetch}>Try again</button>
        </ErrorState>
      ) : (
        <Grid>
          {isRefreshing && topics.length === 0
            ? Array.from({ length: 12 }).map((_, i) => (
                <SkeletonTrend key={i} />
              ))
            : topics
                .slice(0, 12)
                .map((topic, i) => (
                  <TrendCard
                    key={topic.topic}
                    topic={topic}
                    rank={i + 1}
                    onClick={() => openDetail(topic.topic)}
                  />
                ))}
        </Grid>
      )}

      <TrendDialog
        isOpen={isOpen}
        topic={topic}
        loading={loading}
        onClose={handleClose}
        onRefresh={() => openDetail(topic?.topic)}
      />
    </Container>
  );
};

/* --- ANIMATIONS --- */
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;


const SkeletonTrend = () => (
  <SkeletonCard>
    <div className="skeleton-header">
      <div className="skeleton-rank" />
      <div className="skeleton-title" />
    </div>
    <div className="skeleton-meta">
      <div className="skeleton-badge" />
      <div className="skeleton-text" />
    </div>
    <div className="skeleton-actors" />
  </SkeletonCard>
);

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  height: 62px; /* Fixed height to match real cards exactly */
  animation: ${shimmer} 1.5s ease-in-out infinite;

  .skeleton-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    .skeleton-rank {
      width: 12px;
      height: 10px;
      background: var(--border-subtle);
      border-radius: 2px;
    }
    .skeleton-title {
      width: 60%;
      height: 12px;
      background: var(--border-subtle);
      border-radius: 2px;
    }
  }

  .skeleton-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    .skeleton-badge {
      width: 20px;
      height: 10px;
      background: var(--border-light);
      border-radius: 2px;
    }
    .skeleton-text {
      width: 30px;
      height: 8px;
      background: var(--border-light);
      border-radius: 2px;
    }
  }

  .skeleton-actors {
    margin-top: 2px;
    width: 40px;
    height: 12px;
    background: var(--border-light);
    border-radius: 10px;
  }
`;

const RotateIcon = styled.svg<{ $isSpinning: boolean }>`
  ${(props) =>
    props.$isSpinning &&
    css`
      animation: ${spin} 1s linear infinite;
    `}
`;

const Container = styled.div`
  border: 1px solid var(--border-light);
  padding: 0 var(--spacing-sm) var(--spacing-sm);
  border-radius: calc(var(--radius-md) + 4px);
  background-color: var(--bg-soft);

  @media (max-width: 768px) {
    border: unset;
    border-radius: unset;
  }
`;

const TrendHead = styled(Header)`
  flex-direction: row;
  align-items: unset;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-sm);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-md);
  padding-left: var(--spacing-sm);

  @media (max-width: 768px) {
  }
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) 0;
  gap: var(--spacing-sm);
  color: var(--text-muted);
  font-size: var(--font-sm);
  button {
    background: none;
    border: none;
    color: var(--border-blue);
    cursor: pointer;
    font-weight: 600;
  }
`;

export default Trending;
