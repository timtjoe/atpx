import React from "react";
import styled from "styled-components";
import { Person } from "./PeopleService";
import { Icons } from "@/components/icons";
import { IconButton, LinkButton } from "@components/Buttons";

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
    <Card>
      <RemoveButton onClick={handleRemove} aria-label="remove">
        <Icons.close size={16} />
      </RemoveButton>

      <Avatar
        src={person.avatar || "https://via.placeholder.com/97"}
        loading="lazy"
        alt={person.displayName}
      />
      <NameLink
        href={person.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {person.displayName}
      </NameLink>
      <Handle>
        @
        {person.handle ? person.handle.replace(".bsky.social", "") : person.uri}
      </Handle>

      <LinkButton
        href={person.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Follow
      </LinkButton>
    </Card>
  );
};

/* --- Styled Components --- */
const Card = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 220px;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  background-color: var(--bg-white);
  transition: transform 0.15s ease-out;
  will-change: transform;
`;

export const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  color: var(--text-black);

  &:hover {
    background: var(--bg-trans);
  }
`;

const Avatar = styled.img`
  width: 95px;
  height: 95px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--round);
  object-fit: cover;
  background: var(--bg-soft);
  margin-bottom: 14px;
`;

const NameLink = styled.a`
  max-width: 120px;
  font-size: var(--font-sm);
  line-height: 18px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-black);
`;

const Handle = styled.div`
  max-width: 120px;
  font-size: var(--font-xs);
  line-height: 16px;
  color: var(--text-grey);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default PeopleCard;
