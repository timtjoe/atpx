import styled from "styled-components";
import { Trending } from "@/components/trending";
import { Communities } from "@/components/community";
import { Posts } from "@/components/post";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import RootStyles from "@/components/root.styles";
import { Appbar } from "@/components/appbar";
import { People } from "@/components/people";

export default function App() {
  return (
    <>
      <RootStyles />
      <Appbar />
      <Container>
        <Main id="app">
          <Trending />
          <People />
          <Communities />
          <Posts />
        </Main>
      </Container>
      <Footer />
    </>
  );
}

/* Styled components  */
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  margin-top: var(--spacing-md);
  
  @media (max-width: 768px) {
    margin-top:unset;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;
