/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context as AppContext } from '../context/AppContext';


const SideBarPredict = ({ showComponent, taggleComponent }) => {
    const { state: { menuItems }, } = useContext(AppContext);

    return (
        //   {/* <!-- Sidebar --> */}
        <div id="sidebar-container" className="sidebar-expanded col-2 d-none d-md-block">
            {/* <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' --> */}
            {/* <!-- Bootstrap List Group --> */}
            <ul className="list-group sticky-top sticky-offset">
                {/* <!-- Separator with title --> */}
                <li className="list-group-item main-menu text-muted d-flex align-items-center menu-collapsed">
                    <small>MAIN MENU</small>
                </li>
                {menuItems.map(t =>
                    <a key={t.key} href={`#${t.name}`}
                        className={(showComponent === t.key) ? " list-group-item list-group-item-action active" : " list-group-item list-group-item-action"}
                        onClick={e => { e.preventDefault(); taggleComponent({ "id": t.key, "menu": t.name }); }}>
                        <FontAwesomeIcon icon="spinner" spin className={(showComponent === t.key) ? "mr-2" : " mr-2 text-success"} />
                        <span className="menu-collapsed">{t.name}</span>
                    </a>
                )}

            </ul>
            {/* <!-- List Group END--> */}
        </div>
        //   {/* sidebar-container END  */}

    )

}
SideBarPredict.propTypes = {
    showComponent: PropTypes.any,
    taggleComponent: PropTypes.any,
    inActiveDeals: PropTypes.any,
};

export default SideBarPredict;
