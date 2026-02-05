import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import PeopleCard from "./PeopleCard";
import { motion } from "framer-motion";
import { PeopleService, Person } from "./PeopleService";
import PeopleLive from "./PeopleLive";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setIsAtStart(el.scrollLeft <= 4);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let unsub: any = null;
    const init = async () => {
      try {
        setLoading(true);
        const { items } = await PeopleService.list(30);
        // apply removal filter from localStorage
        const removed = await import("../../utils/peopleDb")
          .then((m) => m.getRemovedUris())
          .catch(() => [] as string[]);
        const filtered = (items || []).filter((i) => !removed.includes(i.uri));
        setPeople(filtered || []);
      } catch (e) {
        console.error("People fetch failed", e);
      } finally {
        setLoading(false);
      }
    };

    init();

    // ensure scroll flags are correct after first paint
    setTimeout(() => onScroll(), 200);

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // update scroll state when people list changes
  useEffect(() => {
    setTimeout(() => onScroll(), 120);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people]);

  // loadMore removed — carousel will be populated by service updates

  return (
    <PeopleSection>
      <SectionTitle>popular creators</SectionTitle>

      <CarouselWrap>
        <NavButton
          disabled={isAtStart}
          onClick={() => scroll("left")}
          aria-label="left"
        >
          <ChevronLeft size={20} />
        </NavButton>
        <Carousel ref={containerRef} onScroll={onScroll}>
          {people.map((p, idx) => (
            <ItemWrap key={p.uri}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                <PeopleCard
                  person={p}
                  position={idx + 1}
                  onRemove={(uri) => {
                    // persist removal
                    import("../../utils/peopleDb")
                      .then((m) => m.addRemovedUri(uri))
                      .catch(() => {});
                    // update service cache and ui
                    PeopleService.remove(uri);
                    setPeople((prev) => prev.filter((x) => x.uri !== uri));
                  }}
                />
              </motion.div>
            </ItemWrap>
          ))}
        </Carousel>
        <NavButton
          onClick={() => scroll("right")}
          disabled={isAtEnd}
          aria-label="right"
        >
          <ChevronRight size={20} />
        </NavButton>
      </CarouselWrap>

      {/* live merger: update counts/info without reordering */}
      <PeopleLive people={people} setPeople={setPeople} />
    </PeopleSection>
  );
};

export const PeopleSection = styled.section`
  padding: 15px;
  background-color: var(--hn-bg);
  border-bottom: 1px solid #ddd;
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: bold;
  margin: 0 0 12px 0;
  color: #ff6600;
  text-transform: lowercase;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const CarouselWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 6px;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 6px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--hn-gray);

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  /* Hide on mobile - users can swipe */
  @media (max-width: 768px) {
    display: none;
  }
`;

const ItemWrap = styled.div`
  margin-right: 8px;
  flex: 0 0 auto;
`;

/* FloatingLoad removed */

export const PersonCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  text-align: center;
  min-width: 0;
  padding: 10px 4px; /* Internal spacing for the background */
  background: #fff; /* White background for the card */
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    border-color: #ddd;
  }
`;

export const Avatar = styled.img`
  width: 44px; /* Slightly adjusted to fit padding */
  height: 44px;
  border-radius: 8px;
  background-color: #eee;
  object-fit: cover;
  margin-bottom: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const Name = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #000;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-bottom: 2px;
`;

export const Handle = styled.span`
  font-size: 8px; /* Shrunk slightly to fit within 4 columns */
  color: var(--fb-blue); /* Handle is now blue */
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: 500;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: var(--hn-gray);
  font-size: 11px;
  margin-top: 15px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    text-decoration: underline;
    color: #ff6600;
  }
`;
