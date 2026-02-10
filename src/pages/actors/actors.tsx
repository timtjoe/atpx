import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import {
  RootContextType,
  RouteConfig,
} from "@types";
import {
  PeopleService,
  Person,
} from "@components/people"; 
import PeopleCard from "@components/people/PeopleCard";
import { Peoleton } from "@components/people/Peoleton";
import { ErrorBoundary, TechnicalError } from "@components";
import * as peopleDb from "@/utils/peopleDb";

const ActorsContent = () => {
  const { setNavConfig } = useOutletContext<RootContextType>();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const { items } = await PeopleService.list(50);
      const removed = await peopleDb.getRemovedUris().catch(() => []);
      
      setPeople((items || []).filter((i) => !removed.includes(i.uri)));

      // Update Global Navbar via Context
      setNavConfig((prev) => ({
        ...prev,
        title: "Popular Actors",
        showBack: true,
        tabs: [],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemove = (uri: string) => {
    peopleDb.addRemovedUri(uri);
    PeopleService.remove(uri);
    setPeople((prev) => prev.filter((p) => p.uri !== uri));
  };

  if (loading) return <Peoleton />;

  return (
    <PageWrapper>
      <Header>
        <SectionTitle>Popular Actors</SectionTitle>
        <SectionSubtitle>
          Influential voices across the open social web
        </SectionSubtitle>
      </Header>

      <ActorsGrid>
        {people.map((p, idx) => (
          <GridItem key={p.uri} $idx={idx}>
            <PeopleCard person={p} onRemove={handleRemove} />
          </GridItem>
        ))}
      </ActorsGrid>
    </PageWrapper>
  );
};

export const ActorsPage = () => (
  <ErrorBoundary
    fallback={<TechnicalError message="Failed to load Actors." />}
  >
    <ActorsContent />
  </ErrorBoundary>
);

export const ActorsRoutes: RouteConfig = {
  path: "/actors",
  element: <ActorsPage />,
  handle: {
    showBack: true,
    showTabs: false,
  },
};

/* --- Styles & Keyframes --- */

const entry = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  width: 100%;
`;

const Header = styled.header`
  margin-bottom: var(--spacing-lg);
  padding-top: var(--spacing-md);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-bold);
  margin-bottom: var(--spacing-xs);
`;

const SectionSubtitle = styled.p`
  font-size: var(--font-sm);
  color: var(--text-muted);
`;

const ActorsGrid = styled.div`
  display: grid;
  /* Strictly 3 columns as requested */
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  justify-items: center;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
`;

const GridItem = styled.div<{ $idx: number }>`
  animation: ${entry} 0.3s ease-out forwards;
  opacity: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  ${({ $idx }) => css`
    animation-delay: ${Math.min($idx * 0.03, 0.5)}s;
  `}
`;