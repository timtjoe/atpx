import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@components/icons";
import {
  IconButton,
  Header,
  Title,
  ErrorBoundary,
  TechnicalError,
  Subtitle,
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
        <HeadCol>
          <Title>Popular Actors</Title>
          <Subtitle>Influential voices across the open social web</Subtitle>
        </HeadCol>

        <Actions>
          {!isStart && (
            <IconButton
              left
              onClick={() =>
                container.current?.scrollBy({ left: -600, behavior: "smooth" })
              }
              variant="trans"
            >
              <Icons.caret_left size={16} />{" "}
              {/* Updated to use your Icons abstraction */}
            </IconButton>
          )}
          {!isEnd && (
            <IconButton
              onClick={() =>
                container.current?.scrollBy({ left: 600, behavior: "smooth" })
              }
              variant="trans"
            >
              <Icons.caret_right size={16} />{" "}
              {/* Updated to use your Icons abstraction */}
            </IconButton>
          )}
        </Actions>
      </PeoHead>

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
                  import("@/utils/peopleDb").then((m) => m.addRemovedUri(uri));
                  PeopleService.remove(uri);
                  setPeople((prev) => prev.filter((x) => x.uri !== uri));
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Carousel>

      <PeopleLive people={people} setPeople={setPeople} />
    </Container>
  );
};

export const People = () => (
  <ErrorBoundary fallback={<TechnicalError message="Failed to load Actors." />}>
    <PeopleContent />
  </ErrorBoundary>
);

/* --- Styles --- */
const Container = styled.section`
  background-color: var(--bg-grey);
  width: 100%;
  padding-bottom: var(--spacing-md);
  border-top: thin solid var(--border-subtle);
`;

const PeoHead = styled.div`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  padding: var(--spacing-md);
  padding-top: var(--spacing-sm);

  @media screen and (max-width: 768px) {
    padding-bottom: 0;
  }
`;

export const HeadCol = styled.div`
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
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    flex-shrink: 0;
  }
`;
