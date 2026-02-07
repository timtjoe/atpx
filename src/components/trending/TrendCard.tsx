import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ITrendCard, Actor } from "@types";
import { TrendLive } from "./TrendLive";

export const TrendCard = ({
  topic,
  rank,
  onClick,
}: ITrendCard): React.JSX.Element => {
  const actors: Actor[] = topic?.actors || [];
  const reactions: string[] = topic?.reactions || [];

  const [liveCount, setLiveCount] = useState<number>(topic.postCount);
  const [animatedCount, setAnimatedCount] = useState<number>(topic.postCount);

  // Live subscription logic
  useEffect(() => {
    if (!topic?.topic) return;

    const cb = (_: string, count?: number) => {
      if (typeof count === "number") setLiveCount(count);
    };

    const unsub = TrendLive.subscribe(topic.topic, cb);
    return () => unsub();
  }, [topic?.topic]);

  // Number animation logic (Raf)
  useEffect(() => {
    const from = animatedCount;
    const to = liveCount;
    if (from === to) return;

    const duration = 600;
    const startTime = performance.now();
    let rafId: number;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // easeInOutQuad
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      const currentVal = Math.round(from + (to - from) * eased);
      setAnimatedCount(currentVal);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [liveCount]);

  const displayCount = animatedCount.toLocaleString();

  return (
    <Card onClick={onClick}>
      <Header>
        <Rank>{rank}</Rank>
        <Title>{topic.displayName}</Title>
      </Header>

      <Content>
        <Info>
          <Meta>
            {topic.status && (
              <Badge $status={topic.status}>{topic.status}</Badge>
            )}
            <PostCount>{displayCount} posts</PostCount>
          </Meta>

          {actors.length > 0 && (
            <ActorRow>
              <AvatarStack>
                {actors.map((a, idx) => (
                  <Avatar
                    key={a.id ?? idx}
                    src={a.avatar}
                    alt={a.name || "actor"}
                    $offset={idx * 10}
                    $zIndex={idx + 1}
                  />
                ))}
              </AvatarStack>

              {reactions.length > 0 && (
                <ReactionGroup>
                  {reactions.slice(0, 3).map((r, i) => (
                    <Reaction key={i}>{r}</Reaction>
                  ))}
                  <ReactionCount>
                    +{" "}
                    {Math.max(0, (topic.reactionCount || 0) - reactions.length)}
                  </ReactionCount>
                </ReactionGroup>
              )}
            </ActorRow>
          )}
        </Info>
      </Content>
    </Card>
  );
};

/* --- Styled Components --- */

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  cursor: pointer;
  padding: 0;
  border-radius: var(--radius-xs);
  height: 58px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const Rank = styled.span`
  font-size: var(--font-xs);
  color: var(--text-muted);
  font-weight: 700;
  min-width: 12px;
`;

const Title = styled.span`
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--text-bold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const PostCount = styled.span`
  color: var(--text-muted);
  font-size: var(--font-sm);
`;

const Badge = styled.span<{ $status?: string }>`
  font-size: 7px;
  padding: 1px 3px;
  border-radius: 2px;
  background: ${({ $status }) =>
    $status === "hot" ? "var(--text-orange)" : "var(--text-blue)"};
  color: white;
  text-transform: uppercase;
  font-weight: 700;
`;

const ActorRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--spacing-xs);
  gap: var(--spacing-xs);
`;

const AvatarStack = styled.div`
  position: relative;
  height: 16px;
  width: 50px;
  z-index: 1;
`;

const Avatar = styled.img<{ $offset: number; $zIndex: number }>`
  position: absolute;
  top: 0;
  left: ${({ $offset }) => $offset}px;
  z-index: ${({ $zIndex }) => $zIndex};
  width: 16px;
  height: 16px;
  border-radius: var(--round);
  border: 1px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  object-fit: cover;
`;

const ReactionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`;

const Reaction = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: var(--round);
  background: #fff;
  font-size: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
`;

const ReactionCount = styled.span`
  font-size: 7px;
  color: var(--bg-gray);
`;
