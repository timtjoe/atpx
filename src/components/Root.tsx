import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useMatches, UIMatch } from "react-router-dom";
import { Navigation, Footer, Pane, MobileNav } from "@components";
import { RouteHandle, NavConfig, RootContextType } from "@types";
import { HOME_TABS } from "@constants";

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
  }, [routeHandle.title, routeHandle.showBack, routeHandle.showTabs, currentMatch?.pathname]);

  return (
<Body vaul-drawer-wrapper="">
      <SidePane>
        <StickyWrapper><Pane /></StickyWrapper>
      </SidePane>

      <Main id="app">
        <Navigation
          title={navConfig.title ?? ""}
          showBack={navConfig.showBack}
          tabs={navConfig.tabs}
        />
        <Outlet context={{ setNavConfig } satisfies RootContextType} />
      </Main>

      <Sidebar>
        <StickyWrapper><Footer /></StickyWrapper>
      </Sidebar>

      {/* FIXED: Move this OUTSIDE of Main so it can sit 
          correctly in the global stacking context */}
      <MobileNavWrapper>
        <MobileNav />
      </MobileNavWrapper>
    </Body>
  );
};

/* --- Styled Components --- */

const Body = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: var(--width-lg);
  margin: 0 auto;
`;

const SidePane = styled.aside`
  width: 275px;
  flex-shrink: 0; 
  display: flex;
  justify-content: flex-end;
  border-right: 1px solid var(--border-subtle);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = styled.aside`
  width: 350px;
  flex-shrink: 0;
  border-left: 1px solid var(--border-subtle);

  @media (max-width: 1100px) {
    display: none;
  }
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  padding: 0 12px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Main = styled.main`
  width: 600px;
  min-height: 100vh;
  flex-shrink: 0; 
  /* Important: Do NOT use overflow: hidden here, 
     it will break the sticky Navigation component.
  */

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    /* padding-bottom ensures the last piece of content isn't under the fixed nav */
    padding-bottom: 80px; 
  }
`;

const MobileNavWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed; /* Fixes it to the glass/screen */
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999; /* Ensure it is above the content and Navigation */
  }
`;

export default Root;