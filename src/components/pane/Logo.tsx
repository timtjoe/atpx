import React from "react";
import styled from "styled-components";
import logoSrc from "/logo.jpg";

interface ILogo {
  link?: string;
  children?: string;
}

export const Logo = ({ link, children }: ILogo): React.JSX.Element => {
  return (
    <Link href={link ? link : "/"} aria-label="Home">
      <Image src={logoSrc} />
    </Link>
  );
};

const Link = styled.a`
width: 76px;
padding: var(--spacing-xs);
`;

const Image = styled.img`
  display: block;
  height: 34px;
  width: auto;
`;

export default Logo;
