function cleanText(text: string): string {
  if (!text) return "";
  return text.replace(/[\p{Extended_Pictographic}\p{S}]/gu, "").trim();
}

export function render(container: HTMLElement, items: any[], isAppend = false) {
  if (!isAppend) {
    container.innerHTML = '';
    const list = document.createElement('ol');
    list.className = 'hn-list';
    container.appendChild(list);
  }
  const list = container.querySelector('.hn-list')!;

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'hn-item';

    const isFeed = item.uri.startsWith('at://');
    const url = isFeed 
      ? `https://bsky.app/profile/${item.uri.replace('at://', '').split('/')[0]}/feed/${item.uri.split('/').pop()}`
      : `https://bsky.app/search?q=${encodeURIComponent(item.displayName)}`;

    const creatorHtml = (item.type === 'popular' && item.creator) 
      ? `<span class="hn-creator-box">
          <span class="hn-sep">&middot;</span>
          (<a href="https://bsky.app/profile/${item.creator.did}" target="_blank" class="hn-creator-link">${item.creator.handle}</a>)
         </span>` 
      : '';

    const statsLabel = item.type === 'popular' ? 'likes' : 'active posts';
    const imageHtml = (item.avatar && cleanText(item.description).length > 10) 
      ? `<img src="${item.avatar}" alt="" class="hn-feed-img" />` 
      : '';

    li.innerHTML = `
      <div class="hn-article-box">
        <div class="hn-text-content">
          <div class="hn-title-row">
            <a href="${url}" target="_blank" class="hn-title-link">${cleanText(item.displayName)}</a>
            ${creatorHtml}
            <span class="hn-sep">&middot;</span>
            <span class="hn-stats-link">${(item.likeCount || 0).toLocaleString()} ${statsLabel}</span>
          </div>
          <div class="hn-description">${(item.description || '').substring(0, 250)}</div>
        </div>
        ${imageHtml}
      </div>`;
    list.appendChild(li);
  });
}