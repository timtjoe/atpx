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
 */
export const formatCount = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const CommunityCard = ({ community, onRemove }: ICommunityCard) => {
  return (
    <Card href={community.feedUrl} target="_blank">
      <Avatar src={community.avatar || ""} alt={community.displayName} />
      <Body>
        <HeaderRow>
          <Name>{community.displayName}</Name>
          <IconButton size="small" variant="trans" onClick={(e) => {
            e.preventDefault(); e.stopPropagation(); onRemove?.(community.uri);
          }}>
            <XIcon size={16} />
          </IconButton>
        </HeaderRow>

        <Description>{community.description}</Description>

        <Footer>
          <Stats>
            <span>{formatCount(community.activeCount || 0)}</span> members
          </Stats>
          <Platform>{community.source}</Platform>
        </Footer>
      </Body>
    </Card>
  );
};

const Card = styled.a`
  display: flex;
  align-items: flex-start;
  width: 340px;
  height: 252px; /* Same height as previous 2-row grid */
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-md);
  background: var(--bg-white);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s;
  &:hover { border-color: var(--text-muted); }
`;

const Avatar = styled.img`
  width: 80px; /* Larger avatar for larger card */
  height: 80px;
  border-radius: var(--radius-md);
  object-fit: cover;
  border: thin solid var(--border-subtle);
`;

const Name = styled.h4`
  font-size: var(--font-md); /* Increased Title size */
  font-weight: 800;
  color: var(--text-bold);
  margin: 0;
`;

const Description = styled.p`
  font-size: var(--font-sm); /* Description size */
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 6; /* Much more space for text */
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 12px 0;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  font-size: var(--font-xs); /* Smallest text */
  font-weight: 600;
  color: var(--text-muted);
`;

const Stats = styled.div`
  span { color: var(--text-bold); font-weight: 700; }
`;

const Platform = styled.span`
  text-transform: capitalize;
  opacity: 0.8;
`;

/* --- Styles --- */


const Media = styled.div`
  flex-shrink: 0;
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



const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;


