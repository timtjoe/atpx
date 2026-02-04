import styled from "styled-components";

export const CommunitiesWrapper = styled.div`
  width: 100%;
  /* border-top: 2px solid #ff6600; */
  margin-top: 10px;
`;

export const SectionHeader = styled.div`
  padding: 10px 15px;
  font-weight: bold;
  font-size: 13px;
  color: #ff6600;
  text-transform: lowercase;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px; /* Tighter gap for smaller cards */
  padding: 10px;
  align-items: stretch;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row; /* Horizontal layout */
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
  height: 64px; /* Fixed height for a neat row look */
  align-items: center;
`;

export const CardImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 8px;
  flex-shrink: 0;
`;

export const PlaceholderBox = styled.div`
  width: 48px;
  height: 48px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #aaa;
  font-weight: bold;
  border-radius: 4px;
  margin-left: 8px;
  flex-shrink: 0;
`;

export const CardContent = styled.div`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0; /* Important for text truncation */
  flex: 1;
`;

export const Title = styled.a`
  font-size: 11px; /* Smaller font */
  font-weight: 600;
  color: #000;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-direction: column; /* Stacked metadata to save horizontal space */
  font-size: 9px; /* Very small font for sub-details */
  color: var(--hn-gray);
  margin-top: 2px;
`;

export const CreatorLink = styled.a`
  color: var(--fb-blue);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

export const ActiveCount = styled.span`
  margin-top: 1px;
`;

export const OptionsButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  margin-right: 4px;
  &:hover {
    color: #000;
  }
`;

/* Modal and Load More remain standard */
export const LoadMoreContainer = styled.div`
  text-align: center;
  padding: 20px 0;
`;
export const LoadMoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: var(--hn-gray);
  &:hover {
    color: #ff6600;
    text-decoration: underline;
  }
`;
export const ModalBackdrop = styled.dialog`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  border-radius: 8px;
  padding: 15px;
  width: 80%;
  max-width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;
export const ModalTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
`;
export const ModalBody = styled.p`
  font-size: 12px;
  color: #444;
  margin-bottom: 12px;
`;
export const ModalCloseBtn = styled.button`
  width: 100%;
  padding: 8px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
