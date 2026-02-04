import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin-top: auto;
  padding: 40px 0 20px;
  text-align: center;
  font-size: 11px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--hn-gray);
  opacity: 0.2;
  margin-bottom: 20px;
`;

const BadgeContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;

  img {
    height: 20px;
    border-radius: 3px;
  }
`;

export const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <Divider />
      <p style={{ margin: 0 }}>
        Made with ❤️ by{' '}
        <a href="https://github.com/timtjoe" target="_blank" rel="noreferrer" style={{ color: '#000', fontWeight: 'bold', textDecoration: 'none' }}>
          timtjoe
        </a>{' '}
        &copy; {currentYear}
      </p>
      
      <BadgeContainer>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TS" />
        <img src="https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white" alt="Bun" />
        <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
        <img src="https://img.shields.io/badge/ATProto-0085FF?style=flat-square&logo=bluesky&logoColor=white" alt="ATProto" />
      </BadgeContainer>
    </StyledFooter>
  );
});

Footer.displayName = 'Footer';