function cleanText(text: string): string {
  if (!text) return '';
  return text.replace(/[\p{Extended_Pictographic}\p{S}]/gu, '').trim();
}

export function render(container: HTMLElement, items: any[]) {
  container.innerHTML = '';
  const list = document.createElement('ol');
  list.className = 'hn-list';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'hn-item';

    const parts = item.uri.replace('at://', '').split('/');
    const url = `https://bsky.app/profile/${parts[0]}/feed/${parts[parts.length - 1]}`;

    const title = cleanText(item.displayName);
    const handle = item.creator.handle;
    const likes = item.likeCount?.toLocaleString() || '0';
    const desc = cleanText(item.description || 'No description provided.');

    li.innerHTML = `
      <div class="hn-body">
        <div class="hn-title-row">
          <a href="${url}" target="_blank" class="hn-title-link">${title}</a>
          <span class="hn-sep">&middot;</span>
          <span class="hn-creator">creator: ${handle}</span>
          <span class="hn-sep">&middot;</span>
          <span class="hn-stats-link">${likes} likes</span>
        </div>
        <div class="hn-description">${desc}</div>
      </div>
    `;
    list.appendChild(li);
  });

  container.appendChild(list);
}