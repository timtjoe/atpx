import React from "react";
import styled from "styled-components";
import image from "/logo.svg";

interface ILogo {
  link?: string;
}

export const Logo = ({ link }: ILogo): React.JSX.Element => {
  return (
    <Link href={link || "/"} aria-label="Home">
      <Icon src={image} alt="Logo" />
    </Link>
  );
};

/* --- Styled Components --- */

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Matches PaneItem size exactly */
  width: 60px;
  height: 60px;
  
  /* Matches PaneItem squircle radius */
  border-radius: 20px;
  
  text-decoration: none;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: var(--bg-trans, rgba(0, 0, 0, 0.05));
  }
`;

const Icon = styled.img`
  /* Set a fixed size for the logo mark inside the 60px container */
  width: 32px; 
  height: 32px;
  
  /* Keeps the SVG crisp and centered */
  object-fit: contain;
  display: block;
  
  /* Inherits black color if the SVG is set to 'currentColor', 
     otherwise this controls opacity */
  opacity: 0.9;
  transition: transform 0.2s ease;

  ${Link}:hover & {
    opacity: 1;
    /* Subtle scale effect on hover */
    transform: scale(1.05);
  }
`;

export default Logo;