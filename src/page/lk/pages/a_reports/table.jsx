import React, {useState} from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";

const Table = ({data}) => {
        const [colDefs, setColDef] = useState([
            {
                headerName: 'Date',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                minWidth: 100,
                field: "date",
                flex: 1,
                cellRenderer: (params) => {
                    return <p
                        className={classNames(s.table_text)}>{(params?.value ? moment(params?.value)?.format('DD.MM.YYYY') : '') || ''}</p>
                }
            },
            {
                headerName: 'campaignName',
                menuTabs: [],
                minWidth: 100,
                field: "campaignName",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Clicks',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                minWidth: 100,
                field: "clicks",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Coast',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                minWidth: 180,
                field: "cost",

                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{(+params?.value || 0)?.toFixed(2) || ''}</p>
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

                    navigateToNextCell={params => {
                        const suggestedNextCell = params.nextCellPosition;

                        // this is some code
                        const KEY_UP = 'ArrowUp';
                        const KEY_DOWN = 'ArrowDown';

                        const noUpOrDownKey = params.key !== KEY_DOWN && params.key !== KEY_UP;
                        if (noUpOrDownKey) {
                            return suggestedNextCell;
                        }

                        params.api.forEachNode(node => {
                            if (node?.rowIndex === null || node?.rowIndex === undefined || suggestedNextCell?.rowIndex === null || suggestedNextCell?.rowIndex === undefined) {
                                return
                            } else {
                                if (node.rowIndex === suggestedNextCell.rowIndex) {
                                    node.setSelected(true);
                                }
                            }


                        });

                        return suggestedNextCell;
                    }}
                    onCellClicked={(params) => {
                        params.node.setSelected(true)
                    }}
                />
            </div>
        );
    }
;

export default Table;
