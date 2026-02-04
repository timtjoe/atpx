import styled from 'styled-components';

export const TrendingContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--orange);
  text-transform: lowercase;
  display: flex;
  align-items: center;
  gap: 6px;

  /* &::before {
    content: "📈";
    font-size: 12px;
  } */
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

export const TrendItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
  padding: 5px 0;
`;

export const Rank = styled.span`
  font-size: 11px;
  color: #ccc;
  font-weight: bold;
  margin-top: 2px;
`;

export const TrendInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const TrendLink = styled.a`
  text-decoration: none;
  color: var(--fb-blue); /* Blue for links */
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Tagline = styled.span`
  color: var(--hn-gray);
  font-size: 9px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Badge = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 8px;
  text-transform: uppercase;
  font-weight: bold;
`;