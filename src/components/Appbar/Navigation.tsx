import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

interface INavigation {
  title: string;
}

/**
 * Layout Navigation Component.
 */
export const Navigation = ({ title }: INavigation): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container>
      <TopRow>
        <button onClick={() => navigate(-1)}>Back</button>
        <Title>{title}</Title>
      </TopRow>

      <Tabs>
        <TabItem to="/discovery">Discovery</TabItem>
        <TabItem to="/following">Following</TabItem>
      </Tabs>
    </Container>
  );
};

/* --- Styled Components --- */

const Container = styled.nav`
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
`;

const TabItem = styled(NavLink)`
  flex: 1;
  text-align: center;
  padding: 16px 0;
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background-color: var(--bg-hover);
  }

  &.active {
    color: var(--brand-primary);
    border-bottom: 3px solid var(--brand-primary);
  }
`;

export default Navigation;