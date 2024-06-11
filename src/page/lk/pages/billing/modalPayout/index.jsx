import React from 'react';
import ModalWrapper from "../../../../../common/modal";
import s from './styles.module.css'
import {useFormik} from "formik";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useGetProfileMutation, useSetDepositMutation} from "../../../../../redux/global.service";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";


const ModalPayout = ({open, handleClose}) => {
    const [getProfile, {isLoading: isLoadingProfile}] = useGetProfileMutation()
    const [setDeposit, {isLoading}] = useSetDepositMutation()
    const {t} = useTranslation()

    const formik = useFormik({
        initialValues: {
            amount: '',
            wallet: '',

        },
        validate: (values) => {
            const errors = {}

            if (!values.amount) {
                errors.amount = t('Обязательное поле')
            } else if (+values.amount < 1) {
                errors.amount = t('Минимальная сумма 1')
            }

            if (!values.wallet) {
                errors.wallet = t('Обязательное поле')
            }

            return errors
        },
        onSubmit: (values) => {
            setDeposit({amount: values.amount, wallet: values.wallet, type: 'payout'})
                .unwrap()
                .then((res) => {
                    if (res.ok) {
                        getProfile()
                            .unwrap()
                            .then((res) => {
                                handleClose()
                                toast.success(t('Запрос на вывод средств создан.'))
                            })
                            .catch((e) => {
                                console.log(e)

                            })

                    } else {
                        toast.error(res?.errorMessage ? res?.errorMessage : 'Error')
                    }
                    console.log(res)
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
                {t("Вывод")}
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
                               onChange={formik.handleChange} id="outlined-basic" label={t("Сумма")}
                               variant="outlined"/>
                    <TextField value={formik.values.wallet}
                               autoComplete={'new-password'}
                               helperText={formik.touched.wallet && formik.errors.wallet}
                               error={formik.touched.wallet && formik.errors.wallet}
                               name={'wallet'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label={t("Кошелек")}
                               variant="outlined"/>

                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading || isLoadingProfile} type={'submit'}>{t("Вывести")}</Button>
                </DialogActions>
            </form>
        </ModalWrapper>
    );
};

export default ModalPayout;
