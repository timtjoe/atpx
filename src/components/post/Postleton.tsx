import React from "react";
import styled, { keyframes } from "styled-components";

export const Postleton = () => (
  <GridContainer>
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i}>
        <SkeletonHeader>
          <div className="circle" />
          <div className="line name" />
        </SkeletonHeader>
        <SkeletonBody>
          <div className="line" />
          <div className="line" />
          <div className="line short" />
        </SkeletonBody>
        <div
          style={{
            height: "24px",
            width: "80px",
            background: "var(--bg-subtle)",
            borderRadius: "4px",
            marginTop: "8px",
          }}
        />
      </SkeletonCard>
    ))}
  </GridContainer>
);

const shimmer = keyframes`
  0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; }
`;

const SkeletonCard = styled.div`
  padding: var(--spacing-md);
  background: var(--bg-white);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  animation: ${shimmer} 1.5s infinite ease-in-out;
  border-bottom: thin solid var(--border-subtle);
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  .circle {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--border-subtle);
  }
  .line {
    height: 12px;
    background: var(--border-subtle);
    border-radius: 4px;
  }
  .name {
    width: 100px;
  }
`;

const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .line {
    height: 14px;
    background: var(--border-subtle);
    border-radius: 4px;
    width: 100%;
  }
  .short {
    width: 60%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  width: 100%;
`;
