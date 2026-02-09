import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import image from "/logo.svg";

interface ILogo {
  link?: string;
}

export const Logo = ({ link }: ILogo): React.JSX.Element => {
  return (
    <Container to={link || "/"} aria-label="Home">
      <Icon src={image} alt="Logo" />
    </Container>
  );
};

/* --- Styled Components --- */

const Container = styled(RouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 44px;
  height: 44px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: var(--bg-soft, rgba(0, 0, 0, 0.05));
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Icon = styled.img`
  width: 39px; 
  height: 39px;
  object-fit: contain;
  display: block;
  opacity: 0.95;
  transition: transform 0.2s ease;

  ${Container}:hover & {
    opacity: 1;
    transform: scale(1.08);
  }
`;
