import React from 'react';

import Spinner from '../../components/spinner/spinner.component';

/**
 * Higher order component which takes a component which takes an isLoading property,
 * displays an animated spinner icon while the wrapped component's isLoading prop is true
 * @param {Component} WrappedComponent 
 */
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <Spinner />
    ) : (
        <WrappedComponent {...otherProps} />
    );
}; 

export default WithSpinner;