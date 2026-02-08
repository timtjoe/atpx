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
      <SectionHeader>trending posts</SectionHeader>

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
  padding: 0 16px;
  margin-bottom: 50px;
`;
const SectionHeader = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: #ff6600;
  text-transform: uppercase;
  margin-bottom: 20px;
  letter-spacing: 0.1em;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1px;
  background: var(--border-light);
  border-top: 1px solid var(--border-light);
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
