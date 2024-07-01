import React, {useState} from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {IconButton, Menu, MenuItem, useMediaQuery} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import RemoveModal from "./remove_modal";
import {useStartStopCampaignMutation} from "../../../../redux/global.service";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const Table = ({data, openEditModal, setSort}) => {
        const {t} = useTranslation()
        const query_1024 = useMediaQuery('(max-width:1024px)');

        const [removeModal, setRemoveModal] = useState(false)
        const [startStopCampaign] = useStartStopCampaignMutation()

        const handleStartStop = (type, id) => {
            startStopCampaign({type: type, id: id})
                .unwrap()
                .then((res) => {
                    if (type === 'start') {
                        toast.success(t('Кампания заупщена'))
                    } else {
                        toast.warning(t('Кампания приостановлена'))
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }

        const colDefs = [
            {
                headerName: t('ID кампании'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3', padding: 0},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                field: "id",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text, s.id)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: t('Имя'),
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 140,
                field: "name",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: t('Статус'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 145,
                field: "status",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    const translated = {
                        PAUSED: 'Остановлено',
                        REJECTED: 'Отклонено',
                        RUNNING: 'Запущено',
                        MODERATION: 'На модерации',
                        "OUT OF FUNDS": 'Закончился бюджет',
                    }
                    return <p className={s.table_text}>{t(translated[params?.value || '']) || ''}</p>
                }
            },
            {
                headerName: t('Ссылка'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 240,
                field: "url",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <a href={params?.value} target={'_blank'}
                              className={classNames(s.table_text, s.table_text_link)}>{params?.value || ''}</a>
                }
            },
            {
                headerName: t('Ставка'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "cpm",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: t('Кликов сегодня'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "clicksToday",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || 0}</p>
                }
            },
            {
                headerName: t("Потрачено сегодня"),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "costToday",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{Number(params?.value || 0).toFixed(2)}</p>
                }
            },
            {
                headerName: t('Дневной бюджет'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 130,
                field: "dailyBudget",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: t('Потрачено всего'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "costTotal",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{Number(params?.value || 0).toFixed(2)}</p>
                }
            },
            {
                headerName: t('Общий бюджет'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 130,
                field: "totalBudget",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || 0}</p>
                }
            },
            {
                headerName: t('Способ показа'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 150,
                field: "trafficFlow",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    const translated = {
                        DISTRIBUTED: 'Распределенные',
                        STANDARD: 'Стандарт',
                    }
                    return <p className={s.table_text}>{t(translated[params?.value] || '') || ''}</p>
                }
            },
            {
                headerName: t('Регионы'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 170,
                field: "regions",
                flex: 1,
                comparator: () => {
                    return null
                },
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value?.slice('')?.join(', ') || ''}</p>
                }
            },
            {
                headerName: t('Действия'),
                menuTabs: [],
                headerClass: 'center-grid-title',
                cellStyle: {
                    lineHeight: '1.3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                headerStyle: {
                    border: '1px solid red'
                },
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                maxWidth: 100,
                field: "id",
                resizable: false,
                sortable: false,
                // pinned: 'right',
                flex: 1,
                cellRenderer: (params) => {
                    const visibleStartStop = params?.data?.status === 'RUNNING' || params?.data?.status === 'PAUSED'

                    return <PopupState placement="bottom-end" variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <IconButton
                                    {...bindTrigger(popupState)}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                                <Menu {...bindMenu(popupState)} placement="bottom-end"
                                      anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'left',
                                      }}
                                      transformOrigin={{
                                          vertical: 'top',
                                          horizontal: 'right',
                                      }}
                                >
                                    {visibleStartStop && <MenuItem onClick={() => {
                                        handleStartStop(params?.data?.status === 'RUNNING' ? 'stop' : 'start', params.value)
                                        popupState.close()
                                    }}
                                                                   sx={{color: '#1976d2'}}>{params?.data?.status === 'RUNNING' ? t('Стоп') : t('Старт')}</MenuItem>}
                                    <MenuItem onClick={() => {
                                        openEditModal({...params?.data, typeModal: 'edit'})
                                        popupState.close()
                                    }} sx={{color: '#1976d2'}}>{t("Редактировать")}</MenuItem>
                                    <MenuItem onClick={() => {
                                        setRemoveModal(params?.data)
                                        popupState.close()
                                    }
                                    } sx={{color: '#d32f2f'}}>{t("Удалить")}</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
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

                {removeModal && <RemoveModal handleClose={() => setRemoveModal(false)} openModalAdded={removeModal}
                                             setOpenModalAdded={setRemoveModal}/>}
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
