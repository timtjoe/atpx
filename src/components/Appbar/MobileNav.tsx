import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { NAV_ITEMS, BOTTOM_BAR_IDS } from "@constants";
import { AppDrawer } from "./AppDrawer";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const bottomItems = NAV_ITEMS.filter((item) =>
    BOTTOM_BAR_IDS.includes(item.id),
  );
  const drawerItems = NAV_ITEMS.filter(
    (item) => !BOTTOM_BAR_IDS.includes(item.id),
  );

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <BottomBar>
      {bottomItems.map((item) => (
        <TabLink key={item.id} to={item.uri} onClick={() => setIsOpen(false)}>
          <item.icon size={26} />
        </TabLink>
      ))}

      <AppDrawer
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <ProfileTrigger onClick={handleToggle} $active={isOpen}>
            {/* Round box/button representing the profile */}
            <div className="inner-box" />
          </ProfileTrigger>
        }
      >
        <DrawerList>
          {drawerItems.map((item) => (
            <DrawerItem
              key={item.id}
              to={item.uri}
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={24} />
              <span>{item.label}</span>
            </DrawerItem>
          ))}
        </DrawerList>
      </AppDrawer>
    </BottomBar>
  );
};

/* --- Styled Components --- */
const BottomBar = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--bg-page);
  border-top: 1px solid var(--border-subtle);
  justify-content: space-around;
  align-items: center;
  z-index: 9999;
  pointer-events: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const ProfileTrigger = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner-box {
    width: 32px;
    height: 32px;
    background: ${(props) =>
      props.$active ? "var(--brand-primary)" : "var(--bg-soft)"};
    border: 2px solid
      ${(props) =>
        props.$active ? "var(--brand-primary)" : "var(--border-subtle)"};
    border-radius: 8px; /* Rounded box style */
    transition: all 0.2s ease;
  }
`;

const TabLink = styled(NavLink)`
  color: var(--text-main);
  &.active {
    color: var(--brand-primary);
  }
`;

const DrawerList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 4px;
`;

const DrawerItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: var(--text-main);
  font-weight: 600;
  padding: 16px 20px;
  border-radius: 12px;
  &.active {
    color: var(--brand-primary);
    background: var(--bg-soft);
  }
`;
