import React, {useState} from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment/moment";

const Table = ({data}) => {
        const [colDefs, setColDef] = useState([
            {
                headerName: 'Date',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "date",
                flex: 1,
                cellRenderer: (params) => {
                    return <p
                        className={classNames(s.table_text)}>{(params?.value ? moment(params?.value)?.format('DD.MM.YYYY') : '') || ''}</p>
                }
            },
            {
                headerName: 'Site',
                menuTabs: [],
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "site",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p
                              className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Clicks',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "clicks",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || 'Status'}</p>
                }
            },
            {
                headerName: 'Coast',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 180,
                field: "cost",

                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || 'Status'}</p>
                }
            },
        ])

        return (
            <div
                className={classNames("ag-theme-quartz", s.table)}
                style={{minHeight: 300, width: '100%'}}
            >
                <AgGridReact
                    columnSeparator={';'}
                    rowData={data?.result || []}
                    columnDefs={colDefs}
                    suppressRowClickSelection={true}
                    suppressDragLeaveHidesColumns={true}
                    suppressRowHoverHighlight={true}

                    suppressAggFuncInHeader={true}
                    suppressExcelExport={true}
                    tooltipShowDelay={0}
                />
            </div>
        );
    }
;

export default Table;
