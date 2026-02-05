import styled from "styled-components";

export const SiteWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 120px);
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const ItemContainer = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  list-style: none;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: var(--squicle);
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MidSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.a`
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--text-blue);
  text-decoration: none;
  word-break: break-word;
  overflow-wrap: break-word;

  &:visited {
    color: var(--text-purple);
  }
`;

export const Meta = styled.div`
  font-size: var(--font-xs);
  color: var(--bg-gray);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--bg-gray);
  cursor: pointer;
  padding: var(--spacing-sm);
  font-size: 18px;
  border-radius: var(--round);
  width: 32px;
  height: 32px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
