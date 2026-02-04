import '@/style.css';
import { authenticate, fetchPopular, fetchTrending } from '@/api';
import { render } from '@/ui';

const root = document.querySelector<HTMLElement>('#app')!;
const tabs = document.querySelectorAll('.nav-tab');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.className = 'hn-more-arrow';
loadMoreBtn.innerHTML = '&#9660;';

let currentTab = 'popular';

async function loadData(append = false) {
  try {
    const data = currentTab === 'popular' ? await fetchPopular(append) : await fetchTrending();
    render(root, data, append);
    
    // Only show Load More for Popular (Trending is a static snapshot)
    if (currentTab === 'popular') {
      root.appendChild(loadMoreBtn);
    } else if (loadMoreBtn.parentElement) {
      loadMoreBtn.remove();
    }
  } catch (err) {
    root.innerHTML = `<div class="hn-status">error: ${err}</div>`;
  }
}

tabs.forEach(tab => {
  tab.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    tabs.forEach(t => t.classList.remove('active'));
    target.classList.add('active');
    currentTab = target.dataset.tab!;
    root.innerHTML = '<div class="hn-status">loading...</div>';
    await loadData();
  });
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.disabled = true;
  await loadData(true);
  loadMoreBtn.disabled = false;
});

(async () => {
  root.innerHTML = '<div class="hn-status">authenticating...</div>';
  await authenticate();
  await loadData();
})();