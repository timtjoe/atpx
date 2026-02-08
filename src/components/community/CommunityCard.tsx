import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { X as XIcon } from "lucide-react";
import { Community } from "@/types/community";
import { IconButton } from "@components";

interface ICommunityCard {
  community: Community;
  onRemove?: (uri: string) => void;
}

/**
 * Compact Number Formatter
 * 899 -> 899
 * 1000 -> 1K
 * 1500 -> 1.5K
 * 389080 -> 389.1K
 */
export const formatCount = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const CommunityCard = ({
  community,
  onRemove,
}: ICommunityCard): React.JSX.Element => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(community.uri);
  };

  return (
    <Card href={community.feedUrl} target="_blank" rel="noopener noreferrer">
      <Media>
        <Avatar src={community.avatar || ""} alt={community.displayName} />
      </Media>

      <Body>
        <HeaderRow>
          <Name>{community.displayName}</Name>
          <IconButton size="small" variant="trans" onClick={handleRemove}>
            <XIcon size={16} />
          </IconButton>
        </HeaderRow>

        <Description>{community.description}</Description>

        <Footer>
          <FooterLeft>
            <Stats>
              <span>{formatCount(community.activeCount || 0)}</span>
            </Stats>
            <span>members</span>
          </FooterLeft>
          <Platform $type={community.source}>{community.source}</Platform>
        </Footer>
      </Body>
    </Card>
  );
};

/* --- Styles --- */

const Card = styled.a`
  display: flex;
  align-items: flex-start;
  width: 340px;
  height: 120px;
  background: var(--bg-white);
  border: 1px solid var(--border-gray);
  padding: var(--spacing-md);
  text-decoration: none;
  color: inherit;
  gap: var(--spacing-md);
`;

const Media = styled.div`
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20px/20px;
  object-fit: cover;
  background: var(--bg-soft);
  border: thin solid var(--border-subtle);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  height: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Name = styled.h4`
  font-size: var(--font-sm);
  font-weight: 800;
  color: var(--text-bold);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-muted);
  opacity: 0.3;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  font-size: var(--font-sm);
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 4px 0;
  line-height: 1.4;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--text-muted);
`;

const Platform = styled.span<{ $type?: string }>`
  color: var(--text-mutted);
  font-size: var(--font-xs);
  font-weight: 600;
  text-transform: capitalize;
`;
