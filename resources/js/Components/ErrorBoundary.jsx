import React from 'react';
import { Link } from '@inertiajs/react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('SPA ErrorBoundary caught:', error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-bg)',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div>
                        <h1 style={{ 
                            fontSize: '3rem', 
                            color: 'var(--color-accent)', 
                            marginBottom: '1rem',
                            fontWeight: 300
                        }}>
                            Something went wrong
                        </h1>
                        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            We'll get this fixed soon.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/" className="btn-primary inline-flex items-center gap-2">
                                Go Home
                            </Link>
                            <button 
                                onClick={this.resetError}
                                className="btn-outline inline-flex items-center gap-2"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

