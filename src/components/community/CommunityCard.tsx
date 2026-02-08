import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { X as XIcon, Users } from "lucide-react";
import { Community } from "@/types/community";
import { Middot } from "@components";

interface ICommunityCard {
  community: Community;
  onRemove?: (uri: string) => void;
}

export const CommunityCard = ({
  community,
  onRemove,
}: ICommunityCard): React.JSX.Element => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (community.activeCount) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [community.activeCount]);

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
          <RemoveButton onClick={handleRemove}>
            <XIcon size={14} />
          </RemoveButton>
        </HeaderRow>

        <Description>{community.description}</Description>

        <Footer>
          <FooterLeft>
            <Stats>
              <Users size={12} strokeWidth={2.5} />
              <span>{community.activeCount?.toLocaleString()}</span>
            </Stats>
            <Middot />
            <ActivityInfo>
              <PulseDot $active={isPulsing} />
              <span>active now</span>
            </ActivityInfo>
          </FooterLeft>
          <Platform $type={community.source}>{community.source}</Platform>
        </Footer>
      </Body>
    </Card>
  );
};

/* --- Styles --- */

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
`;

const PulseDot = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  background-color: #22c55e;
  border-radius: 50%;
  margin-right: 2px;
  ${(props) =>
    props.$active &&
    css`
      animation: ${pulse} 1.5s infinite;
    `}
`;

const Card = styled.a`
  display: flex;
  width: 340px;
  height: 120px; /* Adjusted height slightly for better stacking */
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 18px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  gap: 14px;
`;

const Media = styled.div`
  flex-shrink: 0;
`;
const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  background: var(--bg-soft);
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Name = styled.h4`
  font-size: 15px;
  font-weight: 700;
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
`;
const Description = styled.p`
  font-size: 12px;
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
  color: var(--text-bold);
`;
const ActivityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-xs);
  color: var(--text-muted);
`;
const Platform = styled.span<{ $type?: string }>`
  color: ${(p) => (p.$type === "bsky" ? "#0085ff" : "#6364ff")};
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
`;
