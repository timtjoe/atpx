import { useState } from 'react';
import * as S from '../styles';

export const FeedItem = ({ item }: any) => {
  const [showModal, setShowModal] = useState(false);

  const url = item.uri?.startsWith('at://') 
    ? `https://bsky.app/profile/${item.uri.split('/')[2]}/feed/${item.uri.split('/').pop()}`
    : `https://bsky.app/search?q=${encodeURIComponent(item.displayName)}`;

  return (
    <S.ItemContainer>
      {item.avatar && <S.Avatar src={item.avatar} alt="" />}
      
      <S.MidSection>
        {/* 1. Title at the top */}
        <S.Title href={url} target="_blank">{item.displayName}</S.Title>
        
        {/* 2. Description directly below title */}
        {item.description && (
          <div style={{ 
            fontSize: '12px', 
            color: '#444', 
            margin: '2px 0 4px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.4'
          }}>
            {item.description}
          </div>
        )}

        {/* 3. Meta (Creator & Likes) at the bottom */}
        <S.Meta>
          {item.creator && (
            <>
              <span style={{ fontWeight: 500 }}>{item.creator.handle}</span>
              <span>·</span>
            </>
          )}
          <span>{item.likeCount?.toLocaleString()} active</span>
        </S.Meta>
      </S.MidSection>

      <S.RightSection>
        <S.IconButton onClick={() => setShowModal(true)}>⋮</S.IconButton>
      </S.RightSection>

      {/* Modal remains the same for performance (only renders when clicked) */}
      {showModal && (
        <dialog 
          open 
          style={{
            position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
            border: 'none', borderRadius: '12px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            width: '80%', maxWidth: '350px', zIndex: 1000
          }}
        >
          <h3 style={{marginTop: 0}}>{item.displayName}</h3>
          <p style={{fontSize: '13px', color: '#444'}}>{item.description || 'No description available.'}</p>
          <button 
            onClick={() => setShowModal(false)}
            style={{width: '100%', padding: '10px', background: '#000', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'}}
          >
            Close
          </button>
        </dialog>
      )}
    </S.ItemContainer>
  );
};