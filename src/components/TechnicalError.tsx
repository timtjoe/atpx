import React from "react";
import styled from "styled-components";
import { AlertCircle } from "lucide-react";

interface TechnicalErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const TechnicalError = ({ 
  message = "Something technical happened.", 
  onRetry 
}: TechnicalErrorProps): React.JSX.Element => (
  <ErrorWrapper>
    <AlertCircle size={24} color="var(--text-muted)" />
    <ErrorMessage>{message}</ErrorMessage>
    {onRetry && <RetryButton onClick={onRetry}>Try again</RetryButton>}
  </ErrorWrapper>
);

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  gap: var(--spacing-md);
  text-align: center;
`;

const ErrorMessage = styled.span`
  color: var(--text-muted);
  font-size: var(--font-sm);
`;

const RetryButton = styled.button`
  color: var(--text-blue);
  font-weight: 600;
  font-size: var(--font-sm);
  &:hover { text-decoration: underline; }
`;