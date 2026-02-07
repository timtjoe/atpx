import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ITrendCard, Actor } from "@types";
import { TrendLive } from "./TrendLive";

export const TrendCard = ({
  topic,
  rank,
  onClick,
}: ITrendCard): React.JSX.Element => {
  const actors: Actor[] = topic?.actors || [];
  const [liveCount, setLiveCount] = useState<number>(topic.postCount);
  const prevCountRef = useRef(topic.postCount);

  useEffect(() => {
    if (!topic?.topic) return;
    const unsub = TrendLive.subscribe(
      topic.topic,
      (_: string, count?: number) => {
        if (typeof count === "number") {
          prevCountRef.current = liveCount;
          setLiveCount(count);
        }
      },
    );
    return () => unsub();
  }, [topic?.topic, liveCount]);

  const goingUp = liveCount >= prevCountRef.current;

  const displayCount =
    liveCount < 1000
      ? liveCount.toString()
      : new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 1,
        })
          .format(liveCount)
          .toLowerCase();

  const getLabel = () => {
    if (topic.status) return topic.status;
    if (topic.postCount > 5000) return "Viral";
    if (topic.source === "mastodon") return "Fediverse";
    return "Breaking";
  };

  const label = getLabel();

  return (
    <Card onClick={onClick}>
      <Header>
        <Rank>{rank}</Rank>
        <Title>{topic.displayName}</Title>
      </Header>

      <Content>
        <Info>
          <Meta>
            <Badge $type={label.toLowerCase()}>{label}</Badge>

            <CountLabel>
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={goingUp}
              >
                <motion.span
                  key={displayCount}
                  initial={{ y: goingUp ? 12 : -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: goingUp ? -12 : 12, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {displayCount}
                </motion.span>
              </AnimatePresence>
              <PostLabel>posts</PostLabel>
            </CountLabel>
          </Meta>

          {actors.length > 0 && (
            <ActorRow>
              <AvatarStack>
                {actors.slice(0, 4).map((a, idx) => (
                  <Avatar
                    key={a.id ?? idx}
                    src={a.avatar}
                    $offset={idx * 10}
                    $zIndex={idx + 1}
                  />
                ))}
              </AvatarStack>
            </ActorRow>
          )}
        </Info>
      </Content>
    </Card>
  );
};

/* --- Styled Components --- */
const Badge = styled.span<{ $type: string }>`
  font-size: 7px;
  padding: 1px 4px;
  border-radius: 2px;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  background: ${({ $type }) => {
    if ($type === "hot" || $type === "viral") return "var(--text-orange)";
    if ($type === "breaking") return "var(--text-red)";
    if ($type === "fediverse") return "var(--text-purple)";
    return "var(--text-blue)";
  }};
`;

const CountLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-sm);
  color: var(--text-muted);
  height: 1.2em;
  overflow: hidden;
  position: relative;
`;

const PostLabel = styled.span`
  font-weight: 400;
  opacity: 0.8;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  cursor: pointer;
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
`;

const Title = styled.span`
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--text-bold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;
const ActorRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;
const AvatarStack = styled.div`
  position: relative;
  height: 16px;
  width: 50px;
`;
const Avatar = styled.img<{ $offset: number; $zIndex: number }>`
  position: absolute;
  left: ${({ $offset }) => $offset}px;
  z-index: ${({ $zIndex }) => $zIndex};
  width: 16px;
  height: 16px;
  border-radius: var(--round);
  border: thin solid var(--border-subtle);
`;
