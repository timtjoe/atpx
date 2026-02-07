import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Footer } from "@components/Footer";
import { Logo, Navigation } from "@components";

/**
 * Root Layout Component.
 * Acts as the structural wrapper for all nested routes.
 */
export const Root = (): React.JSX.Element => {
  return (
    <Body>
      <Pane>
        <Logo />
      </Pane>

      <Main id="app">
        <Nav>
          <Navigation title="Home" />
        </Nav>

        <Outlet />
      </Main>

      <Sidebar>
        <Footer />
      </Sidebar>
    </Body>
  );
};

/* --- Styled Components --- */

const Body = styled.div`
  position: relative;
  max-width: var(--width-lg);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Pane = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  align-items: flex-end;
  padding-top: var(--spacing-md);
  border-right: thin solid var(--border-subtle);
`;

const Main = styled.main`
  position: relative;
  width: 500px;
  max-width: 500px;
  min-height: 100vh;

  @media (max-width: 430px) {
    width: auto;
  }
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 55px;
  background-color: var(--bg-white);
  margin-bottom: var(--spacing-md);
`;

const Sidebar = styled(Pane)`
  width: 400px;
  align-items: unset;
  border-right: unset;
  border-left: thin solid var(--border-subtle);
`;

export default Root;
