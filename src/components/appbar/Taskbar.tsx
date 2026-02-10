import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icons } from "@components/icons";
import { Sidebar } from "./Sidebar"; // Import your existing Sidebar
import { SidebarContent } from "./Sidebar";
import { AppDrawer } from "./AppDrawer";
import { Info } from "lucide-react";

export const Taskbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <BarRow>
        {/* Tab 1: Home */}
        <TabLink to="/" onClick={() => setIsOpen(false)}>
          <Icons.home size={26} strokeWidth={2} />
        </TabLink>

        <AppDrawer
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <ProfileTrigger $active={isOpen} aria-label="Information">
              <Info size={26} strokeWidth={2} />
            </ProfileTrigger>
          }
        >
          <div style={{ padding: "0 16px 40px" }}>
            <SidebarContent />
          </div>
        </AppDrawer>
      </BarRow>
    </Container>
  );
};

/* --- Styled Components --- */

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: var(--bg-page-alpha, rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(15px) saturate(160%);
  border-top: 1px solid var(--border-subtle);
  padding-bottom: env(safe-area-inset-bottom);
`;

const BarRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const TabLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  flex: 1;
  height: 100%;
  transition: color 0.2s ease;

  &.active {
    color: var(--text-bold);
  }
`;

const ProfileTrigger = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$active ? "var(--text-bold)" : "var(--text-muted)"};
  flex: 1;
  height: 100%;
  cursor: pointer;
  transition: color 0.2s ease;
`;

/**
 * This wrapper ensures the Sidebar looks correct inside a mobile drawer
 * by overriding any desktop-only fixed widths or borders.
 */
const DrawerSidebarWrapper = styled.div`
  /* Ensure the sidebar takes full width of the drawer content */
  aside {
    width: 100% !important;
    border-right: none !important;
    padding: 0;
  }

  /* Make sure the "Seeking Work" card within the sidebar has room */
  padding: 0 var(--spacing-md) 40px;
`;
