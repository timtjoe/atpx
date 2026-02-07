import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { IconButton } from "@components";

interface INavigation {
  title: string;
  showBack?: boolean;
  tabs?: { label: string; path: string }[];
}
/* ... existing imports ... */

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
            <IconButton
              size="medium"
              variant="trans"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={22} />
            </IconButton>
          )}
          <Title>{title}</Title>
        </TopRow>
      )}

      {hasTabs && (
        <Tabs>
          {showBack && (
            <IconButton variant="trans" onClick={() => navigate(-1)}>
              <ArrowLeft size={22} />
            </IconButton>
          )}
          {tabs.map((tab) => (
            <TabItem key={tab.path} to={tab.path}>
              <span>{tab.label}</span>
            </TabItem>
          ))}
        </Tabs>
      )}
    </Container>
  );
};

/* --- Styled Components --- */

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--bg-subtle);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: var(--spacing-md);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 var(--spacing-md);
  height: 55px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-bold);
  transition: opacity 0.1s ease-in-out;
  opacity: ${(props) => (props.children ? 1 : 0)};
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
  color: var(--text-black);
  font-size: var(--font-md);
  font-weight: 600;
  position: relative;
  transition: background 0.2s ease;

  &:hover {
    background: var(--bg-trans);
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 70px;
    position: relative;
  }

  &.active {
    color: var(--text-black);
    font-weight: 700;
    span::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--bg-black);
      border-radius: 2px 2px 0 0;
    }
  }
`;
