import React, {useEffect} from 'react';
import ModalWrapper from "../../../../../common/modal";
import s from './styles.module.css'
import {useFormik} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useAddedCampaignMutation, useAddedPWebsiteMutation} from "../../../../../redux/global.service";
import {toast} from "react-toastify";
import {CopyToClipboard} from "react-copy-to-clipboard";

const ModalAdded = ({openModalAdded, setOpenModalAdded}) => {
    const [addedCampaign, {isLoading}] = useAddedCampaignMutation()

    const formik = useFormik({
        initialValues: {
            domain: ''
        },
        validate: (values) => {
            const errors = {}

            if (!values.domain) {
                errors.domain = 'Обязательное поле'
            }
            return errors
        },
        onSubmit: (values) => {
            addedCampaign(values.domain)
                .unwrap()
                .then((res) => {
                    console.log(res)
                    if (res?.ok) {
                        toast.success('Вебсайт добавлен')
                    } else {
                        toast.error('Ошибка добавления')
                    }
                    setOpenModalAdded(false)
                })
                .catch((e) => {
                    toast.error('Ошибка добавления')
                    console.log(e)
                })
            console.log('submit')
        }
    })

    return (
        <Dialog
            open={Boolean(openModalAdded)}
            onClose={() => setOpenModalAdded(false)}
            maxWidth={'xs'}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Create campaign
            </DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit(e)
            }} className={s.content}>
                <DialogContent>
                    <TextField value={formik.values.domain}
                               helperText={formik.touched.domain && formik.errors.domain}
                               error={formik.touched.domain && formik.errors.domain}
                               name={'domain'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label="Name" variant="outlined"/>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} type={'submit'}>Added</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ModalAdded;
