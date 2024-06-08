import React, {useState} from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import RemoveModal from "./remove_modal";
import {useStartStopCampaignMutation} from "../../../../redux/global.service";
import {toast} from "react-toastify";

const Table = ({data, openEditModal}) => {
        const [removeModal, setRemoveModal] = useState(false)
        const [startStopCampaign] = useStartStopCampaignMutation()

        const handleStartStop = (type, id) => {
            startStopCampaign({type: type, id: id})
                .unwrap()
                .then((res) => {
                    if (type === 'start') {
                        toast.success('Компания заупщена')
                    } else {
                        toast.warning('Компания приостановлена')
                    }
                    console.log(res)
                })
                .catch((e) => {
                    console.log(e)
                })
        }

        const colDefs = [
            {
                headerName: 'ID',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3', padding: 0},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 100,
                field: "id",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text, s.id)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Name',
                menuTabs: [],
                // wrapText: true,
                // autoHeight: true,
                minWidth: 140,
                field: "name",
                cellStyle: {lineHeight: '1.3'},
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Status',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 145,
                field: "status",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'URL',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                // wrapText: true,
                // autoHeight: true,
                minWidth: 240,
                field: "url",
                flex: 1,
                cellRenderer: (params) => {
                    return <a href={params?.value} target={'_blank'}
                              className={classNames(s.table_text, s.table_text_link)}>{params?.value || ''}</a>
                }
            },
            {
                headerName: 'CPM',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "cpm",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Daily budget',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 130,
                field: "dailyBudget",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Total budget',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 130,
                field: "totalBudget",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Traffic flow',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 150,
                field: "trafficFlow",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'Regions',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 170,
                field: "regions",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value?.slice('')?.join(', ') || ''}</p>
                }
            },
            {
                headerName: 'Action',
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
                                                                   sx={{color: '#1976d2'}}>{params?.data?.status === 'RUNNING' ? 'Стоп' : 'Старт'}</MenuItem>}
                                    <MenuItem onClick={() => {
                                        openEditModal({...params?.data, typeModal: 'edit'})
                                        popupState.close()
                                    }} sx={{color: '#1976d2'}}>Редактировать</MenuItem>
                                    <MenuItem onClick={() => {
                                        setRemoveModal(params?.data)
                                        popupState.close()
                                    }
                                    } sx={{color: '#d32f2f'}}>Удалить</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                }
            },
        ]


        return (
            <div
                className={classNames("ag-theme-quartz", s.table)}
                style={{minHeight: 300, width: '100%'}}
            >

                {removeModal && <RemoveModal openModalAdded={removeModal} setOpenModalAdded={setRemoveModal}/>}
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
