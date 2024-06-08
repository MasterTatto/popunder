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
import ModalWrapper from "../../../../common/modal";
import {useTranslation} from "react-i18next";

const Table = ({data}) => {
        const {t} = useTranslation()

        const [removePWebsite, {isLoading}] = useRemovePWebsiteMutation()

        const [actionModal, setActionModal] = useState(null)

        const colDefs = [
            {
                headerName: t('ID площадки'),
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
                headerName: t('Площадка'),
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
                headerName: t('Статус'),
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
                headerName: t('Действия'),
                menuTabs: [],
                cellStyle: {lineHeight: '1.3'},
                wrapText: true,
                autoHeight: true,
                minWidth: 140,
                field: "_id",

                flex: 0.5,
                cellRenderer: (params) => {
                    console.log(params)
                    return <div className={classNames(s.table_text, s.table_text_action)}>
                        {['RUNNING', 'PAUSED']?.includes(params?.data?.status) && <>
                            <Tooltip title={t('Получит код')}>
                                <IconButton sx={{height: '20px', width: '20px'}}
                                            onClick={() => setActionModal({type: 'code', value: params?.data || ''})}>
                                    <VisibilityIcon sx={{color: '#247ba0'}}/>
                                </IconButton>
                            </Tooltip>
                            <p>/</p>
                        </>}
                        <Tooltip title={t('Удалить')}>
                            <IconButton sx={{height: '20px', width: '20px'}}
                                        onClick={() => setActionModal({type: 'delete', value: params?.data || ''})}>
                                <DeleteIcon sx={{color: '#d32f2f'}}/>
                            </IconButton>
                        </Tooltip>

                    </div>
                }
            },
        ]

        const handleRemove = (id) => {
            removePWebsite(id)
                .unwrap()
                .then((res) => {
                    console.log(res)
                    if (res?.ok) {
                        toast.success(t('Удалено'))
                        setActionModal(null)
                    } else {
                        toast.error(t('Ошибка удаления'))
                    }
                })
                .catch((e) => {
                    console.log(e)
                    toast.error(t('Ошибка удаления'))
                })
        }

        return (
            <div
                className={classNames("ag-theme-quartz", s.table)}
                style={{minHeight: 300, width: '100%'}}
            >
                {actionModal &&
                    <ModalWrapper
                        open={Boolean(actionModal)}
                        onClose={() => setActionModal(false)}
                        title={<DialogTitle id="alert-dialog-title">
                            {actionModal?.type === 'delete' ? t('Подтверждение удаления') : t('Просмотр кода')}
                        </DialogTitle>}
                    >

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {actionModal?.type === 'delete' ? <>
                                    {`${t('Вы действительно хотите удалить домен')}`}

                                    <a style={{display: 'inline'}}
                                       className={s.table_text_link}
                                       href={actionModal?.value?.domain}
                                       target={'_blank'}> {actionModal?.value?.domain}</a>
                                </> : <>
                                    {t("Установите этот код к себе на сайт. В любом месте между тегами <body> и </body>.")}
                                    <b>
                                        <code>
                                            {actionModal?.value?.code}
                                        </code>
                                    </b>
                                </>
                                }

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {actionModal?.type === 'delete' ? <>
                                    <Button onClick={() => setActionModal(null)} disabled={isLoading}>{t("Отмена")}</Button>
                                    <Button disabled={isLoading} onClick={() => handleRemove(actionModal?.value?._id)}>
                                        {t("Подтвердить")}
                                    </Button>
                                </> :
                                <CopyToClipboard text={actionModal?.value?.code}
                                                 onCopy={() => {
                                                     toast.success('Скопировано в буфер обмена')
                                                     setActionModal(null)
                                                 }}>
                                    <Button>
                                        {t("Скопировать код в буфер обмена")}
                                    </Button>
                                </CopyToClipboard>
                            }

                        </DialogActions>
                    </ModalWrapper>}

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
