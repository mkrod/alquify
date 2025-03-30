import "./css/errorElement.css";
import React from "react";

interface ErrorElementProps {
  children: React.ReactNode;
}

interface ErrorElementState {
  hasError: boolean;
  isLoading: boolean;
}

class ErrorElement extends React.Component<ErrorElementProps, ErrorElementState> {
  constructor(props: ErrorElementProps) {
    super(props);
    this.state = { hasError: false, isLoading: false };
  }

  static getDerivedStateFromError(_: Error): Partial<ErrorElementState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by ErrorElement:", error, info);
  }

  retry = () => {
    this.setState({ isLoading: true });
    setTimeout(() => window.location.reload(), 1000);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-content">
            <h1 className="error-title">Oops!</h1>
            <p className="error-message">Something went wrong.</p>
            <button onClick={this.retry} className="retry-button">
              {this.state.isLoading ? "Reloading..." : "Retry"}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorElement;
