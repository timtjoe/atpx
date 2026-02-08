import React from "react";
import styled, { keyframes } from "styled-components";

/* --- Animations --- */
const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

/* --- Reusable Skeleton Primitives --- */
const SkeletonBase = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${props => props.$width || "100%"};
  height: ${props => props.$height || "20px"};
  border-radius: ${props => props.$radius || "var(--radius-md)"};
  /* Using your palette: bg-grey and border-subtle */
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
      <SkeletonBase $width="200px" $height="28px" />
    </HeaderSection>
    
    <ListContainer>
      {[1, 2, 3, 4].map((i) => (
        <SkeletonCard key={i}>
          <SkeletonAvatar $width="64px" $height="64px" />
          
          <SkeletonBody>
            <SkeletonHeaderRow>
              <SkeletonBase $width="70%" $height="20px" />
              <SkeletonBase $width="24px" $height="24px" $radius="var(--round)" />
            </SkeletonHeaderRow>

            <SkeletonDescriptionStack>
              <SkeletonBase $height="14px" />
              <SkeletonBase $width="95%" $height="14px" />
              <SkeletonBase $width="90%" $height="14px" />
              <SkeletonBase $width="40%" $height="14px" />
            </SkeletonDescriptionStack>

            <SkeletonFooter>
              <SkeletonFooterLeft>
                 <SkeletonBase $width="60px" $height="12px" />
                 <SkeletonBase $width="4px" $height="4px" $radius="var(--round)" />
                 <SkeletonBase $width="80px" $height="12px" />
              </SkeletonFooterLeft>
              <SkeletonBase $width="50px" $height="22px" $radius="var(--squicle)" />
            </SkeletonFooter>
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
  padding: var(--spacing-xs) 0;
  margin-bottom: var(--spacing-md);
`;

const ListContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  overflow: hidden;
`;

const SkeletonCard = styled.div`
  min-width: 340px;
  height: 252px;
  padding: var(--spacing-md);
  /* Matches your design system border and radius */
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-white);
  display: flex;
  gap: var(--spacing-md);
`;

const SkeletonAvatar = styled(SkeletonBase)`
  flex-shrink: 0;
  border: 1px solid var(--border-light);
`;

const SkeletonBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const SkeletonHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
`;

const SkeletonDescriptionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const SkeletonFooter = styled.div`
  margin-top: auto;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkeletonFooterLeft = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
`;