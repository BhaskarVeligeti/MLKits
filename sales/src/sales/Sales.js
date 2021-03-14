/* eslint-disable no-unused-vars,no-undef  */
import React, { useContext } from 'react';
import { Context as AppContext } from '../context/AppContext';
import SalesTable from './SalesTable';


const Sales = () => {
    const { state: { showComponent, selectedMenu, loading, errorMessage, may2019, june2019 }, } = useContext(AppContext);

    /** ------------------------------- render on the screen -------------------------------*/
    return (
        <div className="animation">
            <div className="row">
                <div className="col py-3" style={{ paddingTop: '21px', fontSize: '15px' }}><code>{selectedMenu}
                    <span className="badge badge-success badge-pill ml-1">{showComponent}</span>
                </code>
                </div>

            </div>
            <hr />
            <div className="row">
                <div className="col-10 py-3" style={{ paddingTop: '21px', fontSize: '15px' }}>
                    <SalesTable salesData={showComponent === 1 ? may2019 : june2019} />
                </div>

            </div>
        </div>
    );
}

export default Sales;
