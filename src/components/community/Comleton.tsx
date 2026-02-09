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
  border-radius: ${props => props.$radius || "var(--radius-md)"};
  background: linear-gradient(
    to right, 
    var(--bg-grey) 8%, 
    var(--border-subtle) 18%, 
    var(--bg-grey) 33%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite forwards;
`;

export const Comleton = () => (
  <Container>
    <HeaderSection>
      <SkeletonBase $width="220px" $height="28px" />
    </HeaderSection>
    
    <ListContainer>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i}>
          {/* Top Section: Full Width Image Placeholder */}
          <SkeletonBase $height="140px" $radius="0" />
          
          <SkeletonBody>
            <SkeletonHeaderRow>
              <SkeletonBase $width="60%" $height="20px" />
              <SkeletonBase $width="40px" $height="16px" $radius="4px" />
            </SkeletonHeaderRow>

            {/* Metadata Line */}
            <SkeletonBase $width="80%" $height="12px" style={{ marginBottom: '16px' }} />

            {/* Description Lines (Direct stack) */}
            <SkeletonDescription>
              <SkeletonBase $height="10px" />
              <SkeletonBase $height="10px" />
              <SkeletonBase $width="70%" $height="10px" />
            </SkeletonDescription>

            {/* Bottom Button Placeholder */}
            <SkeletonBase $height="38px" $radius="var(--radius-md)" />
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
  width: 280px;
  height: 380px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--bg-white);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SkeletonBody = styled.div`
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SkeletonHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SkeletonDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1; /* Pushes the button placeholder to the very bottom */
`;