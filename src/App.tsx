import styled from "styled-components";
import { Trending } from "@components/trending";
import { Community as Communities } from "@components/community";
import { Posts } from "@components/post";
import { Footer } from "@components/Footer";
import RootStyles from "@components/root.styles";
import { Appbar } from "@components/appbar";
import { People } from "@components/people";

export default function App() {
  return (
    <>
      <RootStyles />
      <Body>
        <Pane>
          <Appbar />
        </Pane>
        <Main id="app">
          <Navigation>navigation</Navigation>
          <Trending />
          <People />
          <Communities />
          <Posts />
        </Main>
        <Sidebar>
          <Footer />
        </Sidebar>
      </Body>
    </>
  );
}

/* Styled components  */
const Body = styled.div`
  position: relative;
  max-width: var(--width-lg);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Pane = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 99.7vh;
  position: sticky;
  top: 0;
  border: solid red;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

const Navigation = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 55px;
  background-color: var(--bg-white);
  margin-bottom: var(--spacing-md);
`;

const Sidebar = styled(Pane)`
  width: 400px;
`;