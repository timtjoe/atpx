import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;

  @media (max-width: 768px) {
    padding: 0;
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

const Headbar = HeadActions;

export const Title = styled.h2`
  margin: 0;
  font-size: var(--font-md);
  font-weight: 800;
  color: var(--text-dark);

  @media (max-width: 768px) {
    font-size: var(--font-md);
  }
`;

export const Subtitle = styled.span`
  font-size: var(--font-sm);
  color: var(--text-grey);

  @media (max-width: 768px) {
    display: none !important;
  }
`;

