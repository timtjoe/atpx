import React from "react";
import styled from "styled-components";

export const Footer = React.memo(() => {
  return (
    <Container>
      <ProductionText>
        A{" "}
        <GithubLink
          href="https://github.com/timtjoe"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tim T. Joe
        </GithubLink>{" "}
        production
      </ProductionText>

      <PowerText>
        powered by <strong>atproto</strong>
      </PowerText>

      <LinksRow>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Cookies</a>
        <span>© {new Date().getFullYear()}</span>
      </LinksRow>
    </Container>
  );
});

/* --- Styled Components --- */

const Container = styled.footer`
  padding: var(--spacing-lg) var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers items horizontally */
  text-align: center; /* Centers text lines */
  gap: 4px;
  margin-top: auto;
`;

const ProductionText = styled.div`
  font-size: 13px;
  color: var(--text-main);
`;

const GithubLink = styled.a`
  font-weight: 700;
  color: var(--text-bold);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: var(--text-blue);
  }
`;

const PowerText = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  strong {
    color: var(--text-blue);
    font-weight: 700;
  }
`;

const LinksRow = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centers the row of links */
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);

  a {
    transition: color 0.2s;
    &:hover {
      text-decoration: underline;
      color: var(--text-main);
    }
  }
`;

Footer.displayName = "Footer";
