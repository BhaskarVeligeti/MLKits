/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';


const Element = ({ type }) => {

    const renderClassName = () => {
        switch (type) {
            case 1:
                return "resource"
            case 2:
                return "procurement"
            case 3:
                return "client"
            default:
                return "resource"
        }

    }

    return (<div className="d-flex justify-content-center " style={{ marginTop: '150px' }}>
        <div className={renderClassName()}>
        </div>
        <div className={renderClassName()}>
        </div>
        <div className={renderClassName()}>
        </div>

    </div>)
}

Element.propTypes = {
    type: PropTypes.any
};
export default Element;