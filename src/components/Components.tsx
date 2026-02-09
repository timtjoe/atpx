import styled from "styled-components";

export const Icon = styled.svg`
  color: var(--text-muted);
`;

/* --- Sub-component: Appealing Mid-Dot --- */
export const Dot = styled.span`
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--text-muted);
  opacity: 0.4;
  flex-shrink: 0;
`;
