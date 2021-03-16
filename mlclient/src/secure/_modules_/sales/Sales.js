/* eslint-disable no-unused-vars,no-undef  */
import React, { useContext } from 'react';
import { Context as AppContext } from '../../../context/AppContext';
import SalesTable from './SalesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProcessIndicator from './ProcessIndicator';
import BarChartView from '../../../components/d3/BarChartView';
import GaugeChart from 'react-gauge-chart'

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

    /** ------------------------------- render on the screen -------------------------------*/
    return (
        <div className="animation">
            <div className="row">
                <div className="col-8 pt-1" >
                    <div className="row ">
                        <div className="col-6" style={{ fontSize: '15px' }}>
                            {(showComponent === 1 && prediction.length !== 0 && prediction.filter(item => item.action === showComponent).length !== 0) &&
                                <div >
                                    <span>{'Accuracy '}</span>
                                    <GaugeChart id="gauge-chart1"
                                        percent={0.01 * prediction.filter(item => item.action === showComponent)[0].accuracy}
                                        textColor="#106eea"
                                    />
                                </div>
                            }
                            {(showComponent === 2 && prediction.length !== 0 && prediction.filter(item => item.action === showComponent).length !== 0) &&
                                <div >
                                    <span>{'Accuracy '}</span>
                                    <GaugeChart id="gauge-chart2"
                                        nrOfLevels={20}
                                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                                        arcWidth={0.3}
                                        percent={0.01 * prediction.filter(item => item.action === showComponent)[0].accuracy}
                                        textColor="#106eea"

                                    />
                                </div>
                            }
                        </div>
                        <div className="col-6" style={{ fontSize: '15px' }}>
                            {(showComponent === 1 && prediction.length !== 0 && prediction.filter(item => item.action === showComponent).length !== 0) &&
                                <div >
                                    <span>{`Predict Total Bill Amount : R ${prediction.filter(item => item.action === showComponent)[0].TotalBillAmount} Billions`}</span>
                                    <BarChartView
                                        gdata={{ yKey: 'Sales', data: [{ xValue: `${selectedMenu}`, yValue: prediction.filter(item => item.action === showComponent)[0].TotalBillAmount }] }}
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
                            {(showComponent === 2 && prediction.length !== 0 && prediction.filter(item => item.action === showComponent).length !== 0) &&
                                <div >
                                    <span>{`Predict Total Bill Amount : R ${prediction.filter(item => item.action === showComponent)[0].TotalBillAmount} Billions`}</span>
                                    <BarChartView
                                        gdata={{ yKey: 'Sales', data: [{ xValue: `${selectedMenu}`, yValue: prediction.filter(item => item.action === showComponent)[0].TotalBillAmount }] }}
                                        container="p2"
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
                </div>
                <div className="col-4 pt-1 ml-auto" >
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
                <div className="col-10 py-0" style={{ paddingTop: '21px', fontSize: '15px' }}>
                    <SalesTable salesData={showComponent === 1 ? may2019 : june2019} />
                </div>
            </div>
        </div>
    );
}

export default Sales;
