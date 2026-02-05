import { Trending } from "@/components/Trending";
import { People } from "@/components/People"; // New import
import { Communities } from "@/components/Communities";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteWrapper } from "@/components/styles.comp";
import RootStyles from "@/components/root.styles";
import { Appbar } from "@/components/Appbar";

export default function App() {
  return (
    <>
      <RootStyles />
      <Appbar />
      <SiteWrapper>
        <ErrorBoundary>
          <main id="app">
            <Trending />
            <People />
            <Communities />
          </main>
        </ErrorBoundary>
      </SiteWrapper>
      <Footer />
    </>
  );
}
