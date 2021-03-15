/* eslint-disable no-unused-vars,no-undef, no-mixed-spaces-and-tabs */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import logo from '../../images/Loader.gif';
import withAuth from '../../security/withAuth';
import { withRouter } from 'react-router-dom';
import { Context as AppContext } from '../../context/AppContext';

const Header = ({ user, isAllowed, history }) => {

	const { state: { navId }, _taggleNav, signOut } = useContext(AppContext);


	const _signOut = () => {
		signOut();
		_taggleNav(0);
	}

	return (
		// <!-- Bootstrap NavBar --> 
		<nav className="navbar navbar-expand-lg navbar-light navbar-bg-color  fixed-top  py-md-0" >
			<Link className="navbar-brand" to="#" onClick={e => { e.preventDefault(); _taggleNav(0); history.push('/home'); }}>
				<span className="brand-text">
					<img src={logo} width="45" height="45" className="rounded float-left mr-2" alt="" loading="lazy" />
					<span style={{ color: '#0a6dbe' }}>Machine Learning (ML) Predictions</span>
				</span>
			</Link>
			<button className="navbar-toggler" type="button" data-toggle="offcanvas" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarText">
				<ul className="navbar-nav ml-auto">
					{isAllowed(['Administrator']) && (
						<li className={(navId === 0) ? "nav-item active" : "nav-item"}>
							<Link to='#' className='nav-link ' onClick={e => { e.preventDefault(); _taggleNav(0); history.push('/home'); }}>
								<div className='d-flex w-100 justify-content-start align-items-center'>
									<FontAwesomeIcon icon="home" className="mr-1" />
										Home <span className="badge badge-success badge-pill ml-1">{2}</span>
								</div>
							</Link>
						</li>
					)}

					{isAllowed(['Administrator']) && (
						<li className="nav-item dropdown" >
							<a
								className="nav-link dropdown-toggle"
								href="./"
								id="navbarDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								{'Signout'}	</a>
							<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
								<Link to='#signout' className='dropdown-item' onClick={e => { e.preventDefault(); _signOut() }}>
									<FontAwesomeIcon icon="sign-in-alt" className="mr-2" />
									{user.name}
								</Link>
							</div>
						</li>
					)}
				</ul>

			</div>
		</nav>

	)
}
// }

Header.propTypes = {
	user: PropTypes.any,
	isAllowed: PropTypes.any,
	history: PropTypes.any
};
export default withAuth(withRouter(Header));
/*
Use the withRouter high-order component
Instead you should use the withRouter high order component, and wrap that to the component that will push to history.
*/
