import React from 'react';
import {useFormik} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useDeleteCampaignMutation} from "../../../../../redux/global.service";
import {toast} from "react-toastify";
import ModalWrapper from "../../../../../common/modal";
import {useTranslation} from "react-i18next";

const RemoveModal = ({openModalAdded, setOpenModalAdded, handleClose}) => {
    const {t} = useTranslation()

    const [deleteCampaign, {isLoading}] = useDeleteCampaignMutation()

    const handleRemove = () => {
        deleteCampaign(openModalAdded.id)
            .unwrap()
            .then((res) => {
                if (res?.ok) {
                    handleClose()
                    toast.success(t('Компания удалена'))
                } else {
                    toast.error(t('Ошибка'))
                }
                setOpenModalAdded(false)
            })
            .catch((e) => {
                toast.error(t('Ошибка'))
                console.log(e)
            })
    }


    return (
        <ModalWrapper
            open={Boolean(openModalAdded)}
            onClose={() => setOpenModalAdded(false)}
            title={<DialogTitle id="alert-dialog-title">
                {t("Подтверждение удаления")}
            </DialogTitle>}
        >

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t("Вы уверены что хотите удалить компанию")} <br/> <b>{openModalAdded?.name}</b> ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t("Отмена")}</Button>
                <Button color={'error'} onClick={handleRemove}>
                    {t("Удалить")}
                </Button>
            </DialogActions>
        </ModalWrapper>
    );
};

export default RemoveModal;
