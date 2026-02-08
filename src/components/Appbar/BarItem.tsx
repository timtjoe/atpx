import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface IBarItem {
  uri: string;
  label: string;
  icon: React.ElementType;
  badge?: number | boolean;
}

export const BarItem = ({ uri, label, icon: Icon, badge }: IBarItem) => {
  // Show indicator if badge is a number > 0 or explicitly true
  const hasNotifications =
    badge !== undefined &&
    badge !== false &&
    (typeof badge !== "number" || badge > 0);

  return (
    <Link to={uri} title={label}>
      <IconContainer>
        <Icon size={24} strokeWidth={2.2} />
        {hasNotifications && <NotificationDot />}
      </IconContainer>
    </Link>
  );
};

/* --- Styled Components --- */

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-main);
`;

const NotificationDot = styled.div`
  position: absolute;
  /* Positioned at the top right of the icon */
  top: -1px;
  right: -1px;

  width: 9px;
  height: 9px;
  background-color: var(--text-red);
  border: thin solid var(--border-sofe, #fff);
  border-radius: 50%;
  z-index: 1;
`;

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: var(--bg-soft, rgba(0, 0, 0, 0.05));
  }

  &.active {
    ${IconContainer} {
      color: var(--text-bold, #000);
      /* Opt: thicker stroke for active icon if using Lucide */
      svg {
        stroke-width: 2.5;
      }
    }
  }
`;
