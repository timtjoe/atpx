import { Header } from "./components/Header";
import { Trending } from "./components/Trending";
import { People } from "./components/People"; // New import
import { Communities } from "./components/Communities";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SiteWrapper } from "./styles/styles";

export default function App() {
  return (
    <>
      {/* Header takes full width, its internal div centers the logo */}
      <Header />

      <SiteWrapper>
        <ErrorBoundary>
          <main id="app">
            <Trending />
            <People />
            <Communities />
          </main>
        </ErrorBoundary>
      </SiteWrapper>

      {/* Footer takes full width, style it similar to Header */}
      <Footer />
    </>
  );
}
