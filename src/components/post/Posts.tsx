import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { IPost as Post } from "@/types/post";
import { PostService } from "./PostService";
import { PostCard } from "./PostCard";
import { PostLive } from "./PostLive";
import { ErrorBoundary, TechnicalError } from "@components";

const PostsContent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      // Pass existing URIs so the service knows what to skip
      const currentUris = posts.map((p) => p.uri);
      const result = await PostService.list(15, currentUris);

      setPosts((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error(err);
      throw err; // Let ErrorBoundary handle it
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, posts]);

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Container>
      <Grid>
        {posts.map((post) => (
          <PostCard key={post.uri} post={post} />
        ))}
      </Grid>

      {hasMore && (
        <ActionArea>
          <LoadButton onClick={loadPosts} disabled={isLoading}>
            {isLoading ? "loading..." : "load more posts"}
          </LoadButton>
        </ActionArea>
      )}

      <PostLive setPosts={setPosts} />
    </Container>
  );
};

// Main Export with ErrorBoundary
export const Posts = () => {
  const [key, setKey] = useState(0);
  return (
    <ErrorBoundary
      key={key}
      fallback={
        <TechnicalError
          message="Could not load trending posts."
          onRetry={() => setKey((k) => k + 1)}
        />
      }
    >
      <PostsContent />
    </ErrorBoundary>
  );
};

/* --- Styles --- */
const Container = styled.div`
  width: 100%;
  padding: var(--spacing-md) 0;
  margin-bottom: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 0;
  background: var(--bg-white);
  border-top: 1px solid var(--border-subtle);
`;
const ActionArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 0;
`;
const LoadButton = styled.button`
  background: transparent;
  border: 1px solid var(--border-light);
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: var(--bg-soft);
  }
`;
