import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";
import { X, ExternalLink, RotateCw } from 'lucide-react';

interface TrendDialogProps {
  topic: any;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export const TrendDialog = ({ topic, loading, isOpen, onClose, onRefresh }: TrendDialogProps) => {
  
  // Explicit Escape key listener to ensure it closes regardless of focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getPostLink = (post: any) => {
    if (post.url) return post.url;
    return `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`;
  };

  const getProfileLink = (actor: any) => {
    if (actor.url) return actor.url;
    return `https://bsky.app/profile/${actor.handle}`;
  };

  return (
    // z-[9999] ensures it is at the very top of the stack
    <Dialog open={isOpen} onClose={onClose} className="relative z-[9999]">
      <StyledBackdrop transition />
      
      <ModalWrapper>
        <DialogPanel transition>
          <ModalContent>
            <HeaderActions>
              {onRefresh && (
                <RefreshButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRefresh();
                  }} 
                  $loading={loading} 
                  disabled={loading}
                  title="Refresh insights"
                >
                  <RotateCw size={16} />
                </RefreshButton>
              )}
              <CloseIconButton onClick={onClose} title="Close">
                <X size={18} />
              </CloseIconButton>
            </HeaderActions>

            {loading && !topic ? (
              <LoadingState>fetching insights...</LoadingState>
            ) : topic ? (
              <ScrollContainer>
                <ModalHeader>
                  <DialogTitle as="h2">{topic.displayName}</DialogTitle>
                  <MetaRow>
                    <Badge $status={topic.status}>{topic.status}</Badge>
                    <SourceTag $source={topic.source}>{topic.source}</SourceTag>
                  </MetaRow>
                </ModalHeader>

                {topic.posts && topic.posts.length > 0 && (
                  <Section>
                    <SectionHeader>Featured Discussions</SectionHeader>
                    <PostGrid>
                      {topic.posts.map((post: any) => (
                        <PostCard 
                          key={post.uri || post.id} 
                          href={getPostLink(post)} 
                          target="_blank"
                        >
                          <PostAuthor>
                            <Avatar sm src={post.author.avatar} />
                            <span>{post.author.displayName || post.author.handle}</span>
                          </PostAuthor>
                          <PostText>{post.record.text}</PostText>
                        </PostCard>
                      ))}
                    </PostGrid>
                  </Section>
                )}

                {topic.actors && topic.actors.length > 0 && (
                  <Section>
                    <SectionHeader>Key Voices</SectionHeader>
                    <ActorList>
                      {topic.actors.map((actor: any) => (
                        <ActorLink 
                          key={actor.did || actor.id} 
                          href={getProfileLink(actor)} 
                          target="_blank"
                        >
                          <Avatar src={actor.avatar} />
                          <ActorMeta>
                            <strong>{actor.displayName || actor.handle}</strong>
                            <span>@{actor.handle}</span>
                          </ActorMeta>
                          <ExternalLink size={12} strokeWidth={3} />
                        </ActorLink>
                      ))}
                    </ActorList>
                  </Section>
                )}
              </ScrollContainer>
            ) : null}
          </ModalContent>
        </DialogPanel>
      </ModalWrapper>
    </Dialog>
  );
};

/* --- ANIMATIONS --- */

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/* --- STYLES --- */

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 9999;
  pointer-events: none;
  & > * { pointer-events: auto; }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  width: 90vw;
  max-width: 500px;
  height: 75vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  animation: ${fadeInScale} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const HeaderActions = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 30;
`;

const RefreshButton = styled.button<{ $loading: boolean }>`
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #0085ff;
  }

  &:disabled { opacity: 0.6; cursor: not-allowed; }

  svg {
    animation: ${props => props.$loading ? spin : 'none'} 1s linear infinite;
  }
`;

const CloseIconButton = styled.button`
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  &:hover { background: #e2e8f0; color: #0f172a; }
`;

const StyledBackdrop = styled(DialogBackdrop)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9998;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
`;

const SourceTag = styled.span<{ $source?: string }>`
  font-size: 9px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 99px;
  text-transform: uppercase;
  background: ${props => props.$source === 'mastodon' ? '#6364ff20' : '#0085ff20'};
  color: ${props => props.$source === 'mastodon' ? '#6364ff' : '#0085ff'};
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const PostCard = styled.a`
  text-decoration: none;
  color: inherit;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  transition: all 0.2s;
  &:hover {
    background: white;
    border-color: #0085ff;
    transform: translateY(-2px);
  }
`;

const PostText = styled.p`
  font-size: 11px;
  line-height: 1.3;
  color: #475569;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActorLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  text-decoration: none;
  border-radius: 12px;
  color: inherit;
  &:hover { background: #f1f5f9; }
  svg { opacity: 0.2; color: #0085ff; }
  &:hover svg { opacity: 1; }
`;

const ScrollContainer = styled.div`
  padding: 24px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const SectionHeader = styled.h4`
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 12px;
  letter-spacing: 0.05em;
`;

const Avatar = styled.img<{ sm?: boolean }>`
  width: ${(props) => (props.sm ? "18px" : "40px")};
  height: ${(props) => (props.sm ? "18px" : "40px")};
  border-radius: 50%;
  background: #eee;
  object-fit: cover;
`;

const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  span {
    font-size: 10px;
    font-weight: 700;
    color: #1e293b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ActorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActorMeta = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  strong { font-size: 13px; }
  span { font-size: 11px; color: #64748b; }
`;

const Section = styled.div` margin-bottom: 24px; `;

const ModalHeader = styled.div`
  margin-bottom: 20px;
  h2 { font-size: 22px; font-weight: 900; margin: 0; }
`;

const Badge = styled.span<{ $status?: string }>`
  font-size: 9px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 99px;
  background: #f1f5f9;
  color: #64748b;
  text-transform: uppercase;
`;

const LoadingState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 13px;
`;