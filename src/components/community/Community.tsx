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

const CommunityContent = () => {
  const [communities, setCommunities] = useState<CommunityType[]>([]);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const removedUris = await communityDb.getRemovedCommunityUris();
        const result = await CommunityService.list(50);
        const filtered = result.items.filter(
          (c) => !removedUris.includes(c.uri)
        );
        setCommunities(filtered);
      } catch (err) {
        console.error("Failed to load communities:", err);
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

  const scroll = (direction: "left" | "right") => {
    if (!carousel.current) return;
    // Increased scroll amount to account for two columns of cards
    const amount = 700; 
    carousel.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleRemove = (uri: string) => {
    setCommunities((prev) => prev.filter((c) => c.uri !== uri));
    communityDb.addRemovedCommunityUri(uri);
    CommunityService.remove(uri);
  };

  return (
    <Container>
      <ComHead>
        <Title>Trending Communities</Title>
        <HeadActions style={{ marginLeft: "auto" }}>
          {!isStart && (
            <IconButton left onClick={() => scroll("left")} variant="trans">
              <ChevronLeft size={16} />
            </IconButton>
          )}
          {!isEnd && (
            <IconButton onClick={() => scroll("right")} variant="trans">
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
            >
              <CommunityCard
                community={community}
                onRemove={handleRemove}
              />
            </motion.div>
          ))}
        </Carousel>
      </Content>

      <CommunityLive
        communities={communities}
        setCommunities={setCommunities}
      />
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
  display: grid;
  /* Fixed height to accommodate two rows of cards + gap */
  height: calc((120px * 2) + 12px); 
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  gap: 12px;
  
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  & > div {
    /* Prevents the motion wrapper from collapsing */
    width: 340px; 
  }
`;

export default Community;