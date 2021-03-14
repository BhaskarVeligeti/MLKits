/* eslint-disable no-unused-vars,no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import DataGrid from './SalesDataGrid';
import { dataColumns } from '../fixtures/datagridcolumns.json'


const SalesTable = ({ salesData }) => {
    const [columns, setColumns] = useState([]);

    const quantityFormate = (cell, row, enumObject, rowIndex) => {
        return numeral((row.billquantity)).format('0,0.00');
    };
    // ***************************************************************************************************************************************************************
    /* When loading the component for the first time we need to initialize  "formatter"*/
    useEffect(() => {
        dataColumns.map(c => {
            if (c.dataField === 'billquantity') {
                c.formatter = quantityFormate;
            }
            return null;
        })
        setColumns(dataColumns);
    }, []);

    const renderDataGrid = () => {
        return (
            <DataGrid
                keyField={"ordinal"}
                data={salesData}
                columns={columns}
            />
        )
    }

    return (
        <div>
            {columns.length > 0 && renderDataGrid()}
        </div>
    )
};

SalesTable.propTypes = {
    salesData: PropTypes.any
};

export default SalesTable;