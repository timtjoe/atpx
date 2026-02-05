import { Logo } from "./Logo";
import styled from "styled-components";

// Header component
export const Appbar = () => (
  <Container>
    <Content>
      <Logo />
    </Content>
  </Container>
);

// Styled components for Header
const Container = styled.header`
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: var(--width-sm);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
