import React, {useState} from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip
} from "@mui/material";
import {useRemovePWebsiteMutation} from "../../../../redux/global.service";
import {toast} from "react-toastify";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Table = ({data}) => {
        const [removePWebsite, {isLoading}] = useRemovePWebsiteMutation()

        const [actionModal, setActionModal] = useState(null)
        const [colDefs, setColDef] = useState([
            {
                headerName: 'ID',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                minWidth: 100,
                field: "_id",
                flex: .7,
                cellRenderer: (params) => {
                    return <p className={classNames(s.table_text)}>{params?.value || 'id'}</p>
                }
            },
            {
                headerName: 'Domain',
                menuTabs: [],
                minWidth: 100,
                field: "domain",
                cellStyle: {lineHeight: '1.3'},
                flex: 1.5,
                cellRenderer: (params) => {
                    return <a href={params?.value} target={'_blank'}
                              className={classNames(s.table_text, s.table_text_link)}>{params?.value || 'id'}</a>
                }
            },
            {
                headerName: 'Status',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},

                minWidth: 100,
                field: "status",
                flex: 0.5,
                cellRenderer: (params) => {
                    return <p className={s.table_text}>{params?.value || 'Status'}</p>
                }
            },
            {
                headerName: 'Actions',
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 180,
                field: "_id",

                flex: 0.5,
                cellRenderer: (params) => {
                    return <div className={classNames(s.table_text, s.table_text_action)}>
                        <Tooltip title={'Get code'}>
                            <IconButton sx={{height: '20px', width: '20px'}}
                                        onClick={() => setActionModal({type: 'code', value: params?.data || ''})}>
                                <VisibilityIcon sx={{color: '#247ba0'}}/>
                            </IconButton>
                        </Tooltip>
                        <p>/</p>
                        <Tooltip title={'Delete'}>
                            <IconButton sx={{height: '20px', width: '20px'}}
                                        onClick={() => setActionModal({type: 'delete', value: params?.data || ''})}>
                                <DeleteIcon sx={{color: '#d32f2f'}}/>
                            </IconButton>
                        </Tooltip>

                    </div>
                }
            },
        ])

        const handleRemove = (id) => {
            removePWebsite(id)
                .unwrap()
                .then((res) => {
                    console.log(res)
                    if (res?.ok) {
                        toast.success('Удалено')
                        setActionModal(null)
                    } else {
                        toast.error('Ошибка удаления')
                    }
                })
                .catch((e) => {
                    console.log(e)
                    toast.error('Ошибка удаления')
                })
        }

        return (
            <div
                className={classNames("ag-theme-quartz", s.table)}
                style={{minHeight: 300, width: '100%'}}
            >
                {actionModal && <Dialog
                    open={Boolean(actionModal)}
                    onClose={() => setActionModal(null)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {actionModal?.type === 'delete' ? 'Подтверждение удаления' : 'Просмотр кода'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {actionModal?.type === 'delete' ? <>
                                Вы действительно хотите удалить домен <a style={{display: 'inline'}}
                                                                         className={s.table_text_link}
                                                                         href={actionModal?.value?.domain}
                                                                         target={'_blank'}> {actionModal?.value?.domain}</a> ?
                            </> : <code>
                                {actionModal?.value?.code}
                            </code>}

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {actionModal?.type === 'delete' ? <>
                                <Button onClick={() => setActionModal(null)} disabled={isLoading}>Отмена</Button>
                                <Button disabled={isLoading} onClick={() => handleRemove(actionModal?.value?._id)}>
                                    Подтвердить
                                </Button>
                            </> :
                            <CopyToClipboard text={actionModal?.value?.code}
                                             onCopy={() => {
                                                 toast.success('Скопировано в буфер обмена')
                                                 setActionModal(null)
                                             }}>
                                <Button>
                                    Скопировать код в буфер обмена
                                </Button>
                            </CopyToClipboard>
                        }

                    </DialogActions>
                </Dialog>}

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
