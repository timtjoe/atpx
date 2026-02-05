import React from "react";
import styled from "styled-components";

interface PostCardProps {
  post: any;
}

export const PostCard = ({ post }: PostCardProps) => {
  const author = post?.author || {};
  const text = (post?.record?.text || "").replace(/\s+/g, " ");

  return (
    <Card>
      <Header>
        <Avatar src={author.avatar} alt={author.displayName || author.handle} />
        <Author>
          <Name title={author.displayName}>{author.displayName}</Name>
          <Handle title={author.handle}>@{author.handle}</Handle>
        </Author>
      </Header>

      <Body title={text}>{text}</Body>

      <MetaRow>
        <MetaText>Post</MetaText>
      </MetaRow>
    </Card>
  );
};

export const ActorItem = ({ actor }: { actor: any }) => {
  return (
    <Actor>
      <AAvatar src={actor.avatar} alt={actor.displayName || actor.handle} />
      <AName title={actor.displayName || actor.handle}>
        {actor.displayName || actor.handle}
      </AName>
    </Actor>
  );
};

export default PostCard;

const Card = styled.div`
  width: 100%;
  height: 100px;
  padding: 8px;
  background: var(--bg-white);
  border-radius: var(--radius-xs);
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--text-dark);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: var(--round);
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.04);
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
`;

const Handle = styled.span`
  font-size: 11px;
  color: var(--text-gray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Body = styled.div`
  font-size: 12px;
  color: var(--text-dark);
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MetaText = styled.span`
  font-size: 11px;
  color: var(--text-gray);
`;

const Actor = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
`;

const AAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: var(--round);
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.04);
`;

const AName = styled.span`
  font-size: 11px;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
`;
