import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Community as CommunityType } from "@/types/community";
import { CommunityService } from "./CommunityService";
import { CommunityCard } from "./CommunityCard";
import { CommunityLive } from "./CommunityLive";
import * as communityDb from "@/utils/communityDb";
import {
  HeadActions,
  Header,
  Title,
  ErrorBoundary,
  TechnicalError,
  IconButton,
} from "@components";
import { Comleton } from "./Comleton";

const CommunityContent = () => {
  const [communities, setCommunities] = useState<CommunityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const removedUris = await communityDb.getRemovedCommunityUris();
        const result = await CommunityService.list(50);
        setCommunities(result.items.filter(c => !removedUris.includes(c.uri)));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleScroll = () => {
    if (!carousel.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carousel.current;
    setStart(scrollLeft <= 5);
    setEnd(Math.abs(scrollWidth - clientWidth - scrollLeft) < 10);
  };

  if (loading) return <Comleton />;

  return (
    <Container>
      <ComHead>
        <Title>Trending Communities</Title>
        <HeadActions style={{ marginLeft: "auto" }}>
          {!isStart && (
            <IconButton left onClick={() => carousel.current?.scrollBy({ left: -700, behavior: "smooth" })} variant="trans">
              <ChevronLeft size={16} />
            </IconButton>
          )}
          {!isEnd && (
            <IconButton onClick={() => carousel.current?.scrollBy({ left: 700, behavior: "smooth" })} variant="trans">
              <ChevronRight size={16} />
            </IconButton>
          )}
        </HeadActions>
      </ComHead>

      <Content>
        <Carousel ref={carousel} onScroll={handleScroll}>
          {communities.map((community, idx) => (
            <motion.div
              key={community.uri}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <CommunityCard community={community} onRemove={(uri) => {
                setCommunities(prev => prev.filter(c => c.uri !== uri));
                communityDb.addRemovedCommunityUri(uri);
              }} />
            </motion.div>
          ))}
        </Carousel>
      </Content>
    </Container>
  );
};
export const Community = () => {
  const [key, setKey] = useState(0);
  const handleRetry = () => setKey((prev) => prev + 1);

  return (
    <ErrorBoundary
      key={key}
      fallback={
        <TechnicalError
          message="Failed to load communities."
          onRetry={handleRetry}
          autoRetrySeconds={5}
        />
      }
    >
      <CommunityContent />
    </ErrorBoundary>
  );
};

/* --- Styled Components --- */

const Container = styled.div`
  width: 100%;
  margin-top: var(--spacing-xl);
`;

const ComHead = styled(Header)`
  padding: var(--spacing-xs) var(--spacing-sm);
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-sm);
`;


const Carousel = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  & > div { flex-shrink: 0; width: 340px; }
`;
