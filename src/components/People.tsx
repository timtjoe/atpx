import { useState, useEffect } from "react";
import { authenticate, fetchPeople } from "../utils/api";
import styled from "styled-components";

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
    <PeopleSection>
      <SectionTitle>popular creators</SectionTitle>
      <Grid>
        {people.slice(0, visibleCount).map((person) => (
          <PersonCard
            key={person.uri}
            href={`https://bsky.app/profile/${person.handle}`}
            target="_blank"
          >
            <Avatar
              src={person.avatar || "https://via.placeholder.com/50"}
              alt={person.displayName}
            />
            <Name>{person.displayName || person.handle}</Name>
            {/* Displaying blue handle, cleaning up .bsky.social if present for space */}
            <Handle>@{person.handle.replace(".bsky.social", "")}</Handle>
          </PersonCard>
        ))}
      </Grid>

      {visibleCount < people.length && (
        <MoreButton onClick={() => setVisibleCount((prev) => prev + 8)}>
          more creators ▼
        </MoreButton>
      )}
    </PeopleSection>
  );
};

export const PeopleSection = styled.section`
  padding: 15px;
  background-color: var(--hn-bg);
  border-bottom: 1px solid #ddd;
`;

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: bold;
  margin: 0 0 12px 0;
  color: #ff6600;
  text-transform: lowercase;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const PersonCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  text-align: center;
  min-width: 0;
  padding: 10px 4px; /* Internal spacing for the background */
  background: #fff; /* White background for the card */
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    border-color: #ddd;
  }
`;

export const Avatar = styled.img`
  width: 44px; /* Slightly adjusted to fit padding */
  height: 44px;
  border-radius: 8px;
  background-color: #eee;
  object-fit: cover;
  margin-bottom: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const Name = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #000;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-bottom: 2px;
`;

export const Handle = styled.span`
  font-size: 8px; /* Shrunk slightly to fit within 4 columns */
  color: var(--fb-blue); /* Handle is now blue */
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-weight: 500;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: var(--hn-gray);
  font-size: 11px;
  margin-top: 15px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    text-decoration: underline;
    color: #ff6600;
  }
`;
