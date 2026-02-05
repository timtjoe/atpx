import React, { useState, useEffect } from "react";
import * as P from "../styles/people.styles";
import { authenticate, fetchPeople } from "../api/api";

export const People = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  const fetchPeopleData = async () => {
    try {
      await authenticate();
      const result = await fetchPeople();
      setPeople(result.items || []);
    } catch (e) {
      console.error("People fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeopleData();
  }, []);

  if (loading || people.length === 0) return null;

  return (
    <P.PeopleSection>
      <P.SectionTitle>popular creators</P.SectionTitle>
      <P.Grid>
        {people.slice(0, visibleCount).map((person) => (
          <P.PersonCard
            key={person.uri}
            href={`https://bsky.app/profile/${person.handle}`}
            target="_blank"
          >
            <P.Avatar
              src={person.avatar || "https://via.placeholder.com/50"}
              alt={person.displayName}
            />
            <P.Name>{person.displayName || person.handle}</P.Name>
            {/* Displaying blue handle, cleaning up .bsky.social if present for space */}
            <P.Handle>@{person.handle.replace(".bsky.social", "")}</P.Handle>
          </P.PersonCard>
        ))}
      </P.Grid>

      {visibleCount < people.length && (
        <P.MoreButton onClick={() => setVisibleCount((prev) => prev + 8)}>
          more creators ▼
        </P.MoreButton>
      )}
    </P.PeopleSection>
  );
};
