import React from "react";
import styled, { keyframes } from "styled-components";

export const Treleton = (): React.JSX.Element => (
  <Frame>
    <Header />
    <Grid>
      {Array.from({ length: 12 }).map((_, i) => (
        <Item key={i}>
          <div className="head" />
          <div className="body" />
        </Item>
      ))}
    </Grid>
  </Frame>
);

const shimmer = keyframes`
  0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; }
`;

const Frame = styled.div`
  max-width: 500px;
  min-height: 33px;
  background-color: var(--bg-soft);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  animation: ${shimmer} 1.5s infinite;
`;

const Header = styled.div`
  height: 24px;
  width: 150px;
  background: var(--border-subtle);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--radius-xs);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-md);
`;

const Item = styled.div`
  height: 62px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .head {
    height: 12px;
    width: 80%;
    background: var(--border-subtle);
    border-radius: 2px;
  }
  .body {
    height: 10px;
    width: 50%;
    background: var(--border-light);
    border-radius: 2px;
  }
`;
