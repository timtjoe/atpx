import styled from "styled-components";

export const Icon = styled.svg`
  color: var(--text-muted);
`;

/* --- Sub-component: Appealing Mid-Dot --- */
export const Dot = styled.span`
  display: inline-block;
  width: 2.5px;
  height: 2.5px;
  border-radius: 50%;
  background-color: var(--text-grey);
  opacity: 0.4;
  flex-shrink: 0;
`;

export const Clamp = styled.p`
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
