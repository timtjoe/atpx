import React from "react";
import styled, { keyframes } from "styled-components";
import { Community } from "./CommunityService";
import { X as XIcon, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  community: Community;
  onRemove?: (uri: string) => void;
  position?: number;
};

export const CommunityCard: React.FC<Props> = ({
  community,
  onRemove,
  position,
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove(community.uri);
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (community.feedUrl) window.open(community.feedUrl, "_blank", "noopener");
  };

  return (
    <Card
      as={motion.a}
      href={community.feedUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <RemoveButton onClick={handleRemove} aria-label="remove">
        <XIcon size={14} />
      </RemoveButton>
      {typeof position === "number" && (
        <PositionBadge>{position}</PositionBadge>
      )}
      <Avatar
        src={community.avatar || "https://via.placeholder.com/100"}
        alt={community.displayName}
      />
      <Name title={community.displayName}>{community.displayName}</Name>
      {community.description && (
        <Description>{community.description}</Description>
      )}
      <Source>
        {community.source === "bsky" ? "🦋 Bluesky" : "🐘 Mastodon"}
      </Source>
      <OpenButton onClick={handleOpen} aria-label="open-feed">
        <span>join</span>
        <ExternalLink size={14} />
      </OpenButton>
    </Card>
  );
};

const floatIn = keyframes`
  from { transform: translateY(8px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
`;

const Card = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 200px;
  text-decoration: none;
  color: inherit;
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 10px;
  box-sizing: border-box;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  animation: ${floatIn} 220ms ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 120ms ease,
    transform 120ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    transform: scale(1.08);
  }
`;

const PositionBadge = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 11px;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 6px;
  background: #eee;
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
  text-align: center;
  max-width: 130px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const Description = styled.div`
  font-size: 10px;
  color: var(--hn-gray);
  text-align: center;
  max-width: 130px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
`;

const Source = styled.div`
  font-size: 10px;
  color: var(--fb-blue);
  margin-bottom: 6px;
`;

const OpenButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 28px;
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  gap: 4px;
`;

export default CommunityCard;
