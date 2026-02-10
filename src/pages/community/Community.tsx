import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import {
  RootContextType,
  Community as CommunityType,
  RouteConfig,
} from "@types";
import {
  CommunityService,
  CommunityCard,
  Comleton,
} from "@components/community";
import * as communityDb from "@/utils/communityDb";
import { ErrorBoundary, TechnicalError } from "@components";

const CommunityContent = () => {
  const { setNavConfig } = useOutletContext<RootContextType>();
  const [communities, setCommunities] = useState<CommunityType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const removedUris = await communityDb.getRemovedCommunityUris();
      const { items } = await CommunityService.list(50);

      setCommunities((items || []).filter((c) => !removedUris.includes(c.uri)));

      // Update Global Navbar
      setNavConfig((prev) => ({
        ...prev,
        title: "Communities",
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
    communityDb.addRemovedCommunityUri(uri);
    setCommunities((prev) => prev.filter((c) => c.uri !== uri));
  };

  if (loading) return <Comleton />;

  return (
    <PageWrapper>
      <Header>
        <SectionTitle>Trending Communities</SectionTitle>
        <SectionSubtitle>
          Active hubs across the decentralized web
        </SectionSubtitle>
      </Header>

      <CommunityGrid>
        {communities.map((c, idx) => (
          <GridItem key={c.uri} $idx={idx}>
            <CommunityCard community={c} onRemove={handleRemove} />
          </GridItem>
        ))}
      </CommunityGrid>
    </PageWrapper>
  );
};

export const CommunityPage = () => (
  <ErrorBoundary
    fallback={<TechnicalError message="Failed to load Communities." />}
  >
    <CommunityContent />
  </ErrorBoundary>
);

export const CommunityRoutes: RouteConfig = {
  path: "/communities",
  element: <CommunityPage />,
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

const CommunityGrid = styled.div`
  display: grid;
  /* Use 1fr 1fr to ensure exactly two columns regardless of container width */
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);

  /* Drop to a single column only on smaller mobile devices */
  @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
`;

const GridItem = styled.div<{ $idx: number }>`
  animation: ${entry} 0.3s ease-out forwards;
  opacity: 0;
  ${({ $idx }) => css`
    /* Maintain the stagger effect for the grid items */
    animation-delay: ${Math.min($idx * 0.03, 0.5)}s;
  `}
`;
