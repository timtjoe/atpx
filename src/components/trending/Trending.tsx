import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { TrendingUp } from "lucide-react";
import { trendingAtom, fetchTrendsAction } from "./TrendStore";
import { TrendingService } from "./TrendService";
import { TrendCard } from "./TrendCard";
import { TrendDialog } from "./TrendDialog";

export const Trending = () => {
  const [topics] = useAtom(trendingAtom);
  const [, fetchTrends] = useAtom(fetchTrendsAction);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (topics.length === 0) fetchTrends();
  }, [topics.length, fetchTrends]);

  const handleOpenDetail = async (topicName: string) => {
    setSelectedTopic(null);
    setIsModalOpen(true);
    setLoadingDetail(true);

    try {
      const details = await TrendingService.get(topicName);
      setSelectedTopic(details);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTopic(null);
  };

  return (
    <Container>
      <TrendingHeader>
        <TrendIcon as={TrendingUp} size={16} />
        <HeaderTitle>Trending Topics</HeaderTitle>
      </TrendingHeader>
      <Grid>
        {topics.slice(0, 10).map((topic, i) => (
          <TrendCard
            key={topic.topic}
            topic={topic}
            rank={i + 1}
            onClick={() => handleOpenDetail(topic.topic)}
          />
        ))}
      </Grid>

      <TrendDialog
        isOpen={isModalOpen}
        topic={selectedTopic}
        loading={loadingDetail}
        onClose={handleClose}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: var(--spacing-lg);
  border-bottom: 1px solid #eee;
`;

const TrendingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
`;

const TrendIcon = styled.svg`
  color: var(--text-gray);
`;

const HeaderTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
`;
