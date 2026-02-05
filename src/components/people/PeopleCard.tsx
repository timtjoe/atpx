import React from "react";
import styled, { keyframes } from "styled-components";
import { Person } from "./PeopleService";
import { X as XIcon, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  person: Person;
  onRemove?: (uri: string) => void;
  position?: number;
};

export const PeopleCard: React.FC<Props> = ({ person, onRemove, position }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove(person.uri);
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (person.profileUrl) window.open(person.profileUrl, "_blank", "noopener");
  };

  return (
    <Card
      as={motion.a}
      href={person.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
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
        src={person.avatar || "https://via.placeholder.com/97"}
        alt={person.displayName}
      />
      <Name title={person.displayName}>{person.displayName}</Name>
      <Handle>
        @
        {person.handle ? person.handle.replace(".bsky.social", "") : person.uri}
      </Handle>
      <FollowButton onClick={handleFollow} aria-label="open-profile">
        <span>follow</span>
        <ExternalLink size={14} />
      </FollowButton>
    </Card>
  );
};

const floatIn = keyframes`
  from { transform: translateY(6px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
`;

const Card = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 224px;
  text-decoration: none;
  color: inherit;
  background: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 12px;
  box-sizing: border-box;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  animation: ${floatIn} 220ms ease;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 120ms ease,
    transform 120ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    transform: scale(1.05);
  }
`;

const PositionBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.06);
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 12px;
`;

const Avatar = styled.img`
  width: 97px;
  height: 97px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 10px;
  background: #eee;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin: 6px 0 4px 0;
  text-align: center;
  max-width: 140px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const Handle = styled.div`
  font-size: 12px;
  color: var(--fb-blue);
  margin-bottom: 12px;
`;

const FollowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 37px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  gap: 6px;
`;

export default PeopleCard;
