import React from 'react';
import ModalWrapper from "../../../../../common/modal";
import s from './styles.module.css'
import {useFormik} from "formik";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormHelperText,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import {useSetDepositMutation} from "../../../../../redux/global.service";
import {toast} from "react-toastify";


const ModalDeposit = ({open, handleClose}) => {

    const [setDeposit, {isLoading}] = useSetDepositMutation()


    const formik = useFormik({
        initialValues: {
            amount: '',

        },
        validate: (values) => {
            const errors = {}

            if (!values.amount) {
                errors.amount = 'Обязательное поле'
            } else if (+values.amount < 1) {
                errors.amount = 'Минимальная сумма 1'
            }

            return errors
        },
        onSubmit: (values) => {
            setDeposit({amount: values.amount, type: 'deposit'})
                .unwrap()
                .then((res) => {
                    if (res.ok) {
                        console.log(res)
                        handleClose()
                        window.open(res?.result?.payUrl, '_blank')

                    } else {
                        toast.error('Error')
                    }

                })
                .catch((e) => {
                    console.log(e)
                    toast.error(e?.data?.errorMessage ? e?.data?.errorMessage : 'Error')
                })
        }
    })

    return (
        <ModalWrapper
            open={open}
            onClose={handleClose}
            title={<DialogTitle id="alert-dialog-title">
                Deposit
            </DialogTitle>}
        >

            <form onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit(e)
            }} className={s.content}>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <TextField value={formik.values.amount}
                               type={'number'}
                               autoComplete={'new-password'}
                               helperText={formik.touched.amount && formik.errors.amount}
                               error={formik.touched.amount && formik.errors.amount}
                               name={'amount'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label="Amount" variant="outlined"/>

                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} type={'submit'}>Пополнить</Button>
                </DialogActions>
            </form>
        </ModalWrapper>
    );
};

export default ModalDeposit;
