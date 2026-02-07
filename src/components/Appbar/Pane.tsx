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
  @media (max-width: 768px) {
    display: none;
  } /* Hide sidebar on mobile */
`;

const LogoWrapper = styled.div`
  padding: 10px 0 20px 12px;
`;
const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
