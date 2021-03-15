/* eslint-disable no-unused-vars,no-undef  */
import React, { useContext } from 'react';
import { Context as AppContext } from '../../../context/AppContext';
import SalesTable from './SalesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProcessIndicator from './ProcessIndicator';
import BarChartView from '../../../components/d3/BarChartView';

const Sales = () => {
    const { state: { showComponent, selectedMenu, prediction, loading, showModal, errorMessage, may2019, june2019 }, _predictSales } = useContext(AppContext);
    var margin = { left: 60, right: 60, top: 60, bottom: 60 }
    /** ------------------------------- render form based on showModal,action,selectedParentRecord -------------------------------*/
    const renderForm = () => {
        // console.log('showModal :', showModal)
        return (
            <ProcessIndicator
                showModal={showModal}
                loading={loading}
                header="Prediction Process..."
                errorMessage={errorMessage}
            />
        );
    }
    /** for Predict button*/
    const onClick = (action) => {
        const fileName = action === 1 ? 'maysales' : 'junesales'
        _predictSales({ action, fileName });
    };

    // it is looks like : { yKey: 'Payments', data: [{ xValue: 'May', yValue: 500 }] TotalBillAmount

    let _data = [];
    if (prediction !== undefined && prediction.length !== 0) {
        const _prediction = prediction.filter(item => item.action === showComponent)
        console.log('_prediction :', _prediction) // [{ action: 1, TotalBillAmount: 1.64 }]
        if (_prediction.length !== 0) {
            _data.push({ xValue: `${selectedMenu}`, yValue: _prediction[0].TotalBillAmount })
        } else {
            _data = []
        }

    }

    /** ------------------------------- render on the screen -------------------------------*/
    return (
        <div className="animation">
            <div className="row justify-content-center">
                <div className="col-4" style={{ fontSize: '15px' }}>
                    {(prediction !== undefined && prediction.length !== 0 && _data.length !== 0) &&
                        <div >
                            <BarChartView
                                gdata={{ yKey: 'Sales', data: _data }}
                                container="p1"
                                width='350'
                                height='350'
                                margin={margin}
                                xAxisLabel={`Prediction`}
                                yAxisLabel="Bill Amount (Billions) "
                                isFormat="N"
                                label={''} />

                        </div>
                    }
                </div>

            </div>
            <hr />
            <div className="row">
                <div className="col-4 py-0 ml-auto" >
                    <button
                        title={`Predict ${selectedMenu} Sales`}
                        type="button"
                        className="btn btn-outline-primary btn-block"
                        style={{ width: '60%', borderRadius: '20px 20px 20px 20px' }}
                        disabled={loading ? true : false}
                        onClick={() => onClick(showComponent)}>
                        {loading && <div><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> <span >Processing...</span></div>}
                        {!loading && <span><FontAwesomeIcon icon="check" className="mr-2" />{`Predict ${selectedMenu} Sales`}</span>}
                    </button>
                </div>

            </div>
            {showModal && renderForm()}
            <div className="row">
                <div className="col-10 py-3" style={{ paddingTop: '21px', fontSize: '15px' }}>
                    <SalesTable salesData={showComponent === 1 ? may2019 : june2019} />
                </div>

            </div>
        </div>
    );
}

export default Sales;
