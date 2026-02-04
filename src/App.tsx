import { useEffect, useState } from 'react';
import { authenticate, fetchPopular, fetchTrending } from './api';
import { Header } from './components/Header';
import { MainFeed } from './components/MainFeed';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SiteWrapper } from './styles'; 

export default function App() {
  const [tab, setTab] = useState<'popular' | 'trending'>('popular');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const loadData = async (isMore = false) => {
    if (isMore) setLoadingMore(true);
    else setLoading(true);

    try {
      await authenticate();
      const result = tab === 'popular' 
        ? await fetchPopular(isMore) 
        : await fetchTrending();

      // Standard state updates are much faster and simpler
      setItems(prev => isMore ? [...prev, ...result.items] : result.items);
      setHasMore(!!result.cursor);
    } catch (e) {
      console.error("Fetch failed", e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleTabChange = (newTab: 'popular' | 'trending') => {
    if (newTab === tab) return;
    
    // Instant tab switching
    setTab(newTab);
    setItems([]); 
  };

  useEffect(() => {
    loadData();
  }, [tab]);

  return (
    <ErrorBoundary>
      <SiteWrapper>
        <Header currentTab={tab} onTabChange={handleTabChange} />
        
        <main id="app">
          <MainFeed 
            items={items} 
            tab={tab} 
            loading={loading} 
            loadingMore={loadingMore} 
          />
          
          {tab === 'popular' && hasMore && !loading && !loadingMore && (
            <div className="hn-more-container">
              <button className="hn-more-arrow" onClick={() => loadData(true)}>
                ▼
              </button>
            </div>
          )}
        </main>

        <Footer />
      </SiteWrapper>
    </ErrorBoundary>
  );
}