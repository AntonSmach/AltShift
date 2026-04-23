import {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false, error: null};
    }

    static getDerivedStateFromError(error: Error): State {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('[ErrorBoundary]', error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center'>
                        <p className='font-display text-2xl font-bold text-ink'>Something went wrong</p>
                        <p className='font-text text-sm text-ink-secondary'>
                            {this.state.error?.message ?? 'An unexpected error occurred.'}
                        </p>
                        <button
                            type='button'
                            onClick={() => window.location.reload()}
                            className='font-text text-sm text-brand-green underline hover:no-underline rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green'>
                            Reload page
                        </button>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export {ErrorBoundary};
