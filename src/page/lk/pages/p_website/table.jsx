import React, {useState} from 'react';
import classNames from "classnames";
import s from './styles.module.css'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useRemovePWebsiteMutation} from "../../../../redux/global.service";
import {toast} from "react-toastify";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Table = ({data}) => {
        const [removePWebsite, {isLoading}] = useRemovePWebsiteMutation()

        const [actionModal, setActionModal] = useState(null)
        const [colDefs, setColDef] = useState([
            {
                headerName: 'ID',
                menuTabs: [],

                wrapText: true,
                autoHeight: true,
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

                wrapText: true,
                autoHeight: true,
                minWidth: 100,
                field: "domain",
                flex: 1.5,
                cellRenderer: (params) => {
                    return <a href={params?.value} target={'_blank'}
                              className={classNames(s.table_text, s.table_text_link)}>{params?.value || 'id'}</a>
                }
            },
            {
                headerName: 'Status',
                menuTabs: [],

                wrapText: true,
                autoHeight: true,
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

                wrapText: true,
                autoHeight: true,
                minWidth: 180,
                field: "_id",

                flex: 0.5,
                cellRenderer: (params) => {
                    return <div className={classNames(s.table_text, s.table_text_action)}>
                        <p className={s.code}
                           onClick={() => setActionModal({type: 'code', value: params?.data || ''})}
                        >Get code</p>
                        <p>/</p>
                        <p className={s.delete}
                           onClick={() => setActionModal({type: 'delete', value: params?.data || ''})}>Delete</p>

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
                                Вы действительно хотите удалить домен <a className={s.table_text_link}
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
                />
            </div>
        );
    }
;

export default Table;
