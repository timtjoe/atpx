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
  width: 100px;
  height: 55px;
  text-decoration: none;
  overflow: hidden;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  display: block;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  ${Link}:hover & {
    opacity: 1;
  }
`;

export default Logo;
