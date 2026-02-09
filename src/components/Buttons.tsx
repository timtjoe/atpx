import styled from "styled-components";

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-black, #000);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: transform 0.1s ease, opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.96);
  }

  .spinning {
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;