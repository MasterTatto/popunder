import React, {useEffect} from 'react';
import ModalWrapper from "../../../../../common/modal";
import s from './styles.module.css'
import {useFormik} from "formik";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormHelperText,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import {
    useAddedCampaignMutation,
    useAddedPWebsiteMutation,
    useEditCampaignMutation
} from "../../../../../redux/global.service";
import {toast} from "react-toastify";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useTranslation} from "react-i18next";

const ModalAdded = ({openModalAdded, setOpenModalAdded}) => {
    const {t} = useTranslation()

    const [addedCampaign, {isLoading: isLoadingAdded}] = useAddedCampaignMutation()
    const [editCampaign, {isLoading: isLoadingEdit}] = useEditCampaignMutation()

    const isLoading = isLoadingAdded || isLoadingEdit

    const formik = useFormik({
        initialValues: {
            name: '',
            url: '',
            cpm: '',
            dailyBudget: '',
            totalBudget: '',
            trafficFlow: '',
            regions: [],
        },
        validate: (values) => {
            const errors = {}

            function validateResumeUrl(url) {
                // Регулярное выражение для проверки URL с указанными условиями
                const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})(\/[\w.-]*)*(\?.*)?$/;

                // Проверяем URL с помощью регулярного выражения
                return urlRegex.test(url);
            }

            if (!values.name) {
                errors.name = 'Обязательное поле'
            }
            if (!values.cpm) {
                errors.cpm = 'Обязательное поле'
            }
            if (!values.dailyBudget) {
                errors.dailyBudget = 'Обязательное поле'
            }
            if (!values.totalBudget) {
                errors.totalBudget = 'Обязательное поле'
            }
            if (!values.trafficFlow) {
                errors.trafficFlow = 'Обязательное поле'
            }
            if (!values.regions) {
                errors.regions = 'Обязательное поле'
            } else if (values.regions?.length === 0) {
                errors.regions = 'Обязательное поле'
            }

            if (!values.url) {
                errors.url = 'Обязательное поле'
            } else if (!validateResumeUrl(values?.url)) {
                errors.url = 'Невалидная ссылка';
            }
            return errors
        },
        onSubmit: (values) => {
            if (openModalAdded?.typeModal) {
                editCampaign({data: values, id: openModalAdded?.id})
                    .unwrap()
                    .then((res) => {
                        if (res?.ok) {
                            toast.success('Сохранено')
                        } else {
                            toast.error('Ошибка сохранения')
                        }
                        setOpenModalAdded(false)
                    })
                    .catch((e) => {
                        toast.error('Ошибка сохранения')
                        console.log(e)
                    })
            } else {
                addedCampaign(values)
                    .unwrap()
                    .then((res) => {
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
            }


        }
    })

    useEffect(() => {
        if (openModalAdded?.typeModal) {
            formik.setValues({
                name: openModalAdded?.name,
                url: openModalAdded?.url,
                cpm: openModalAdded?.cpm,
                dailyBudget: openModalAdded?.dailyBudget,
                totalBudget: openModalAdded?.totalBudget,
                trafficFlow: openModalAdded?.trafficFlow,
                regions: openModalAdded?.regions || [],
            })
        }
    }, [openModalAdded])
    return (
        <ModalWrapper
            open={Boolean(openModalAdded)}
            onClose={() => setOpenModalAdded(false)}
            title={<DialogTitle id="alert-dialog-title">
                {openModalAdded?.typeModal ? t('Редактировать кампанию') : t('Создать кампанию')}
            </DialogTitle>}
        >

            <form onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit(e)
            }} className={s.content}>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <TextField value={formik.values.name}
                               helperText={formik.touched.name ? formik.errors.name : ''}
                               error={Boolean(formik.touched.name && formik.errors.name)}
                               name={'name'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label={t('Имя')} variant="outlined"/>
                    <TextField value={formik.values.url}
                               helperText={formik.touched.url ? formik.errors.url : ''}
                               error={Boolean(formik.touched.url && formik.errors.url)}
                               name={'url'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label={t('Ссылка')}
                               variant="outlined"/>

                    <TextField value={formik.values.cpm}
                               type={'number'}
                               inputProps={{step: ".05", min: 0}}
                               step={0.05}
                               helperText={formik.touched.cpm ? formik.errors.cpm : ''}
                               error={Boolean(formik.touched.cpm && formik.errors.cpm)}
                               name={'cpm'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label={t("Ставка")}
                               variant="outlined"/>
                    <TextField value={formik.values.dailyBudget}
                               type={'number'}
                               inputProps={{step: "1", min: 0}}
                               step={1}
                               helperText={formik.touched.dailyBudget ? formik.errors.dailyBudget : ''}
                               error={Boolean(formik.touched.dailyBudget && formik.errors.dailyBudget)}
                               name={'dailyBudget'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label={t('Дневной бюджет')}
                               variant="outlined"/>
                    <TextField value={formik.values.totalBudget}
                               type={'number'}
                               inputProps={{step: "1", min: 0}}
                               step={1}
                               helperText={formik.touched.totalBudget ? formik.errors.totalBudget : ''}
                               error={Boolean(formik.touched.totalBudget && formik.errors.totalBudget)}
                               name={'totalBudget'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label={t("Общий бюджет")}
                               variant="outlined"/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("Способ показа")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={'trafficFlow'}
                            value={formik.values.trafficFlow}
                            error={Boolean(formik.touched.trafficFlow && formik.errors.trafficFlow)}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label={t("Способ показа")}
                        >
                            <MenuItem value={'STANDARD'}>{t("СТАНДАРТ")}</MenuItem>
                            <MenuItem value={'DISTRIBUTED'}>{t("РАСПРЕДЕЛЕННЫЕ")}</MenuItem>
                        </Select>
                        <FormHelperText
                            error={true}>{formik.touched.trafficFlow ? formik.errors.trafficFlow : ''}</FormHelperText>
                    </FormControl>


                    <TextField
                        id="demo-simple-select"
                        name={'regions'}
                        select
                        SelectProps={{
                            multiple: true,
                            value: formik.values.regions,
                            onChange: formik.handleChange,
                        }}

                        helperText={formik.touched.regions ? formik.errors.regions : ''}
                        error={Boolean(formik.touched.regions && formik.errors.regions)}
                        onBlur={formik.handleBlur}

                        label={t("Регионы")}
                    >
                        <MenuItem value={'RUSSIA'}>RUSSIA</MenuItem>
                        <MenuItem value={'POLAND'}>POLAND</MenuItem>
                        <MenuItem value={'GERMANY'}>GERMANY</MenuItem>
                        <MenuItem value={'LATVIA'}>LATVIA</MenuItem>
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading}
                            type={'submit'}>{openModalAdded?.typeModal ? t('Сохранить') : t('Добавить')}</Button>
                </DialogActions>
            </form>
        </ModalWrapper>
    );
};

export default ModalAdded;
