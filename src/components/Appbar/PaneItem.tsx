import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface IPaneItem {
  uri: string;
  label: string;
  icon: React.ElementType;
  badge?: number | boolean;
}

export const PaneItem = ({ uri, label, icon: Icon, badge }: IPaneItem) => {
  return (
    <StyledLink to={uri} title={label}>
      <IconContainer>
        <Icon size={26} />
        {badge !== undefined && badge !== false && (
          <Badge $isDot={badge === true}>
            {typeof badge === "number" && badge > 0 ? badge : ""}
          </Badge>
        )}
      </IconContainer>
      <Label>{label}</Label>
    </StyledLink>
  );
};

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Prevents icon from squishing when text is long */
`;

const Badge = styled.div<{ $isDot: boolean }>`
  position: absolute;
  top: -2px;
  right: -4px;
  background-color: var(--brand-primary, #1d9bf0);
  color: white;
  border: 2px solid var(--bg-page, #fff);
  border-radius: 999px;
  min-width: ${(props) => (props.$isDot ? "10px" : "18px")};
  height: ${(props) => (props.$isDot ? "10px" : "18px")};
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.$isDot ? "0" : "2px")};
`;

const Label = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 15px;
  white-space: nowrap; /* Prevents text from wrapping to a second line */
  /* Media query removed: Text will now stay visible on all screens */
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 16px; /* Slightly increased horizontal padding */
  border-radius: 999px;
  text-decoration: none;
  color: var(--text-bold);
  transition: background 0.2s ease;

  &:hover {
    background: var(--bg-soft);
  }
  &.active {
    font-weight: 800;
    color: var(--brand-primary);
  }
`;