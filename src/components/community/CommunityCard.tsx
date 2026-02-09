import React from "react";
import styled from "styled-components";
import { X as XIcon, ExternalLink, Calendar } from "lucide-react";
import { Community } from "@/types/community";
import { IconButton } from "@components";

/* --- Sub-component: Appealing Mid-Dot --- */
const Dot = styled.span`
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--text-muted);
  opacity: 0.4;
  flex-shrink: 0;
`;

const formatCount = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const CommunityCard = ({ community, onRemove }: { 
  community: Community; 
  onRemove?: (uri: string) => void 
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(community.uri);
  };

  return (
    <CardContainer>
      <Avatar src={community.avatar || ""} alt={community.displayName} />
      
      <Body>
        <HeaderRow>
          <Name>{community.displayName}</Name>
          <IconButton size="small" variant="trans" onClick={handleRemove}>
            <XIcon size={16} />
          </IconButton>
        </HeaderRow>

        <ContentLink href={community.feedUrl} target="_blank" rel="noopener">
          <Description>{community.description}</Description>
        </ContentLink>

        <Footer>
          <FooterSection>
            <Stats>
              <span>{formatCount(community.activeCount || 0)}</span> members
            </Stats>
            
            <Dot /> {/* Using the new Dot component here */}
            
            <UpdateTime>
              <Calendar size={12} />
              <span>Trending Now</span>
            </UpdateTime>
          </FooterSection>

          <SourceLink 
            href={community.profileUrl} 
            target="_blank" 
            $source={community.source}
          >
            {community.source}
            <ExternalLink size={10} />
          </SourceLink>
        </Footer>
      </Body>
    </CardContainer>
  );
};

/* --- Styled Components --- */

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 340px;
  height: 252px;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  object-fit: cover;
  border: 1px solid var(--border-subtle);
  background: var(--bg-soft);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  min-width: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const Name = styled.h4`
  font-size: var(--font-md);
  font-weight: 800;
  color: var(--text-bold);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  flex: 1;
  &:hover p { color: var(--text-bold); }
`;

const Description = styled.p`
  font-size: var(--font-sm);
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  transition: color 0.2s;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border-extra-light);
`;

const FooterSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-muted);
  font-size: var(--font-xs);
`;

const Stats = styled.div`
  font-weight: 600;
  span { color: var(--text-bold); }
`;

const UpdateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
`;

const SourceLink = styled.a<{ $source: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 20px;
  background: var(--bg-soft);
  color: var(--text-muted);
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$source === 'bsky' ? '#0085ff20' : '#6364ff20'};
    color: ${props => props.$source === 'bsky' ? '#0085ff' : '#6364ff'};
  }
`;