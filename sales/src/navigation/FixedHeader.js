/* eslint-disable no-unused-vars,no-undef, no-mixed-spaces-and-tabs */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import logo from '../images/Loader.gif';
import { withRouter } from 'react-router-dom';
import { Context as AppContext } from '../context/AppContext';
import Clock from '../components/clock/Clock';

const Header = ({ user, isAllowed, history }) => {

	const { state: { navId,}, _taggleNav } = useContext(AppContext);

	return (
		// <!-- Bootstrap NavBar --> 
		<nav className="navbar navbar-expand-lg navbar-light navbar-bg-color  fixed-top  py-md-0" >
			<Link className="navbar-brand" to="#" onClick={e => { e.preventDefault(); _taggleNav(0); history.push('/'); }}>
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
				<li className="nav-item">
                        <Link to='#' className='nav-link active' onClick={e => { e.preventDefault() }}>
                            <div className='d-flex w-100 justify-content-start align-items-center' style={{ color: '#fff' }}>
                                <FontAwesomeIcon icon="spinner" spin className="mr-2" />  <Clock />
                            </div>
                        </Link>
                    </li>

					

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
export default withRouter(Header);
/*
Use the withRouter high-order component
Instead you should use the withRouter high order component, and wrap that to the component that will push to history.
*/
