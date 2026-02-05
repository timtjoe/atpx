import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TrendLive } from "./TrendLive";

interface Actor {
  id?: string | number;
  name?: string;
  avatar?: string;
}

interface TrendCardProps {
  topic: any;
  rank: number;
  onClick: () => void;
}

export const TrendCard = ({ topic, rank, onClick }: TrendCardProps) => {
  const actors: Actor[] = topic?.actors || [];
  const reactions: string[] = topic?.reactions || [];
  const [liveCount, setLiveCount] = useState<number | undefined>(
    topic?.postCount,
  );
  const [animatedCount, setAnimatedCount] = useState<number | undefined>(
    topic?.postCount,
  );

  useEffect(() => {
    if (!topic?.topic) return;
    let mounted = true;
    const cb = (_topic: string, count?: number) => {
      if (!mounted) return;
      if (typeof count === "number") setLiveCount(count);
    };
    const unsub = TrendLive.subscribe(topic.topic, cb);
    return () => {
      mounted = false;
      unsub();
    };
  }, [topic?.topic]);

  // animate number changes
  useEffect(() => {
    if (typeof liveCount !== "number") return;
    let start = performance.now();
    const from =
      typeof animatedCount === "number"
        ? animatedCount
        : (topic?.postCount ?? 0);
    const to = liveCount;
    if (from === to) {
      setAnimatedCount(to);
      return;
    }
    const duration = 600;
    let raf = 0;
    const step = (ts: number) => {
      const t = Math.min(1, (ts - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
      const val = Math.round(from + (to - from) * eased);
      setAnimatedCount(val);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [liveCount]);

  return (
    <CardItem onClick={onClick}>
      <CardHeader>
        <Rank>{rank}</Rank>
        <TrendTitle>{topic.displayName}</TrendTitle>
      </CardHeader>

      <CardContent>
        <TrendInfo>
          <Meta>
            <Badge $status={topic.status}>{topic.status}</Badge>
            <PostCount>
              {(typeof animatedCount === "number"
                ? animatedCount
                : (liveCount ?? topic.postCount)
              ).toLocaleString()}{" "}
              posts
            </PostCount>
          </Meta>

          {actors.length > 0 && (
            <ActorRow>
              <AvatarStack>
                {actors.map((a, idx) => (
                  <Avatar
                    key={a.id ?? idx}
                    src={a.avatar}
                    alt={a.name || "actor"}
                    style={{ left: `${idx * 10}px`, zIndex: idx + 1 }}
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
        </TrendInfo>
      </CardContent>
    </CardItem>
  );
};

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-xs);
  transition: background 0.2s;
  &:hover {
    background: #fafafa;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const Rank = styled.span`
  font-size: 10px;
  color: var(--bg-gray);
  font-weight: 700;
  min-width: 12px;
`;

const TrendTitle = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--text-blue);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const TrendInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const Meta = styled.div`
  font-size: 8px;
  color: var(--bg-gray);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const PostCount = styled.span`
  color: var(--bg-gray);
  font-size: 8px;
`;

const Badge = styled.span<{ $status?: string }>`
  font-size: 7px;
  padding: 1px 3px;
  border-radius: 2px;
  background: ${(props) =>
    props.$status === "hot" ? "var(--text-orange)" : "var(--text-blue)"};
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

const Avatar = styled.img`
  position: absolute;
  top: 0;
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
