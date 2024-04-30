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

const Table = ({data}) => {
        const [removeModal, setRemoveModal] = useState(false)
        const [startStopCampaign] = useStartStopCampaignMutation()

        const handleStartStop = (id) => {
            startStopCampaign({type: 'stop', id: id})
                .unwrap()
                .then((res) => {
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
                wrapText: true,
                autoHeight: true,
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
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
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
                wrapText: true,
                autoHeight: true,
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
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "_id",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
                }
            },
            {
                headerName: 'CPM',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "_id",
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
                minWidth: 100,
                field: "_id",
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
                minWidth: 100,
                field: "_id",
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
                minWidth: 100,
                field: "_id",
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
                minWidth: 100,
                field: "_id",
                flex: 1,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || ''}</p>
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
                pinned: 'right',
                flex: 1,
                cellRenderer: (params) => {
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
                                    <MenuItem onClick={() => {
                                        handleStartStop(params.value)
                                        popupState.close()
                                    }} sx={{color: '#1976d2'}}>Старт</MenuItem>
                                    <MenuItem onClick={popupState.close} sx={{color: '#1976d2'}}>Редактировать</MenuItem>
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
                />
            </div>
        );
    }
;

export default Table;
