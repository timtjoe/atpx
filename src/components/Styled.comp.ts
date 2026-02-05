import styled from 'styled-components';

export const SiteWrapper = styled.div`
  width: var(--iphone-width);
  max-width: 100%; 
  min-height: calc(100vh - 120px); /* Adjust based on header/footer height */
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0 auto; /* Centers the wrapper horizontally */
`;

export const ItemContainer = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  list-style: none;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 20px/20px;
  object-fit: cover;
  border: 1px solid rgba(0,0,0,0.1);
`;

export const MidSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0; 
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: var(--fb-blue);
  text-decoration: none;
  
  word-break: break-word;
  overflow-wrap: break-word;

  &:visited { color: var(--visited-purple); }
`;

export const Meta = styled.div`
  font-size: 11px;
  color: var(--hn-gray);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--hn-gray);
  cursor: pointer;
  padding: 8px;
  font-size: 18px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  &:hover { background: rgba(0,0,0,0.05); }
`;
