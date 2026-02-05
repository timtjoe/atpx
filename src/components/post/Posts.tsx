import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { PostService } from "./PostService";
import { PostCard } from "./PostCard";
import { PostLive } from "./PostLive";

export const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    const loadInitial = async () => {
      try {
        setIsLoading(true);
        const result = await PostService.list(30);
        setPosts(result.items);
        setHasMore((result.items?.length || 0) > 0);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitial();
  }, []);

  // Load more posts when scrolling to bottom
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const result = await PostService.list(20);
      const newPosts = result.items || [];

      // Filter out duplicates
      const existingUris = new Set(posts.map((p) => p.uri));
      const uniquePosts = newPosts.filter((p) => !existingUris.has(p.uri));

      if (uniquePosts.length > 0) {
        setPosts((prev) => [...prev, ...uniquePosts]);
      }

      setHasMore(uniquePosts.length > 0);
    } catch (err) {
      console.error("Failed to load more posts:", err);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [posts, isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, hasMore, isLoading]);

  return (
    <PostsWrapper>
      <SectionHeader>trending posts</SectionHeader>

      <PostsGrid>
        {posts.map((post, idx) => (
          <motion.div
            key={`${post.uri}-${post.cid || idx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.02 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </PostsGrid>

      <LoadingTarget ref={observerTarget}>
        {isLoading && <LoadingSpinner>loading more posts...</LoadingSpinner>}
      </LoadingTarget>

      <PostLive posts={posts} setPosts={setPosts} />
    </PostsWrapper>
  );
};

export const PostsWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
`;

export const SectionHeader = styled.div`
  padding: 10px 0;
  font-weight: bold;
  font-size: 13px;
  color: #ff6600;
  text-transform: lowercase;
`;

export const PostsGrid = styled.div`
  /* Modern CSS Grid Masonry Layout with Subgrid */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
  width: 100%;
  animation: fadeIn 0.3s ease;
  align-items: start;

  /* CSS Grid Auto Rows for masonry effect */
  grid-auto-rows: auto;

  /* Fallback for older browsers: CSS Columns */
  @supports not (grid-template-columns: subgrid) {
    column-count: 3;
    column-gap: 14px;
    break-inside: avoid;

    @media (max-width: 1024px) {
      column-count: 2;
    }

    @media (max-width: 640px) {
      column-count: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Tablet: 2 columns */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  /* Mobile: 1 column */
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const LoadingTarget = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
  font-size: 12px;
  color: #999;
  font-style: italic;
`;
