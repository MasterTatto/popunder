import React from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {IconButton, Menu, MenuItem, useMediaQuery} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import moment from "moment/moment";
import {useTranslation} from "react-i18next";

const Table = ({data, setSort}) => {
        const {t} = useTranslation()
        const query_1024 = useMediaQuery('(max-width:1024px)');

        const colDefs = [
            {
                headerName: t('Дата'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3', padding: 0},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 140,
                comparator: () => {
                    return null
                },
                field: "created",
                flex: 1,
                cellRenderer: (params) => {
                    const timeInUTCPlus3 = params?.value ? moment(Number(params?.value)).utcOffset(+180)?.format('DD.MM.YYYY HH:mm') : null;
                    return <p
                        className={classNames(s.table_text)}>{(params?.value ? timeInUTCPlus3 : '') || ''}</p>
                }
            },
            {
                headerName: t('Тип'),
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                comparator: () => {
                    return null
                },
                field: "type",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    const translated = {
                        deposit: 'Пополнение',
                        payout: 'Выплата',
                    }
                    return <p className={classNames(s.table_text)}>{t(translated[params?.value] || '') || ''}</p>
                }
            },
            {
                headerName: t('Статус'),
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                comparator: () => {
                    return null
                },
                field: "status",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    const translated = {
                        created: 'Создано',
                        completed: 'Успешно',
                        rejected: 'Отклонено',
                    }
                    return <p className={classNames(s.table_text)}>{t(translated[params?.value] || '') || ''}</p>
                }
            },
            {
                headerName: t('Сумма'),
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                comparator: () => {
                    return null
                },
                field: "amount",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: t('Кошелек'),
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                comparator: () => {
                    return null
                },
                field: "wallet",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },

        ]

        const onSortChanged = (event) => {
            const columnState = event.columnApi.getColumnState();

            const sortModel = columnState?.find(col => col?.sort);

            setSort(sortModel ? (sortModel?.sort === 'asc' ? `%2B${sortModel?.colId}` : `-${sortModel?.colId}`) : null)
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
                    onSortChanged={onSortChanged}
                    suppressSorting={true}
                    suppressRowClickSelection={true}
                    suppressDragLeaveHidesColumns={true}
                    suppressRowHoverHighlight={true}
                    domLayout={query_1024 ? "" : 'autoHeight'}
                    suppressAggFuncInHeader={true}
                    suppressExcelExport={true}
                    tooltipShowDelay={0}
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
