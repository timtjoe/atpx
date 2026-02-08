import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(to right, var(--bg-soft) 8%, var(--border-subtle) 18%, var(--bg-soft) 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite forwards;
  border-radius: var(--radius-md);
`;

export const Comleton = () => (
  <Container>
    <Header>
      <SkeletonBase style={{ width: "180px", height: "24px" }} />
    </Header>
    <ListContainer>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i}>
          <SkeletonBase style={{ width: "80px", height: "80px" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <SkeletonBase style={{ width: "60%", height: "20px" }} />
            <SkeletonBase style={{ width: "90%", height: "40px" }} />
            <SkeletonBase style={{ width: "40%", height: "15px", marginTop: "auto" }} />
          </div>
        </SkeletonCard>
      ))}
    </ListContainer>
  </Container>
);

const Container = styled.div`
  width: 100%;
  margin-top: var(--spacing-xl);
  padding: 0 var(--spacing-sm);
`;

const Header = styled.div`
  padding: var(--spacing-xs) 0;
  margin-bottom: var(--spacing-sm);
`;

const ListContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow: hidden;
`;

const SkeletonCard = styled.div`
  min-width: 340px;
  height: 252px;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  display: flex;
  gap: var(--spacing-md);
`;