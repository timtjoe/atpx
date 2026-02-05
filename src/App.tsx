import styled from "styled-components";
import { Trending } from "@/components/trending";
import { People } from "@/components/People";
import { Communities } from "@/components/Communities";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import RootStyles from "@/components/root.styles";
import { Appbar } from "@/components/appbar";

export default function App() {
  return (
    <>
      <RootStyles />
      <Appbar />
      <Grid>
        <Pane>
          <IconBox></IconBox>
        </Pane>

        <CenterMain id="app">
          <Section>
            <People />
          </Section>
          <Section>
            <Communities />
          </Section>
        </CenterMain>

        <Sidebar>
          <Trending />
          <Footer />
        </Sidebar>
      </Grid>
    </>
  );
}

/* Styled components placed below the component definition */

const Grid = styled.div`
  width: 900px;
  margin: 0 auto;
  border: thin solid var(--text-gray);
  display: grid;
  grid-template-columns: 80px 500px 260px;
  align-items: start;
`;

const Pane = styled.aside`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const IconBox = styled.div`
  width: 54px;
  height: 54px;
  background: var(--text-gray);
  border-radius: var(--squicle);
`;

const CenterMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.section`
  margin-bottom: 0;
`;

const Sidebar = styled.aside`
  width: 280px;
  max-height: 98vh;
  overflow-y: auto;
  margin-left: 30px;
`;