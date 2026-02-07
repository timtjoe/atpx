import styled from "styled-components";
import { Trending } from "@components/trending";
import { Community as Communities } from "@components/community";
import { Posts } from "@components/post";
import { Footer } from "@components/Footer";
import RootStyles from "@components/root.styles";
import { People } from "@components/people";
import Logo from "@components/pane/Logo";
import { Toaster } from "react-hot-toast";
import { ConnectivityManager } from "./components/headless/Connectivity";

export default function App() {
  return (
    <>
      <ConnectivityManager />
      <RootStyles />
      <Body>
        <Pane>
          <Logo />
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
      <Toaster position="bottom-left" />
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
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: right;
  width: 200px;
  height: 99.7vh;
  align-items: flex-end; /* Aligns children to the right */
  padding-top: var(--spacing-md);
  border-right: thin solid var(--border-subtle);
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
  align-items: unset;
  border: unset;
  border-left: thin solid var(--border-subtle);
`;
