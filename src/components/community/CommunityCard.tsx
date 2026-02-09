import React from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";
import { Community } from "@/types/community";
import { Clamp, Dot, IconButton, LinkButton } from "@components";

const formatCount = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const CommunityCard = ({
  community,
  onRemove,
}: {
  community: Community;
  onRemove?: (uri: string) => void;
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(community.uri);
  };

  // Web placeholder if avatar is missing
  const bannerUrl =
    community.avatar || "https://via.placeholder.com/280x140?text=No+Image";

  return (
    <Card>
      <RemoveButton size="small" variant="trans" onClick={handleRemove}>
        <Icons.close size={16} />
      </RemoveButton>

      <Banner>
        <Cover
          src={bannerUrl}
          loading="lazy"
          alt={community.displayName}
        />
      </Banner>

      <Body>
        <TitleRow>
          <NameLink href={community.feedUrl} target="_blank" rel="noopener">
            {community.displayName}
          </NameLink>
          <Dot />
          <Small>{formatCount(community.activeCount || 0)} members</Small>
          <SourceBadge
            href={community.profileUrl}
            target="_blank"
            $source={community.source}
          >
            {community.source}
            <Icons.external size={10} />
          </SourceBadge>
        </TitleRow>

        <Description>{community.description}</Description>

        <JoinButton
          href={community.feedUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Community
        </JoinButton>
      </Body>
    </Card>
  );
};

/* --- Styled Components --- */

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 250px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--bg-grey);
  overflow: hidden;
  position: relative;
`;

const Banner = styled.div`
  width: 100%;
  height: 115px;
  background-color: var(--bg-soft);
  overflow: hidden;
  border-bottom: 1px solid var(--border-subtle);
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--spacing-sm);
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const NameLink = styled.a`
  font-size: var(--font-sm);
  line-height: 22px;
  font-weight: 800;
  color: var(--text-black);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:visited {
    color: var(--text-black);
  }
`;

const Small = styled.small`
  font-size: var(--font-xs);
  color: var(--text-muted);
`;

const Description = styled(Clamp)`
  font-size: var(--font-sm);
  color: var(--text-black);
  line-height: 17px;
  display: -webkit-box;
`;

const JoinButton = styled(LinkButton)`
  width: 100%;
  margin-top: auto;
  border-radius: calc(var(--radius-sm) + 3px);
  &:visited {
    color: var(--text-white);
  }
`;

const SourceBadge = styled.a<{ $source: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-xs);
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  background: var(--bg-soft);
  color: var(--text-black);
  margin-left: auto;
`;
