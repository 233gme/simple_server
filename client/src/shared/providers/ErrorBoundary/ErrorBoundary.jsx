import React, { Suspense } from 'react';
import { ErrorPage } from 'pages/index';
import Loader from 'shared/ui/Loader';

class ErrorBoundary
  extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info.componentStack);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Suspense fallback={<Loader/>}>
          <ErrorPage/>
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;