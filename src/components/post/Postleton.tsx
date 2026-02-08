import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const SkeletonBase = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${props => props.$width || "100%"};
  height: ${props => props.$height || "14px"};
  border-radius: ${props => props.$radius || "var(--radius-xs)"};
  background: linear-gradient(to right, var(--bg-grey) 8%, var(--border-subtle) 18%, var(--bg-grey) 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite forwards;
`;

export const Postleton = () => (
  <CardSkeleton>
    <HeaderPart>
      <AuthorPart>
        <SkeletonBase $width="36px" $height="36px" $radius="var(--round)" />
        <MetaPart>
          <SkeletonBase $width="120px" $height="14px" />
          <SkeletonBase $width="80px" $height="10px" />
        </MetaPart>
      </AuthorPart>
      <SkeletonBase $width="24px" $height="24px" $radius="var(--radius-sm)" />
    </HeaderPart>

    <ContentPart>
      <SkeletonBase $height="15px" />
      <SkeletonBase $width="95%" $height="15px" />
      <SkeletonBase $width="40%" $height="15px" />
    </ContentPart>

    <FooterPart>
      <SkeletonBase $width="180px" $height="10px" />
    </FooterPart>
  </CardSkeleton>
);

/* --- Styled Components --- */

const CardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background: var(--bg-white);
  border-bottom: 1px solid var(--border-light);
`;

const HeaderPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const AuthorPart = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const MetaPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContentPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: var(--spacing-lg);
`;

const FooterPart = styled.div`
  padding-top: var(--spacing-md);
`;