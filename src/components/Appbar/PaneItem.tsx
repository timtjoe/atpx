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
        <Icon size={28} />
        {badge !== undefined && badge !== false && (
          <Badge $isDot={badge === true}>
            {typeof badge === "number" && badge > 0 ? badge : ""}
          </Badge>
        )}
      </IconContainer>
    </StyledLink>
  );
};

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Ensure icon itself is black as requested */
  color: var(--bg-black, #000); 
`;

const Badge = styled.div<{ $isDot: boolean }>`
  position: absolute;
  top: -2px;
  right: -2px;
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
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Fixed 60x60 size */
  width: 60px;
  height: 60px;
  
  /* Squicle-like border radius */
  border-radius: 20px; 
  
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-trans, rgba(0, 0, 0, 0.05));
  }
  
  &.active {
    background: var(--bg-trans, rgba(0, 0, 0, 0.08));
    /* Active icon can stay black or switch to brand color */
    ${IconContainer} {
       color: var(--brand-primary);
    }
  }
`;