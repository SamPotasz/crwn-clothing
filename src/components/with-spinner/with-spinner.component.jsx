import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

/**
 * Higher order component which takes a component which takes an isLoading property,
 * displays an animated spinner icon while the wrapped component's isLoading prop is true
 * @param {Component} WrappedComponent 
 */
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    );
};

export default WithSpinner;