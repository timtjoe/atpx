import React, { useState, useEffect } from "react";
import * as T from "../styles/trending.styles";
import { authenticate, fetchTrending } from "../api/api";

export const Trending = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingData = async () => {
    try {
      await authenticate();
      const result = await fetchTrending();
      setTopics(result.items.slice(0, 10));
    } catch (e) {
      console.error("Trends fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  if (loading || topics.length === 0) {
    return (
      <T.TrendingContainer>
        <T.SectionTitle>loading trends...</T.SectionTitle>
      </T.TrendingContainer>
    );
  }

  return (
    <T.TrendingContainer>
      <T.SectionTitle>trending topics</T.SectionTitle>
      <T.Grid>
        {topics.map((topic, i) => (
          <T.TrendItem key={topic.uri || i}>
            <T.Rank>{i + 1}</T.Rank>
            <T.TrendInfo>
              <T.TrendLink
                href={`https://bsky.app/search?q=${encodeURIComponent(topic.displayName)}`}
                target="_blank"
              >
                {topic.displayName}
              </T.TrendLink>
              <T.Tagline>
                <T.Badge>Popular</T.Badge>
                {topic.likeCount?.toLocaleString()} posts today
              </T.Tagline>
            </T.TrendInfo>
          </T.TrendItem>
        ))}
      </T.Grid>
    </T.TrendingContainer>
  );
};
