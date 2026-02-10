import styled from "styled-components";

export const Dot = styled.span`
  display: inline-block;
  width: 2.5px;
  height: 2.5px;
  border-radius: 50%;
  background-color: var(--text-grey);
`;

export const Clamp = styled.p`
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* --- Reusable Components --- */

export const Chip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: var(--bg-soft);
  border-radius: var(--radius-md);
  border: thin solid var(--border-subtle);
  font-size: var(--font-sm);
  font-weight: 600;
  min-width: 98px;
  color: var(--text-bold);
`;
