import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  align-items: center;

  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: var(--spacing-lg);
  }
`;

export const HeadActions = styled.section`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Tagline = styled.span`
  font-size: var(--font-md);
  color: var(--text-muted);

  @media (max-width: 768px) {
    display: none !important;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--text-dark);
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: var(--font-md);
  }
`;