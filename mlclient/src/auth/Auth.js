/* eslint-disable no-unused-vars*/
import React from 'react';
import AuthHeader from './AuthHeader';
import AuthContent from './AuthContent';
import FooterContent from './FooterContent';
import ErrorBoundary from '../errorboundary/ErrorBoundary'

const Auth = () => {
    return (
        <div>
            {/* <!-- Fixed navbar --> */}
            <AuthHeader />
            {/* <!-- Begin page content --> */}
            <ErrorBoundary>
                <AuthContent />
            </ErrorBoundary>

            {/* <!--  sticky footer content --> */}
            {/* <FooterContent /> */}
        </div>
    );
};
export default Auth;
