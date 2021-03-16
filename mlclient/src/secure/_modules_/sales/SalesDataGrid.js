/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';


const SalesDataGrid = ({ data, columns, keyField, headerClasses }) => {
    const { ExportCSVButton } = CSVExport;
    const { SearchBar } = Search;

    return (
        <ToolkitProvider
            keyField={keyField}
            columns={columns}
            data={data}
            bootstrap4
            search={true}
            exportCSV={true}>
            {props => (
                <div>
                    <div className="row">
                        <div className="col-md-3 pt-2">
                        <SearchBar {...props.searchProps} />
                        </div>
                        {/* <div className="col-md-3 offset-md-8">
                            <SearchBar {...props.searchProps} />
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-md-12 pt-1">
                            <BootstrapTable
                                {...props.baseProps}
                                condensed={true}
                                bordered={false}
                                hover
                                headerClasses={headerClasses ? headerClasses : "custom-table-header"}
                                noDataIndication="Table is Empty..."
                                rowStyle={{ height: '5px' }}
                            />
                        </div>
                    </div>
                </div>
            )
            }
        </ToolkitProvider>
    )
}

SalesDataGrid.propTypes = {
    data: PropTypes.any,
    columns: PropTypes.any,
    keyField: PropTypes.any,
    headerClasses: PropTypes.any,
    csvProps: PropTypes.any,
    searchProps: PropTypes.any,
    baseProps: PropTypes.any
};

export default SalesDataGrid;

