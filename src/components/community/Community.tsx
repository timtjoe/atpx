import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";
import { CommunityService } from "./CommunityService";
import { CommunityCard } from "./CommunityCard";
import { CommunityLive } from "./CommunityLive";
import * as communityDb from "../../utils/communityDb";

export const Community = () => {
  const [communities, setCommunities] = useState<any[]>([]);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);

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
    if (!carousel.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carousel.current;
    setStart(scrollLeft === 0);
    setEnd(Math.abs(scrollWidth - clientWidth - scrollLeft) < 5);
  };

  const scroll = (direction: "left" | "right") => {
    if (!carousel.current) return;
    const scrollAmount = 300;
    carousel.current.scrollBy({
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
    <Container>
      <Header>popular communities</Header>

      <Content>
        {!isStart && (
          <NavButton left onClick={() => scroll("left")}>
            <ChevronLeft size={18} />
          </NavButton>
        )}

        <Carousel ref={carousel} onScroll={handleScroll}>
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

        {!isEnd && (
          <NavButton onClick={() => scroll("right")}>
            <ChevronRight size={18} />
          </NavButton>
        )}
      </Content>

      <CommunityLive
        communities={communities}
        setCommunities={setCommunities}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
`;

const Header = styled.div`
  padding: 10px 0;
  font-weight: bold;
  font-size: 13px;
  color: #ff6600;
  text-transform: lowercase;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Carousel = styled.div`
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

const NavButton = styled.button<{ left?: boolean }>`
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

  /* Hide on mobile - users can swipe */
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Community;
