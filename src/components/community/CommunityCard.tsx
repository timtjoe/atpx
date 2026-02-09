import React from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons";
import { Community } from "@/types/community";
import { Dot, IconButton } from "@components";
import { LinkButton } from "@components/Buttons";

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
  const bannerUrl = community.avatar || "https://via.placeholder.com/280x140?text=No+Image";

  return (
    <CardContainer>
      <RemoveButton size="small" variant="trans" onClick={handleRemove}>
        <Icons.close size={16} />
      </RemoveButton>

      {/* Top Section: Full Width Hero Banner */}
      <Banner>
        <BannerImage 
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
          
          <SourceBadge href={community.profileUrl} target="_blank" $source={community.source}>
            {community.source}
            <Icons.external size={10} />
          </SourceBadge>
        </TitleRow>

        <MetaRow>
          <span>{formatCount(community.activeCount || 0)} members</span>
          <Dot />
          <span className="trending">Trending Now</span>
        </MetaRow>

        <Description>{community.description}</Description>

        <JoinButton href={community.feedUrl} target="_blank" rel="noopener noreferrer">
          Join Community
        </JoinButton>
      </Body>
    </CardContainer>
  );
};

/* --- Styled Components --- */

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 330px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--bg-white);
  overflow: hidden;
  position: relative;
`;

const Banner = styled.div`
  width: 100%;
  height: 140px;
  background-color: var(--bg-soft);
  overflow: hidden;
  border-bottom: 1px solid var(--border-extra-light);
`;

const BannerImage = styled.img`
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
  padding: var(--spacing-md);
  flex: 1;
  min-height: 0; 
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: var(--spacing-sm);
`;

const NameLink = styled.a`
  font-size: var(--font-md);
  font-weight: 800;
  color: var(--text-bold);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-xs);
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
`;

const Description = styled.p`
    font-size: var(--font-sm);
  color: var(--text-black);
  line-height: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const JoinButton = styled(LinkButton)`
  width: 100%;
  margin-top: auto; 
  height: 38px;
  border-radius: var(--radius-sm);

  &:visited {
    color: var(--text-white);
  }
`;

const SourceBadge = styled.a<{ $source: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-soft);
  color: var(--text-black);
`;