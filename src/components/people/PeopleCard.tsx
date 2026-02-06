import React from "react";
import styled, { keyframes } from "styled-components";
import { Person } from "./PeopleService";
import { X as XIcon, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { IconButton } from "../styles.comp";

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
        <XIcon size={16} />
      </RemoveButton>

      <Avatar
        src={person.avatar || "https://via.placeholder.com/97"}
        alt={person.displayName}
      />
      <Name title={person.displayName}>{person.displayName}</Name>
      <Handle>
        @
        {person.handle ? person.handle.replace(".bsky.social", "") : person.uri}
      </Handle>
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
  height: 200px;
  background: var(--bg-soft);
  border-radius: calc(var(--radius-md) + 4px);
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-sm);
`;

const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Avatar = styled.img`
  width: 97px;
  height: 97px;
  margin-bottom: 10px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--round);
  object-fit: cover;
  background: var(--bg-soft);
`;

const Name = styled.div`
  font-size: var(--font-sm);
  font-weight: 700;
  text-align: center;
  max-width: 140px;
  overflow: hidden;
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-bold);
`;

const Handle = styled.div`
  max-width: 140px;
  font-size: var(--font-xs);
  color: var(--text-bold);
  margin-top: var(--spacing-xs);
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-bold);
`;

export default PeopleCard;
