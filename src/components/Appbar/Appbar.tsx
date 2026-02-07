import React from 'react';
import styled from "styled-components";
import logoSrc from "/atpx_sm.jpg";

export const Appbar = () => {
  return (
    <Container>
      <Content>
        <a href="/">
          <LogoImage src={logoSrc} alt="Logo" />
        </a>
        {/* <Tagline>What's happening in the fediverse.</Tagline> */}
      </Content>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  background-color: var(--bg-white);
  z-index: 1000;
  position: relative;
  padding: var(--spacing-sm) 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 9px;

  @media (max-width: 693px) {
    width: 90%;
  }
`;

const Tagline = styled.h3`
  padding-left: 9px;
  border-left: 1px solid var(--border-gray);
  font-size: var(--font-md);
  color: var(--text-black);
  margin: 0;
  
  @media (max-width: 693px) {
    font-size: var(--font-sm);
  }
`;

const LogoImage = styled.img`
  display: block;
  /* Height is now constant at the original size */
  height: 34px; 
  width: auto;
`;

export default Appbar;