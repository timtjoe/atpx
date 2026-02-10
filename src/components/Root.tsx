import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useMatches, UIMatch } from "react-router-dom";
import {
  Taskbar,
  Sidebar,
  Toolbar,
  ErrorBoundary,
  TechnicalError,
} from "@components";
import { RouteHandle, NavConfig, RootContextType } from "@types";
import { HOME_TABS } from "@constants/navigation";

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
  }, [
    routeHandle.title,
    routeHandle.showBack,
    routeHandle.showTabs,
    currentMatch?.pathname,
  ]);

  return (
    <Body vaul-drawer-wrapper="">
      <SidePane />

      <Main id="app">
        <Toolbar
          title={navConfig.title ?? ""}
          showBack={navConfig.showBack}
          tabs={navConfig.tabs}
        />
        <Outlet context={{ setNavConfig } satisfies RootContextType} />
      </Main>

      <Sidebar />

      <MobileWrap>
        <ErrorBoundary
          fallback={<TechnicalError message="Navigation failed to load." />}
        >
          <Taskbar />
        </ErrorBoundary>
      </MobileWrap>
    </Body>
  );
};

/* --- Styled Components --- */
const SidePane = styled.aside`
  width: 275px;
  flex-shrink: 0;
  border-right: 1px solid var(--border-subtle);

  @media (max-width: 1100px) {
    width: 80px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: var(--width-lg);
  margin: 0 auto;
`;

const Main = styled.main`
  width: 600px;
  min-height: 100vh;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    padding-bottom: 80px;
  }
`;

const MobileWrap = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
`;
