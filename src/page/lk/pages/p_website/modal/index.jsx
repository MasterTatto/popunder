import React, {useEffect} from 'react';
import ModalWrapper from "../../../../../common/modal";
import s from './styles.module.css'
import {useFormik} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useAddedPWebsiteMutation} from "../../../../../redux/global.service";
import {toast} from "react-toastify";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useTranslation} from "react-i18next";

const ModalAdded = ({openModalAdded, setOpenModalAdded}) => {
    const {t} = useTranslation()

    const [addedPWebsite, {isLoading}] = useAddedPWebsiteMutation()

    const formik = useFormik({
        initialValues: {
            domain: ''
        },
        validate: (values) => {
            const errors = {}

            function validateResumeUrl(url) {
                // Регулярное выражение для проверки URL с указанными условиями
                const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})(\/[\w.-]*)*(\?.*)?$/;

                // Проверяем URL с помощью регулярного выражения
                return urlRegex.test(url);
            }

            if (!values.domain) {
                errors.domain = t('Обязательное поле')
            } else if (!validateResumeUrl(values?.domain)) {
                errors.domain = t('Невалидная ссылка');
            }
            return errors
        },
        onSubmit: (values) => {
            addedPWebsite(values.domain)
                .unwrap()
                .then((res) => {
                    console.log(res)
                    if (res?.ok) {
                        toast.success(t('Вебсайт добавлен'))
                    } else {
                        toast.error(t('Ошибка добавления'))
                    }
                    setOpenModalAdded(false)
                })
                .catch((e) => {
                    toast.error(t('Ошибка добавления'))
                    console.log(e)
                })
            console.log('submit')
        }
    })

    return (
        <ModalWrapper
            open={Boolean(openModalAdded)}
            onClose={() => setOpenModalAdded(false)}
            title={<DialogTitle id="alert-dialog-title">
                {t("Добавить площадку")}
            </DialogTitle>}
        >

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
                               onChange={formik.handleChange} id="outlined-basic" label={t("Домен сайта")}
                               variant="outlined"/>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} type={'submit'}>{t('Сохранить')}</Button>
                </DialogActions>
            </form>
        </ModalWrapper>
    );
};

export default ModalAdded;
