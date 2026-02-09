import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  IconButton,
  Header,
  Title,
  ErrorBoundary,
  TechnicalError,
} from "@components";
import PeopleCard from "./PeopleCard";
import PeopleLive from "./PeopleLive";
import { Peoleton } from "./Peoleton";
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
    setStart(el.scrollLeft <= 5);
    setEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { items } = await PeopleService.list(30);
        const removed = await import("@/utils/peopleDb")
          .then((m) => m.getRemovedUris())
          .catch(() => []);
        setPeople((items || []).filter((i) => !removed.includes(i.uri)));
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) return <Peoleton />;

  return (
    <Container>
      <PeoHead>
        <Title>Popular Creators</Title>
        <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
          {!isStart && (
            <IconButton
              left
              onClick={() =>
                container.current?.scrollBy({ left: -600, behavior: "smooth" })
              }
              variant="trans"
            >
              <ChevronLeft size={16} />
            </IconButton>
          )}
          {!isEnd && (
            <IconButton
              onClick={() =>
                container.current?.scrollBy({ left: 600, behavior: "smooth" })
              }
              variant="trans"
            >
              <ChevronRight size={16} />
            </IconButton>
          )}
        </div>
      </PeoHead>
      <Content>
        <Carousel ref={container} onScroll={onScroll}>
          <AnimatePresence>
            {people.map((p, idx) => (
              <motion.div
                key={p.uri}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
              >
                <PeopleCard
                  person={p}
                  onRemove={(uri) => {
                    import("@/utils/peopleDb").then((m) =>
                      m.addRemovedUri(uri),
                    );
                    PeopleService.remove(uri);
                    setPeople((prev) => prev.filter((x) => x.uri !== uri));
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Carousel>
      </Content>
      <PeopleLive people={people} setPeople={setPeople} />
    </Container>
  );
};

/* --- Styles --- */
const Container = styled.section`
  margin-top: var(--spacing-md);
  background-color: var(--bg-grey);
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  margin-top: var(--spacing-sm);
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 var(--spacing-md);
  gap: var(--spacing-xs);
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    flex-shrink: 0;
  }
`;

const PeoHead = styled(Header)`
  padding: var(--spacing-xs) var(--spacing-md);
`;

export const People = () => (
  <ErrorBoundary
    fallback={<TechnicalError message="Failed to load creators." />}
  >
    <PeopleContent />
  </ErrorBoundary>
);
