import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  /** The UI that might crash */
  children: ReactNode;
  /** Custom UI to show when a crash occurs */
  fallback?: ReactNode;
  /** Callback to log errors to a service like Sentry */
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to your analytics or console
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}