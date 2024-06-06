import React from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import moment from "moment/moment";

const Table = ({data}) => {
        const colDefs = [
            {
                headerName: 'Date',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3', padding: 0},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 140,
                field: "created",
                flex: 1,
                cellRenderer: (params) => {
                    const timeInUTCPlus3 = params?.value ? moment(Number(params?.value)).utcOffset(+180)?.format('DD.MM.YYYY HH:mm') : null;
                    return <p
                        className={classNames(s.table_text)}>{(params?.value ? timeInUTCPlus3 : '') || ''}</p>
                }
            },
            {
                headerName: 'Type',
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                field: "type",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Status',
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                field: "status",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Amount',
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                field: "amount",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Wallet',
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                field: "currency",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },

        ]

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
