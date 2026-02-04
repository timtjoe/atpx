import React, { useState, useEffect } from "react";
import * as C from "../styles/community.styles";
import { authenticate, fetchPopular } from "../api/api";

export const Communities = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);

  const fetchCommunitiesData = async (isMore = false) => {
    if (isMore) setLoadingMore(true);
    else setLoading(true);

    try {
      await authenticate();
      const result = await fetchPopular(isMore);
      setItems((prev) => (isMore ? [...prev, ...result.items] : result.items));
      setHasMore(!!result.cursor);
    } catch (e) {
      console.error("Communities fetch failed", e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCommunitiesData();
  }, []);

  if (loading && items.length === 0)
    return <div className="hn-status">loading communities...</div>;

  return (
    <C.CommunitiesWrapper>
      <C.SectionHeader>popular communities</C.SectionHeader>

      <C.Grid>
        {items.map((item, i) => {
          const profileUrl = item.creator
            ? `https://bsky.app/profile/${item.creator.handle}`
            : "#";
          const feedUrl = item.uri?.startsWith("at://")
            ? `https://bsky.app/profile/${item.uri.split("/")[2]}/feed/${item.uri.split("/").pop()}`
            : `https://bsky.app/search?q=${encodeURIComponent(item.displayName)}`;

          return (
            <C.Card key={item.uri + i}>
              {/* Performant Image check */}
              {item.avatar ? (
                <C.CardImage src={item.avatar} alt="" loading="lazy" />
              ) : (
                <C.PlaceholderBox>
                  {item.displayName?.charAt(0).toUpperCase() || "C"}
                </C.PlaceholderBox>
              )}

              <C.OptionsButton onClick={() => setShowModal(item.uri)}>
                ⋮
              </C.OptionsButton>

              <C.CardContent>
                <C.Title
                  href={feedUrl}
                  target="_blank"
                  title={item.displayName}
                >
                  {item.displayName}
                </C.Title>

                <C.MetaRow>
                  <C.CreatorLink href={profileUrl} target="_blank">
                    {item.creator?.handle
                      ? `@${item.creator.handle.split(".")[0]}`
                      : "anon"}
                  </C.CreatorLink>
                  <C.ActiveCount>
                    {item.likeCount?.toLocaleString()} active
                  </C.ActiveCount>
                </C.MetaRow>
              </C.CardContent>

              {/* Modal Logic */}
              {showModal === item.uri && (
                <C.ModalBackdrop open>
                  <C.ModalTitle>{item.displayName}</C.ModalTitle>
                  <C.ModalBody>
                    {item.description || "No description available."}
                  </C.ModalBody>
                  <C.ModalCloseBtn onClick={() => setShowModal(null)}>
                    Close
                  </C.ModalCloseBtn>
                </C.ModalBackdrop>
              )}
            </C.Card>
          );
        })}
      </C.Grid>

      {hasMore && (
        <C.LoadMoreContainer>
          <C.LoadMoreButton
            disabled={loadingMore}
            onClick={() => fetchCommunitiesData(true)}
          >
            {loadingMore ? "loading..." : "more communities ▼"}
          </C.LoadMoreButton>
        </C.LoadMoreContainer>
      )}
    </C.CommunitiesWrapper>
  );
};
