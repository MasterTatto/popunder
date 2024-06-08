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

const ModalAdded = ({openModalAdded, setOpenModalAdded}) => {
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
                        console.log(res)
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
            }


        }
    })
    console.log(openModalAdded)
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
                {openModalAdded?.typeModal ? 'Edit campaign' : 'Create campaign'}
            </DialogTitle>}
        >

            <form onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit(e)
            }} className={s.content}>
                <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <TextField value={formik.values.name}
                               helperText={formik.touched.name && formik.errors.name}
                               error={formik.touched.name && formik.errors.name}
                               name={'name'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label="Name" variant="outlined"/>
                    <TextField value={formik.values.url}
                               helperText={formik.touched.url && formik.errors.url}
                               error={formik.touched.url && formik.errors.url}
                               name={'url'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label="Url" variant="outlined"/>

                    <TextField value={formik.values.cpm}
                               type={'number'}
                               inputProps={{step: ".05", min: 0}}
                               step={0.05}
                               helperText={formik.touched.cpm && formik.errors.cpm}
                               error={formik.touched.cpm && formik.errors.cpm}
                               name={'cpm'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label="Cpm" variant="outlined"/>
                    <TextField value={formik.values.dailyBudget}
                               type={'number'}
                               inputProps={{step: "1", min: 0}}
                               step={1}
                               helperText={formik.touched.dailyBudget && formik.errors.dailyBudget}
                               error={formik.touched.dailyBudget && formik.errors.dailyBudget}
                               name={'dailyBudget'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label="dailyBudget"
                               variant="outlined"/>
                    <TextField value={formik.values.totalBudget}
                               type={'number'}
                               inputProps={{step: "1", min: 0}}
                               step={1}
                               helperText={formik.touched.totalBudget && formik.errors.totalBudget}
                               error={formik.touched.totalBudget && formik.errors.totalBudget}
                               name={'totalBudget'} onBlur={formik.handleBlur}
                               sx={{width: '100%'}}
                               onChange={formik.handleChange} id="outlined-basic" label="totalBudget"
                               variant="outlined"/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">trafficFlow</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={'trafficFlow'}
                            value={formik.values.trafficFlow}
                            helperText={formik.touched.trafficFlow && formik.errors.trafficFlow}
                            error={formik.touched.trafficFlow && formik.errors.trafficFlow}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            label="trafficFlow"
                        >
                            <MenuItem value={'STANDARD'}>STANDARD</MenuItem>
                            <MenuItem value={'DISTRIBUTED'}>DISTRIBUTED</MenuItem>
                        </Select>
                        <FormHelperText
                            error={true}>{formik.touched.trafficFlow && formik.errors.trafficFlow}</FormHelperText>
                    </FormControl>


                    <TextField
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name={'regions'}
                        select
                        SelectProps={{
                            multiple: true,
                            value: formik.values.regions,
                            onChange: formik.handleChange,
                        }}

                        helperText={formik.touched.regions && formik.errors.regions}
                        error={formik.touched.regions && formik.errors.regions}
                        onBlur={formik.handleBlur}

                        label="regions"
                    >
                        <MenuItem value={'RUSSIA'}>RUSSIA</MenuItem>
                        <MenuItem value={'POLAND'}>POLAND</MenuItem>
                        <MenuItem value={'GERMANY'}>GERMANY</MenuItem>
                        <MenuItem value={'LATVIA'}>LATVIA</MenuItem>
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} type={'submit'}>{openModalAdded?.typeModal ? 'Save' : 'Added'}</Button>
                </DialogActions>
            </form>
        </ModalWrapper>
    );
};

export default ModalAdded;
