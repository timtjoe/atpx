import React from "react";
import styled from "styled-components";

interface INavigation {
  title: string;
  children?: React.ReactNode;
}

export const Navigation = ({
  title,
  children,
}: INavigation): React.JSX.Element => {
  return (
    <Container>
      {title}
      {/* ... */}
    </Container>
  );
};

const Container = styled.nav`
  border: solid red;
`

export default Navigation