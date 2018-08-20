import * as React from 'react';
import logger from '../lib/log';



class ErrorBoundary extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        logger.error('ErrorBoundary', {
            stack: error.stack,
            message: error.message,
            info
        });
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;