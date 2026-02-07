import React from "react";
import styled from "styled-components";

/**
 * A subtle, vertically-centered separator dot.
 */
export const Middot = (): React.JSX.Element => {
  return (
    <Dot aria-hidden="true">
      &middot;
    </Dot>
  );
};

const Dot = styled.span`
  display: inline-block;
  color: var(--text-muted);
  font-weight: 800;
  padding: 0 ;
  user-select: none;
  pointer-events: none;
  /* Centers the dot on the 'x-height' of the surrounding text */
  vertical-align: middle;
  line-height: 1;
  
  white-space: nowrap;
`;