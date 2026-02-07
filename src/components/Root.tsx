import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useMatches, UIMatch } from "react-router-dom";
import { Logo, Navigation, Footer } from "@components";
import { RouteHandle, NavConfig, RootContextType } from "@types";

const HOME_TABS = [
  { label: "For You", path: "/" },
  { label: "Following", path: "/following" },
  { label: "Trends", path: "/trends" },
  { label: "Discovery", path: "/discovery" },
];

export const Root = (): React.JSX.Element => {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  const currentMatch = [...matches].reverse().find((m) => m.handle);
  const routeHandle: RouteHandle = currentMatch?.handle || {};

  const [navConfig, setNavConfig] = useState<NavConfig>({
    title: routeHandle.title || null,
    showBack: routeHandle.showBack || false,
    tabs: routeHandle.showTabs ? HOME_TABS : [],
  });

  useEffect(() => {
    setNavConfig({
      title: routeHandle.title || null,
      showBack: routeHandle.showBack || false,
      tabs: routeHandle.showTabs ? HOME_TABS : [],
    });
  }, [routeHandle.title, routeHandle.showBack, routeHandle.showTabs]);

  return (
    <Body>
      <Pane>
        <Logo />
      </Pane>
      <Main id="app">
        <Navigation
          title={navConfig.title}
          showBack={navConfig.showBack}
          tabs={navConfig.tabs}
        />
        <Outlet context={{ setNavConfig } satisfies RootContextType} />
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

const Sidebar = styled(Pane)`
  width: 400px;
  align-items: unset;
  border-right: unset;
  border-left: thin solid var(--border-subtle);
`;

export default Root;
