import { FeedItem } from "./FeedItem";

interface MainFeedProps {
  items: any[];
  tab: string;
  loading: boolean;
  loadingMore: boolean;
}

export const MainFeed = ({ items, tab, loading, loadingMore }: MainFeedProps) => {
  // Initial load state
  if (loading && items.length === 0) {
    return <div className="hn-status" style={{ padding: '20px' }}>loading {tab}...</div>;
  }

  return (
    <div style={{ width: '100%' }}>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
        {items.map((item: any, i: number) => (
          <FeedItem key={item.uri + i} item={item} type={tab} />
        ))}
      </ul>
      
      {loadingMore && (
        <div className="hn-status" style={{ padding: '15px', fontSize: '12px', textAlign: 'center' }}>
          loading more...
        </div>
      )}
    </div>
  );
};