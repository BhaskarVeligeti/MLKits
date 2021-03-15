/* eslint-disable no-unused-vars, no-mixed-spaces-and-tabs, no-undef  */
import React from 'react';
import PropTypes from 'prop-types';
/* this HOC */

const withIdleTimer = (WrappedComponent, props) => {

	return class AutoLogout extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				warningTime: 1000 * 1 * 1,     // 1000ms = 1sec
				signoutTime: 1000 * 120000 * 1,    // 600000ms = 600sec = 5min
			};
		}

		componentDidMount() {
			this.events = [
				'load',
				'mousemove',
				'mousedown',
				'click',
				'scroll',
				'keypress'
			];

			for (var i in this.events) {
				window.addEventListener(this.events[i], this.resetTimeout);
			}
			this.setTimeout();

		} // end of componentDidMount

		clearTimeoutFunc = () => {
			if (this.warnTimeout) clearTimeout(this.warnTimeout);

			if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
		};

		setTimeout = () => {
			this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
			this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
		};
		resetTimeout = () => {
			this.clearTimeoutFunc();
			this.setTimeout();
		};

		warn = () => {
			// window.alert("You will be logged out automatically in 10 seconds")
			// console.log('You will be logged out automatically in 10 seconds.');
		};
		logout = () => {
			// Send a logout request to the API
			// console.log('Sending a logout request to the API...');
			this.destroy();
		};
		destroy = () => {
			//clear the session
			localStorage.removeItem('user'); //{ authUser: { token: access_token, username: email } })
			this.props.history.push('/');
			window.location.assign('/');
		};

		render() {
			AutoLogout.propTypes = {
				history: PropTypes.any,
			};
			return (
				<div>
					<WrappedComponent {...this.props} />
				</div>
			);

		}

	}


}
withIdleTimer.propTypes = {
	WrappedComponent: PropTypes.node,
	props: PropTypes.node
};


export default withIdleTimer

