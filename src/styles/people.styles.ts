import styled from 'styled-components';

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
  border: 1px solid rgba(0,0,0,0.05);
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
  border: 1px solid rgba(0,0,0,0.05);
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