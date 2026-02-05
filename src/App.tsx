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
      <Grid>
        <Pane>
          {/* <IconBox></IconBox> */}
        </Pane>

        <CenterMain id="app">
          <Section>
            <People />
          </Section>
          <Section>
            <Communities />
          </Section>
          <Section>
            <Posts />
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  /* border: thin solid var(--text-gray); */
  display: grid;
  grid-template-columns: 80px 1fr 280px;
  gap: 0;
  align-items: start;
  min-height: 100vh;

  /* Tablet: Adjust sizing */
  @media (max-width: 1024px) {
    grid-template-columns: 70px 1fr 260px;
    border-right: none;
  }

  /* Mobile: Stack vertically with Discord-style sidebar */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 0;
  }
`;

const Pane = styled.aside`
  width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 8px;
  /* border-right: thin solid var(--text-gray); */
  background: #fff;

  @media (max-width: 1024px) {
    width: 70px;
    padding: 12px 6px;
  }

  /* Mobile: Discord-style horizontal sidebar */
  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: thin solid var(--text-gray);
    padding: 10px;
    gap: 12px;
    overflow-x: auto;
    background: #fafafa;

    /* Hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const IconBox = styled.div`
  width: 54px;
  height: 54px;
  background: var(--text-gray);
  border-radius: var(--squicle);
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

const CenterMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px;
  overflow-y: auto;

  @media (max-width: 1024px) {
    padding: 14px 16px;
    gap: 14px;
  }

  @media (max-width: 768px) {
    grid-column: 1;
    padding: 12px;
    gap: 12px;
  }
`;

const Section = styled.section`
  margin-bottom: 0;
`;

const Sidebar = styled.aside`
  width: 280px;
  max-height: 98vh;
  overflow-y: auto;
  padding: 16px 12px;
  /* border-left: thin solid var(--text-gray); */
  background: #fafafa;
  position: sticky;
  top: 0;

  @media (max-width: 1024px) {
    width: 260px;
    padding: 12px 10px;
  }

  /* Mobile: Move sidebar to bottom in main flow */
  @media (max-width: 768px) {
    grid-column: 1;
    width: 100%;
    max-height: none;
    overflow-y: visible;
    padding: 14px;
    border-left: none;
    border-top: thin solid var(--text-gray);
    background: #fff;
    position: static;
  }
`;
