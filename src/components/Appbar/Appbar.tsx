import React, { useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import logoSrc from "/atpx_sm.jpg";

export const Appbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Small threshold to trigger state change
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container $scrolled={isScrolled}>
      <Content $scrolled={isScrolled}>
        <a href="/">
          <LogoImage src={logoSrc} alt="Logo" $scrolled={isScrolled} />
        </a>
        <Tagline $scrolled={isScrolled}>What's happening in the fediverse.</Tagline>
      </Content>
    </Container>
  );
};

const Container = styled.header<{ $scrolled: boolean }>`
  width: 100%;
  background-color: var(--bg-white);
  display: grid;
  place-items: center;
  z-index: 1000;
  will-change: padding, box-shadow;
  transition: padding 0.3s ease-out, box-shadow 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  ${props => props.$scrolled ? css`
    position: fixed;
    top: 0;
    left: 0;
    padding: 6px 0; 
  ` : css`
    position: relative;
    padding: var(--spacing-sm) 0;
  `}
`;

const Content = styled.div<{ $scrolled: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 9px;
  will-change: transform;
  transition: transform 0.1s ease-out;

  ${props => props.$scrolled && css`
    transform: scale(0.95);
  `}

  @media (max-width: 693px) {
    width: 90%;
  }
`;

const Tagline = styled.h3<{ $scrolled: boolean }>`
  padding-left: 9px;
  border-left: 1px solid var(--bg-gray);
  font-size: var(--font-md);
  color: var(--text-black);
  margin: 0;
  
  @media (max-width: 693px) {
    font-size: var(--font-sm);
  }
`;

const LogoImage = styled.img<{ $scrolled: boolean }>`
  display: block;
  will-change: height;
  transition: height 0.1s ease-out;
  height: ${props => props.$scrolled ? '26px' : '34px'}; 
  width: auto;
`;

export default Appbar;