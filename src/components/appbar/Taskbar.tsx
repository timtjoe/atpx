import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import { User } from "lucide-react";
import { Icons } from "@components/icons";
import { TASKBAR_PRIMARY, TASKBAR_SECONDARY } from "@constants";
import { AppDrawer } from "./AppDrawer";

export const Taskbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <BarRow>
        {TASKBAR_PRIMARY.map((item) => (
          <TabLink key={item.id} to={item.uri} onClick={() => setIsOpen(false)}>
            <item.icon size={26} strokeWidth={2} />
          </TabLink>
        ))}

        <AppDrawer
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <ProfileTrigger $active={isOpen} aria-label="Menu">
              <Icons.user size={26} strokeWidth={2} />
            </ProfileTrigger>
          }
        >
          <DrawerContent>
            <DrawerList>
              {TASKBAR_SECONDARY.map((item) => (
                <DrawerItem
                  key={item.id}
                  to={item.uri}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={22} />
                  <span>{item.label}</span>
                </DrawerItem>
              ))}
            </DrawerList>
          </DrawerContent>
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
  padding-bottom: env(safe-area-inset-bottom); /* iOS support */
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

  &:hover {
    color: var(--text-bold);
  }
`;

const DrawerContent = styled.div`
  padding: 16px;
  padding-bottom: 80px;
  background: var(--bg-page);
  border-radius: 24px 24px 0 0;
`;

const DrawerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DrawerItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: var(--text-main);
  font-weight: 600;
  padding: 16px;
  border-radius: 12px;
  transition: background 0.2s;

  &:active {
    background: var(--bg-soft);
  }

  &.active {
    color: var(--text-bold);
    background: var(--bg-soft);
  }
`;
