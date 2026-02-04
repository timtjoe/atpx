import '@/style.css';
import { authenticate, fetchEntries } from '@/api';
import { render } from '@/ui';

const root = document.querySelector<HTMLElement>('#app')!;

async function init() {
  root.innerHTML = '<div class="status">Loading...</div>';
  
  try {
    await authenticate();
    const data = await fetchEntries();
    render(root, data);
  } catch (err) {
    root.innerHTML = `<div class="status error">Update failed: ${err}</div>`;
  }
}

init();