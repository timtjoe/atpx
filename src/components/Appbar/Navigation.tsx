import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface INavigation {
  title: string;
  showBack?: boolean;
  tabs?: { label: string; path: string }[];
}

export const Navigation = ({
  title,
  showBack,
  tabs = [],
}: INavigation): React.JSX.Element => {
  const navigate = useNavigate();
  const hasTabs = tabs.length > 0;

  return (
    <Container>
      {!hasTabs && (
        <TopRow>
          {showBack && (
            <BackButton onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </BackButton>
          )}
          <Title>{title}</Title>
        </TopRow>
      )}

      {hasTabs && (
        <Tabs>
          {showBack && (
            <InlineBackButton onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </InlineBackButton>
          )}
          {tabs.map((tab) => (
            <TabItem key={tab.path} to={tab.path}>
              {tab.label}
            </TabItem>
          ))}
        </Tabs>
      )}
    </Container>
  );
};

/* --- Styled Components --- */

const Container = styled.div`
  position: sticky; /* Critical: Navigation now handles its own stickiness */
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: var(--spacing-md);
`;
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  color: var(--text-bold);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const InlineBackButton = styled(BackButton)`
  margin-left: var(--spacing-sm);
  align-self: center;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 var(--spacing-md);
  height: 55px;
`;

// Inside Navigation.tsx styled components
const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-bold);
  
  /* Add these lines to smooth the text change */
  transition: opacity 0.2s ease-in-out;
  opacity: ${props => props.children ? 1 : 0};
`;

const Tabs = styled.div`
  display: flex;
  align-items: stretch;
  height: 55px;
`;

const TabItem = styled(NavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-bold);
  }

  &.active {
    color: var(--brand-primary);
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 25%;
      right: 25%;
      height: 3px;
      background: var(--brand-primary);
      border-radius: 99px 99px 0 0;
    }
  }
`;
