import React from "react";
import styled, { keyframes } from "styled-components";

/* --- Animations --- */
const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

/* --- Reusable Skeleton Primitive --- */
const SkeletonBase = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${props => props.$width || "100%"};
  height: ${props => props.$height || "20px"};
  border-radius: ${props => props.$radius || "var(--radius-xs)"};
  background: linear-gradient(
    to right, 
    var(--bg-grey) 8%, 
    var(--border-subtle) 18%, 
    var(--bg-grey) 33%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite forwards;
`;

export const Postleton = () => (
  <GridContainer>
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i}>
        <SkeletonHeader>
          <SkeletonBase $width="26px" $height="26px" $radius="50%" />
          <SkeletonBase $width="100px" $height="12px" $radius="4px" />
        </SkeletonHeader>
        
        <SkeletonBody>
          <SkeletonBase $height="14px" $radius="4px" />
          <SkeletonBase $height="14px" $radius="4px" />
          <SkeletonBase $width="60%" $height="14px" $radius="4px" />
        </SkeletonBody>
        
        <SkeletonBase 
          $width="80px" 
          $height="24px" 
          $radius="4px" 
          style={{ marginTop: "8px" }} 
        />
      </SkeletonCard>
    ))}
  </GridContainer>
);

/* --- Styled Components --- */

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  width: 100%;
`;

const SkeletonCard = styled.div`
  padding: var(--spacing-md);
  background: var(--bg-white);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  border-bottom: thin solid var(--border-subtle);
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;