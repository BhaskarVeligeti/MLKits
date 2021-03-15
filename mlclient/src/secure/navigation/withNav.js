/* eslint-disable no-unused-vars,no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import FixedHeader from './FixedHeader';
import ErrorBoundary from '../../errorboundary/ErrorBoundary'

/* this HOC */

const withNav = (WrappedComponent, props) => {
  return class WithNavWrapped extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      // console.log('location :',this.props.history.location) //  animation          // this.props = {history,isAllowed,user}
      return (
        <div>
          {/* <!-- Fixed navbar --> */}
          <FixedHeader />
          {/* <!-- Begin page content --> */}
          <main role="main" className="flex-shrink-0 ">
            <ErrorBoundary>
              <WrappedComponent {...this.props} />
            </ErrorBoundary>
          </main>
        </div>
      );
    }
  };
}
withNav.propTypes = {
  WrappedComponent: PropTypes.any,
  props: PropTypes.any
};

export default withNav;