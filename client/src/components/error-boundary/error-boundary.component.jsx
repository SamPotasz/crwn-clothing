import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles';

/**
 * Class which helps us catch lazy-loaded components
 * that hang on load or fail to load.
 * 
 * Need access to life-cycle methods so it's a class component.
 * 
 * We wrap this around lazy-loaded components, and whenever children
 * get an error, that error gets passed into getDerivedStateFromError
 */
class ErrorBoundary extends React.Component {

  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  static getDerivedStateFromError( error ) {
    return { hasErrored: true }
  }

  //allows us to perform side effects with error
  componentDidCatch( error, info ) {
    console.error( error );
  }

  //prevent hanging on error
  render() {
    if( this.state.hasErrored ) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl = "https://i.imgur.com/oCkEbrA.png" />
          <ErrorImageText>This Page is Lost in the Wind</ErrorImageText>
        </ErrorImageOverlay>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;