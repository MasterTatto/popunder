import React from 'react';
import {useFormik} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useDeleteCampaignMutation} from "../../../../../redux/global.service";
import {toast} from "react-toastify";
import ModalWrapper from "../../../../../common/modal";

const RemoveModal = ({openModalAdded, setOpenModalAdded}) => {
    const [deleteCampaign, {isLoading}] = useDeleteCampaignMutation()

    const handleRemove = () => {
        deleteCampaign(openModalAdded.id)
            .unwrap()
            .then((res) => {
                if (res?.ok) {
                    toast.success('Компания удалена')
                } else {
                    toast.error('Ошибка удаления')
                }
                setOpenModalAdded(false)
            })
            .catch((e) => {
                toast.error('Ошибка удаления')
                console.log(e)
            })
    }


    return (
        <ModalWrapper
            open={Boolean(openModalAdded)}
            onClose={() => setOpenModalAdded(false)}
            title={<DialogTitle id="alert-dialog-title">
                Удаление
            </DialogTitle>}
        >

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Вы уверены что хотите удалить компанию <br/> <b>{openModalAdded?.name}</b> ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>Отмена</Button>
                <Button color={'error'} onClick={handleRemove}>
                    Удалить
                </Button>
            </DialogActions>
        </ModalWrapper>
    );
};

export default RemoveModal;
