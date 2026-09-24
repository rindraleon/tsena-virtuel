import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="bg-surface rounded-xl border border-border p-8 max-w-md text-center">
            <h1 className="text-xl font-bold text-danger mb-2">Une erreur est survenue</h1>
            <p className="text-muted text-sm mb-4">
              {this.state.error?.message || "Quelque chose s'est mal passé."}
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.hash = '/'; }}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
