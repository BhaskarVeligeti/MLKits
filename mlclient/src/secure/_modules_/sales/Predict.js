/* eslint-disable no-unused-vars,no-undef  */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withAuth from '../../../security/withAuth';
import withNav from '../../navigation/withNav';
import { Context as AppContext } from '../../../context/AppContext';
import Element from '../../../components/element/Element';
import Sales from './Sales';
import SideBarPredict from './SideBarPredict';

const Predict = () => {
    const { state: { showComponent, selectedMenu, prediction, loading, errorMessage, }, _taggleComponent } = useContext(AppContext);

    /**
 * 
 * This is a Parent component 
 * Pass actions to all child components
 */

    const taggleComponent = (taggle) => {
        _taggleComponent(taggle);
    }


    /*----------------------- components to  rendered------------------------------*/
    const renderComponent = () => {
        switch (true) {
            case (showComponent !== 0 && (showComponent === 1 || showComponent === 2)):
                return <Sales  />

            default:
                return <Element type={2} />
        }
    }


    /*----------------------- components to  screen ------------------------------*/

    return (
        <div className="row">
            <SideBarPredict showComponent={showComponent} taggleComponent={taggleComponent} />
            <div className="col content-padding">
                {renderComponent()}
            </div>
        </div>
    );
};

Predict.propTypes = {
    user: PropTypes.any,
    isAllowed: PropTypes.any,
    history: PropTypes.any
};

const PredictPage = withAuth(withNav(Predict));

export default PredictPage;

