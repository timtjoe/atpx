import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton, Header, Title, ErrorBoundary, TechnicalError } from "@components";
import PeopleCard from "./PeopleCard";
import PeopleLive from "./PeopleLive";
import { PeopleService, Person } from "./PeopleService";

const PeopleContent = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const container = useRef<HTMLDivElement | null>(null);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);

  const onScroll = () => {
    const el = container.current;
    if (!el) return;
    setStart(el.scrollLeft <= 4);
    setEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = container.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const { items } = await PeopleService.list(30);
        const removed = await import("@/utils/peopleDb").then((m) => m.getRemovedUris()).catch(() => []);
        const filtered = (items || []).filter((i) => !removed.includes(i.uri));
        setPeople(filtered);
      } catch (e) {
        console.error("People fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    init();
    setTimeout(onScroll, 200);
  }, []);

  useEffect(() => {
    setTimeout(onScroll, 120);
  }, [people]);

  if (loading && people.length === 0) return null;

  return (
    <Container>
      <PeoHead>
        <Title>popular creators</Title>
      </PeoHead>
      <Content>
        {!isStart && (
          <IconButton left onClick={() => scroll("left")} variant="trans">
            <ChevronLeft size={16} />
          </IconButton>
        )}
        <Carousel ref={container} onScroll={onScroll}>
          {people.map((p, idx) => (
            <Item key={p.uri}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                <PeopleCard
                  person={p}
                  position={idx + 1}
                  onRemove={(uri) => {
                    import("@/utils/peopleDb").then((m) => m.addRemovedUri(uri)).catch(() => {});
                    PeopleService.remove(uri);
                    setPeople((prev) => prev.filter((x) => x.uri !== uri));
                  }}
                />
              </motion.div>
            </Item>
          ))}
        </Carousel>
        {!isEnd && (
          <IconButton onClick={() => scroll("right")} variant="trans">
            <ChevronRight size={16} />
          </IconButton>
        )}
      </Content>
      <PeopleLive people={people} setPeople={setPeople} />
    </Container>
  );
};

export const People = () => {
  const [key, setKey] = useState(0);
  const handleRetry = () => setKey((prev) => prev + 1);

  return (
    <ErrorBoundary
      key={key}
      fallback={
        <TechnicalError 
          message="Failed to load creators." 
          onRetry={handleRetry} 
          autoRetrySeconds={5} 
        />
      }
    >
      <PeopleContent />
    </ErrorBoundary>
  );
};

const Container = styled.section`
  margin-top: var(--spacing-md);
  background-color: var(--bg-white);
  position: relative;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--spacing-md);
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 var(--spacing-sm);
  gap: var(--spacing-xs);
  &::-webkit-scrollbar { display: none; }
`;

const Item = styled.div`
  margin-right: 8px;
  flex: 0 0 auto;
`;

const PeoHead = styled(Header)`
  padding-left: var(--spacing-md);
`;