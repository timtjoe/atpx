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

export const Peoleton = () => (
  <Container>
    <HeaderSection>
      <SkeletonBase $width="160px" $height="24px" />
    </HeaderSection>
    
    <ListContainer>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonCard key={i}>
          {/* Avatar Circle */}
          <SkeletonAvatar $width="97px" $height="97px" $radius="var(--round)" />
          
          {/* Name Line */}
          <SkeletonName $width="80%" $height="16px" />
          
          {/* Handle Line */}
          <SkeletonHandle $width="50%" $height="12px" />
        </SkeletonCard>
      ))}
    </ListContainer>
  </Container>
);

/* --- Styled Components --- */

const Container = styled.div`
  width: 100%;
  margin-top: var(--spacing-md);
  padding: 0 var(--spacing-md);
`;

const HeaderSection = styled.div`
  padding: var(--spacing-xs) 0;
  margin-bottom: var(--spacing-md);
`;

const ListContainer = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  overflow: hidden;
`;

const SkeletonCard = styled.div`
  flex: 0 0 auto;
  min-width: 160px;
  height: 200px;
  padding: var(--spacing-sm);
  background: var(--bg-white);
  border: 1px solid var(--border-subtle);
  /* Matches your PeopleCard logic: radius-md (17px) + 4px */
  border-radius: calc(var(--radius-md) + 4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SkeletonAvatar = styled(SkeletonBase)`
  margin-bottom: 10px;
  border: 1px solid var(--border-light);
`;

const SkeletonName = styled(SkeletonBase)`
  margin-top: var(--spacing-md);
`;

const SkeletonHandle = styled(SkeletonBase)`
  margin-top: var(--spacing-sm);
`;