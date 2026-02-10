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

export const Treleton = (): React.JSX.Element => (
  <Frame>
    <HeaderSection>
      <SkeletonBase $width="150px" $height="24px" />
    </HeaderSection>
    <Grid>
      {Array.from({ length: 12 }).map((_, i) => (
        <Item key={i}>
          <SkeletonBase $width="80%" $height="12px" $radius="2px" />
          <SkeletonBase $width="50%" $height="10px" $radius="2px" />
        </Item>
      ))}
    </Grid>
  </Frame>
);

/* --- Styled Components --- */

const Frame = styled.div`
  max-width: 100%;
  min-height: 33px;
  background-color: var(--bg-soft);
  padding: var(--spacing-md);
`;

const HeaderSection = styled.div`
  margin-bottom: var(--spacing-lg);
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
`;