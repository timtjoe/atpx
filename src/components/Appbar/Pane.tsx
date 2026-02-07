import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { PaneItem } from "./PaneItem";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { NAV_ITEMS } from "@constants";

export const Pane = () => (
  <Container>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <NavList>
      {NAV_ITEMS.map((item) => (
        <ErrorBoundary key={item.id}>
          <PaneItem {...item} />
        </ErrorBoundary>
      ))}
    </NavList>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  /* This ensures the items stack against the right border */
  align-items: flex-end; 

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  /* Border for debugging - you can remove this later */
  border: 1px solid transparent; 
  
  display: flex;
  justify-content: center; /* Center the logo inside its 60px box */
  align-items: center;
  
  /* Pushes the wrapper itself to the right of the sidebar */
  align-self: flex-end; 
  
  padding: 10px 0 20px 0;
  width: 60px;
  height: auto;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  /* Ensures all icons are pushed to the right edge */
  align-items: flex-end; 
  gap: 8px;
  width: 100%;
`;