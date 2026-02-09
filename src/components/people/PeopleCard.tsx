import React from "react";
import styled from "styled-components";
import { Person } from "./PeopleService";
import { Icons } from "@/components/icons";
import { IconButton } from "@components/IconButton";

type Props = {
  person: Person;
  onRemove?: (uri: string) => void;
};

const PeopleCard: React.FC<Props> = ({ person, onRemove }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove(person.uri);
  };

  return (
    <Card href={person.profileUrl} target="_blank" rel="noopener noreferrer">
      <RemoveButton onClick={handleRemove} aria-label="remove">
        <Icons.close size={16} />
      </RemoveButton>

      <Avatar
        src={person.avatar || "https://via.placeholder.com/97"}
        loading="lazy"
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

/* --- Styled Components --- */

const Card = styled.a`
  width: 160px;
  height: 200px;
  padding: var(--spacing-sm);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-white);
  border-radius: calc(var(--radius-md) + 4px);
  border: 1px solid var(--border-light);
  text-decoration: none;
  transition: transform 0.15s ease-out;
  will-change: transform;
`;

const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  transition: color 0.15s ease;
  color: var(--text-black);

  svg {
    transition: color 0.15s ease;
  }

  &:hover {
    svg {
      color: var(--text-red);
    }
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-bold);
`;

const Handle = styled.div`
  max-width: 140px;
  font-size: var(--font-xs);
  color: var(--text-muted); /* Changed to muted for better visual hierarchy */
  margin-top: var(--spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default PeopleCard;
