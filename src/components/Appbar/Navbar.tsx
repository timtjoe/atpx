import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface INavbar {
  title?: string;
  showBack?: boolean;
  tabs?: { label: string; path: string }[];
}

export const Navbar = ({ title = "", showBack, tabs = [] }: INavbar) => {
  const navigate = useNavigate();
  const hasTabs = tabs.length > 0;

  return (
    <NavContent>
      {showBack && (
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </BackButton>
      )}
      {!hasTabs && <Title>{title}</Title>}
      {hasTabs && (
        <TabsList>
          {tabs.map((tab) => (
            <TabItem key={tab.path} to={tab.path}>
              <span>{tab.label}</span>
            </TabItem>
          ))}
        </TabsList>
      )}
    </NavContent>
  );
};

/* --- Styled Components --- */

const NavContent = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  gap: 12px;
  
  /* Remove side padding on mobile for tabs to use full width */
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-bold);
  padding-left: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-left: 8px;
  cursor: pointer;
  color: var(--text-main);
  display: flex;
  align-items: center;
  border-radius: 50%;
  transition: background 0.2s;

  &:active {
    background: var(--bg-soft);
  }
`;

const TabsList = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
`;

const TabItem = styled(NavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 600;
  position: relative;
  transition: all 0.1s ease-in-out;

  /* Text size logic */
  font-size: 0.95rem; /* Desktop default */

  @media (max-width: 768px) {
    font-size: 0.82rem; /* Reduced for small devices */
    letter-spacing: -0.01em;
  }
  
  span {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 4px;
  }

  &:hover {
    background-color: var(--bg-trans);
  }

  &.active {
    color: var(--text-bold);
    font-weight: 700;

    span::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px; /* Slightly thinner on mobile */
      background: var(--bg-black, #000);
      border-radius: 10px 10px 0 0;
    }
  }
`;