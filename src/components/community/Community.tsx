import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Icons } from "@components/icons";
import { Community as CommunityType } from "@/types/community";
import { CommunityService } from "./CommunityService";
import { CommunityCard } from "./CommunityCard";
import * as communityDb from "@/utils/communityDb";
import {
  IconButton,
  Title,
  ErrorBoundary,
  TechnicalError,
  Subtitle,
} from "@components";
import { Comleton } from "./Comleton";

const CommunityContent = () => {
  const [communities, setCommunities] = useState<CommunityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = carousel.current;
    if (!el) return;
    setStart(el.scrollLeft <= 5);
    setEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const removedUris = await communityDb.getRemovedCommunityUris();
        const { items } = await CommunityService.list(50);
        setCommunities((items || []).filter((c) => !removedUris.includes(c.uri)));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleRemove = (uri: string) => {
    communityDb.addRemovedCommunityUri(uri);
    setCommunities((prev) => prev.filter((c) => c.uri !== uri));
  };

  if (loading) return <Comleton />;

  return (
    <Container>
      <ComHead>
        <HeadCol>
          <Title>Trending Communities</Title>
          <Subtitle>Active hubs across the decentralized web</Subtitle>
        </HeadCol>

        <Actions>
          {!isStart && (
            <IconButton
              left
              onClick={() => carousel.current?.scrollBy({ left: -600, behavior: "smooth" })}
              variant="trans"
            >
              <Icons.caret_left size={16} />
            </IconButton>
          )}
          {!isEnd && (
            <IconButton
              onClick={() => carousel.current?.scrollBy({ left: 600, behavior: "smooth" })}
              variant="trans"
            >
              <Icons.caret_right size={16} />
            </IconButton>
          )}
        </Actions>
      </ComHead>

      <Carousel ref={carousel} onScroll={onScroll}>
        {communities.map((c, idx) => (
          <SlideItem key={c.uri} $idx={idx}>
            <CommunityCard community={c} onRemove={handleRemove} />
          </SlideItem>
        ))}
      </Carousel>
    </Container>
  );
};

export const Community = () => (
  <ErrorBoundary fallback={<TechnicalError message="Failed to load Communities." />}>
    <CommunityContent />
  </ErrorBoundary>
);

/* --- Styles & Keyframes --- */

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

const Container = styled.section`
  background-color: var(--bg-grey);
  width: 100%;
  padding-bottom: var(--spacing-md);
  border-top: thin solid var(--border-subtle);
`;

const ComHead = styled.div`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  padding: var(--spacing-md);
  padding-top: var(--spacing-sm);
`;

const HeadCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: var(--spacing-xxs);
  align-items: center;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 var(--spacing-md);
  gap: var(--spacing-md);
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const SlideItem = styled.div<{ $idx: number }>`
  flex-shrink: 0;
  /* Mimicking motion.div transition={{ duration: 0.2, delay: idx * 0.04 }} */
  animation: ${entry} 0.2s ease-out forwards;
  opacity: 0;
  ${({ $idx }) => css`
    animation-delay: ${$idx * 0.04}s;
  `}
`;