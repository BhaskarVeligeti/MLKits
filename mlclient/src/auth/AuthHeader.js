import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../images/Loader.gif';
import { Link } from 'react-router-dom';
import Clock from '../components/clock/Clock';


const AuthHeader = () => {
    // <!-- Fixed navbar -->
    return (
        // <!-- Bootstrap NavBar -->
        <nav className="navbar navbar-expand-lg navbar-light navbar-bg-color  fixed-top  py-md-0" >
            <Link className="navbar-brand" to="#">
                <span className="brand-text">
                    <img src={logo} width="45" height="45" className="rounded float-left mr-2" alt="" loading="lazy" />
                    <span style={{ color: '#0a6dbe' }}>Machine Learning (ML) Predictions </span>
                </span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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


    );


};
export default AuthHeader;





