/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import AuthService from './AuthService';

const withAuth = (AuthComponent, props) => {
  const Auth = new AuthService();
  return class AuthWrapped extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: undefined
      };
    }

    componentDidMount() {
      if (Auth.loggedIn() === false) {
        this.props.history.push('/');
      } else {
        try {
          const profile = JSON.parse(Auth.getProfile());
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          this.props.history.push('/');
        }
      }
    }


    isAllowed = allowedRoles => {
      //   console.log('allowedRoles :',allowedRoles)
      //   console.log('this.state :', this.state)
      if (this.state.user !== undefined) {
        return allowedRoles.some(r => this.state.user.role.includes(r)); //By using the some and includes methods from the Array prototype,
      }
    };


    render() {
      AuthWrapped.propTypes = {
        history: PropTypes.any,
      };
      //   console.log('this.state.user :', this.state.user)
      if (this.state.user !== undefined) {
        return (
          <AuthComponent user={this.state.user} isAllowed={this.isAllowed} history={this.props.history} />
        );
      } else {
        // For now I am returning nothing, but you could put an error messages
        return (
          <div className="alert alert-danger" role="alert">
            hey! you went wrong.....
          </div>
        );
      }
    }
  };
}

withAuth.propTypes = {
  WrappedComponent: PropTypes.node,
  props: PropTypes.node
};
export default withAuth;