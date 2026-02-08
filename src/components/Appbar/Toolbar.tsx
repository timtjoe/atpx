import React from "react";
import styled from "styled-components";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Logo } from "./Logo";
import { BarItem } from "./BarItem";
import { NAV_ITEMS } from "@constants";
import { ErrorBoundary } from "@components/ErrorBoundary";

interface IToolbar {
  title?: string;
  showBack?: boolean;
  tabs?: { label: string; path: string }[];
}

export const Toolbar = ({ title, showBack, tabs }: IToolbar) => {
  const navigate = useNavigate();

  return (
    <FixedContainer>
      <TopRow>
        {/* Left: Home button (Desktop only) */}
        <LeftSection>
          <DesktopHomeButton onClick={() => navigate("/")} title="Home">
            <Home size={22} strokeWidth={2.2} />
          </DesktopHomeButton>
        </LeftSection>

        {/* Center: Logo (Always centered) */}
        <CenterSection>
          <Logo />
        </CenterSection>

        {/* Right: Actions (Desktop only) */}
        <RightSection>
          <DesktopIcons>
            {NAV_ITEMS.map((item) => (
              <ErrorBoundary key={item.id}>
                <BarItem {...item} />
              </ErrorBoundary>
            ))}
          </DesktopIcons>
        </RightSection>
      </TopRow>

      <Navbar title={title} showBack={showBack} tabs={tabs} />
    </FixedContainer>
  );
};

/* --- Styled Components --- */

const FixedContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 2000;
  width: 100%;
  background: var(--bg-page-alpha, rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(15px) saturate(160%);
  -webkit-backdrop-filter: blur(15px) saturate(160%);
  border-bottom: 1px solid var(--border-subtle);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-extra-light, #f0f0f0);
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const CenterSection = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const DesktopHomeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-main);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: var(--bg-soft);
  }

  /* Hide on mobile to keep the top row minimal */
  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopIcons = styled.div`
  display: flex;
  gap: 8px;

  /* Hide on mobile because these are in the Taskbar */
  @media (max-width: 768px) {
    display: none;
  }
`;
