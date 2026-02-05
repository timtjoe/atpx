import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";
import { CommunityService } from "./CommunityService";
import { CommunityCard } from "./CommunityCard";
import { CommunityLive } from "./CommunityLive";
import * as communityDb from "../../utils/communityDb";

export const Communities = () => {
  const [communities, setCommunities] = useState<any[]>([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAndSubscribe = async () => {
      try {
        const removedUris = await communityDb.getRemovedCommunityUris();
        const result = await CommunityService.list(50);
        const filtered = result.items.filter(
          (c: any) => !removedUris.includes(c.uri),
        );
        setCommunities(filtered);
      } catch (err) {
        console.error("Failed to load communities:", err);
      }
    };
    loadAndSubscribe();
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(Math.abs(scrollWidth - clientWidth - scrollLeft) < 5);
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleRemove = (uri: string) => {
    setCommunities((prev) => prev.filter((c) => c.uri !== uri));
    communityDb.addRemovedCommunityUri(uri);
    CommunityService.remove(uri);
  };

  return (
    <CommunitiesWrapper>
      <SectionHeader>popular communities</SectionHeader>

      <CarouselContainer>
        {!isAtStart && (
          <NavButton left onClick={() => scroll("left")}>
            <ChevronLeft size={18} />
          </NavButton>
        )}

        <Carousel ref={carouselRef} onScroll={handleScroll}>
          {communities.map((community, idx) => (
            <motion.div
              key={community.uri}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: idx * 0.04 }}
            >
              <CommunityCard
                community={community}
                position={idx + 1}
                onRemove={handleRemove}
              />
            </motion.div>
          ))}
        </Carousel>

        {!isAtEnd && (
          <NavButton onClick={() => scroll("right")}>
            <ChevronRight size={18} />
          </NavButton>
        )}
      </CarouselContainer>

      <CommunityLive
        communities={communities}
        setCommunities={setCommunities}
      />
    </CommunitiesWrapper>
  );
};

export const CommunitiesWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
`;

export const SectionHeader = styled.div`
  padding: 10px 0;
  font-weight: bold;
  font-size: 13px;
  color: #ff6600;
  text-transform: lowercase;
`;

export const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Carousel = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  flex: 1;
  padding: 10px 0;
  scroll-padding: 0;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Containerize children */
  & > div {
    flex-shrink: 0;
  }
`;

export const NavButton = styled.button<{ left?: boolean }>`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  position: ${(p) => (p.left ? "absolute" : "relative")};
  left: ${(p) => (p.left ? "0" : "auto")};
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    border-color: #999;
  }

  svg {
    color: #333;
  }
`;
