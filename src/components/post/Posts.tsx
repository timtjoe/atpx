import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { IPost as Post } from "@/types/post";
import { PostService } from "./PostService";
import { PostCard } from "./PostCard";
import { PostLive } from "./PostLive";
import { Postleton } from "./Postleton"; // Import our new skeleton
import { ErrorBoundary, TechnicalError } from "@components";

const PostsContent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = useCallback(async (isInitial = false) => {
    if (isLoadingMore) return;
    isInitial ? setInitialLoading(true) : setIsLoadingMore(true);
    
    try {
      const currentUris = isInitial ? [] : posts.map((p) => p.uri);
      const result = await PostService.list(15, currentUris);

      setPosts((prev) => isInitial ? result.items : [...prev, ...result.items]);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error(err);
      if (isInitial) throw err; // Let ErrorBoundary handle initial load fail
    } finally {
      setInitialLoading(false);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, posts]);

  useEffect(() => {
    loadPosts(true);
  }, []);

  // Show skeleton only on the very first load
  if (initialLoading) return <Postleton />;

  return (
    <Container>
      <Grid>
        {posts.map((post, idx) => (
          <PostItem key={post.uri} $idx={idx}>
            <PostCard post={post} />
          </PostItem>
        ))}
      </Grid>

      {hasMore && (
        <ActionArea>
          <LoadButton onClick={() => loadPosts(false)} disabled={isLoadingMore}>
            {isLoadingMore ? "loading..." : "load more posts"}
          </LoadButton>
        </ActionArea>
      )}

      <PostLive setPosts={setPosts} />
    </Container>
  );
};

export const Posts = () => (
  <ErrorBoundary fallback={<TechnicalError message="Could not load trending posts." />}>
    <PostsContent />
  </ErrorBoundary>
);

/* --- Styles & Animations --- */

const entry = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 0;
  background: var(--bg-white);
  & > * + * {
    border-top: thin solid var(--border-subtle);
  }
`;

const PostItem = styled.div<{ $idx: number }>`
  opacity: 0;
  animation: ${entry} 0.2s ease-out forwards;
  ${({ $idx }) => css`
    /* Stagger resets every 15 items for paging */
    animation-delay: ${($idx % 15) * 0.04}s;
  `}
`;

const ActionArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 0;
`;

const LoadButton = styled.button`
  background: transparent;
  border: 1px solid var(--border-light);
  padding: 8px 24px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: capitalize;

  &:hover:not(:disabled) {
    background: var(--bg-soft);
    border-color: var(--border-subtle);
  }

  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`;