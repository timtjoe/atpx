import React from "react";
import styled, { keyframes } from "styled-components";

/* --- Animations --- */
const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

/* --- Reusable Skeleton Primitive --- */
const SkeletonBase = styled.div<{
  $width?: string;
  $height?: string;
  $radius?: string;
}>`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "20px"};
  border-radius: ${(props) => props.$radius || "var(--radius-md)"};
  
  /* UPDATED: Higher contrast gradient to stand out against var(--bg-grey) */
  background: linear-gradient(
    to right,
    var(--border-subtle) 8%,
    var(--bg-soft) 18%,
    var(--border-subtle) 33%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite forwards;
  position: relative;
  overflow: hidden;
`;

export const Comleton = () => (
  <Container>
    <HeaderSection>
      <SkeletonBase $width="180px" $height="24px" />
    </HeaderSection>

    <ListContainer>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i}>
          {/* Banner Placeholder */}
          <SkeletonBase $height="115px" $radius="0" />

          <SkeletonBody>
            {/* Title Line */}
            <SkeletonBase
              $width="85%"
              $height="18px"
              style={{ marginBottom: "12px" }}
            />

            {/* Description Block */}
            <SkeletonBase
              $height="34px"
              $radius="var(--radius-sm)"
              style={{ marginBottom: "12px" }}
            />

            {/* Join Button Placeholder */}
            <SkeletonBase
              $height="32px"
              $radius="calc(var(--radius-sm) + 3px)"
              style={{ marginTop: "auto" }}
            />
          </SkeletonBody>
        </SkeletonCard>
      ))}
    </ListContainer>
  </Container>
);

/* --- Styled Components --- */

const Container = styled.div`
  width: 100%;
  margin-top: var(--spacing-xl);
  padding: 0 var(--spacing-sm);
`;

const HeaderSection = styled.div`
  margin-bottom: var(--spacing-md);
`;

const ListContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  overflow: hidden;
`;

const SkeletonCard = styled.div`
  flex-shrink: 0;
  width: 270px;
  height: 250px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  /* The Card background */
  background: var(--border-subtle); 
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SkeletonBody = styled.div`
  padding: var(--spacing-sm);
  flex: 1;
  display: flex;
  flex-direction: column;
`;