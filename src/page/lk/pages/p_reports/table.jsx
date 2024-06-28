import React, {useState} from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment-timezone";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";

const Table = ({data,setSort}) => {
        const {t} = useTranslation()
        const query_1024 = useMediaQuery('(max-width:1024px)');

        const colDefs = [
            {
                headerName: t('Дата'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                comparator: () => {
                    return null
                },
                minWidth: 100,
                field: "date",
                flex: 1,
                cellRenderer: (params) => {
                    const timeInUTCPlus3 = params?.value ? moment(Number(params?.value)).utcOffset(+180)?.format('DD.MM.YYYY') : null;
                    return <p
                        className={classNames(s.table_text)}>{(params?.value ? timeInUTCPlus3 : '') || ''}</p>
                }
            },
            {
                headerName: t('Площадка'),
                menuTabs: [],
                comparator: () => {
                    return null
                },
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
                headerName: t('Переходы'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                comparator: () => {
                    return null
                },
                minWidth: 100,
                field: "clicks",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || 'Status'}</p>
                }
            },
            {
                headerName: t('Стоимость'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                comparator: () => {
                    return null
                },
                minWidth: 180,
                field: "cost",

                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{(+params?.value || 0)?.toFixed(2) || ''}</p>
                }
            },
        ]

    const onSortChanged = (event) => {
        const columnState = event.columnApi.getColumnState();

        const sortModel = columnState?.find(col => col?.sort);

        setSort(sortModel ? (sortModel?.sort === 'asc' ? sortModel?.colId : `-${sortModel?.colId}`) : null)
    };

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
                    domLayout={query_1024 ? "" : 'autoHeight'}
                    suppressAggFuncInHeader={true}
                    suppressExcelExport={true}
                    tooltipShowDelay={0}
                    onSortChanged={onSortChanged}
                    suppressSorting={true}
                    suppressMovableColumns={query_1024 ? true : false}
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
