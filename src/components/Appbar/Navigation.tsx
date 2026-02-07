import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface INavigation {
  title?: string;
  showBack?: boolean;
  tabs?: { label: string; path: string }[];
}

export const Navigation = ({
  title = "",
  showBack,
  tabs = [],
}: INavigation): React.JSX.Element => {
  const navigate = useNavigate();
  const hasTabs = tabs.length > 0;

  return (
    <Container>
      <NavContent>
        {showBack && (
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={22} />
          </BackButton>
        )}
        
        {/* If there are no tabs, show the title. If there are tabs, the title is hidden/optional */}
        {!hasTabs && <Title>{title}</Title>}

        {hasTabs && (
          <TabsList>
            {tabs.map((tab) => (
              <TabItem key={tab.path} to={tab.path}>
                <span>{tab.label}</span>
              </TabItem>
            ))}
          </TabsList>
        )}
      </NavContent>
    </Container>
  );
};

/* --- Simplified Styled Components --- */

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  
  /* "Liquid Glass" effect: background alpha + heavy blur */
  background: var(--bg-page-alpha, rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(15px) saturate(160%);
  -webkit-backdrop-filter: blur(15px) saturate(160%);
  
  border-bottom: 1px solid var(--border-subtle);
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 16px;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-bold);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-left: -8px;
  cursor: pointer;
  color: var(--text-main);
  display: flex;
  align-items: center;
  border-radius: 50%;
  transition: background 0.2s;

  &:active {
    background: var(--bg-soft);
  }
`;

const TabsList = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
`;

const TabItem = styled(NavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-muted);
  font-size: var(--font-md);
  font-weight: 600;
  position: relative;
  transition: background .1s ease-in-out;
  
  span {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  &:hover {
    background-color: var(--bg-trans);
    
  }

  /* Active State Underline */
  &.active {
    color: var(--text-bold);
    font-weight: 700;

    span::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--bg-black);
      border-radius: 10px 10px 0 0;
    }
  }
`;