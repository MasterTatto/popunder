import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import Title from "../../../../common/title";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select, useMediaQuery
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import Table from "./table";
import ModalDeposit from "./modalDeposit";
import {useGetTablePaymentsQuery} from "../../../../redux/global.service";
import ModalPayout from "./modalPayout";
import moment from "moment/moment";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../../../redux/slice/global.slice";
import {scrollToTop} from "../../../../utils/scrollToTop";
import PaginationSize from "../../../../common/paginationSize";

const Billing = () => {
    const {t} = useTranslation()
    const matches = useMediaQuery('(max-width:768px)');
    const {user} = useSelector(selectGlobal)
    const [sort, setSort] = useState(null)
    const [openDeposit, setOpenDeposit] = useState(false)
    const [openPayout, setOpenPayout] = useState(false)

    const [page, setPage] = useState({
        page: 1,
        size: 20
    })
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [date, setDate] = useState({
        start: null,
        end: null
    })
    const [diapason, setDiapason] = useState('')

    const {data, isLoading} = useGetTablePaymentsQuery({
        page: page,
        type: type,
        status: status,
        sort: sort,
        date: ((!date?.start && !date?.end) || !date) ? '' : `${date?.start ? (Number(moment(date?.start?.valueOf()).format('x')) + (moment(date?.start?.valueOf()).utcOffset() - 180) * 60 * 1000) : 0},${date?.end ? (Number(moment(date?.end?.valueOf()).format('x')) + (moment(date?.end?.valueOf()).utcOffset() - 180) * 60 * 1000) : 0}`
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    })

    const handlerSetDate = (type) => {
        setDate({
            start:
                (type === 1 && moment().set({hour: 0, minute: 0, second: 0, millisecond: 0})) ||
                (type === 2 && moment()?.subtract(1, 'days').set({hour: 0, minute: 0, second: 0, millisecond: 0})) ||
                (type === 3 && moment().startOf('month')) ||
                (type === 4 && moment()?.subtract(1, 'months').startOf('month')) ||
                (type === 6 && moment()?.subtract(1, 'weeks').startOf('week').add(1, 'days')) ||
                (type === 7 && moment().startOf('week').add(1, 'days')) ||
                (type === 5 && null),
            end:
                (type === 1 && moment().set({hour: 23, minute: 59, second: 59, millisecond: 0})) ||
                (type === 2 && moment()?.subtract(1, 'days').set({hour: 23, minute: 59, second: 59, millisecond: 0})) ||
                (type === 3 && moment().endOf('month')) ||
                (type === 4 && moment()?.subtract(1, 'months').endOf('month')) ||
                (type === 6 && moment()?.subtract(1, 'weeks').endOf('week').add(1, 'days')) ||
                (type === 7 && moment().endOf('week').add(1, 'days')) ||
                (type === 5 && null)
        })
    }

    useEffect(() => {
        scrollToTop()
    }, [])
    return (
        <div className={s.main}>

            {openDeposit && <ModalDeposit open={openDeposit} handleClose={() => setOpenDeposit(false)}/>}
            {openPayout && <ModalPayout open={openPayout} handleClose={() => setOpenPayout(false)}/>}

            <Title className={s.title} color={'#247ba0'} widthLine={'70px'} colorLine={'#247ba0'}>{t("Финансы")}</Title>

            <div className={s.navigate}>
                <p className={s.balance}>{t("Ваш баланс")}: {(user?.user?.balance || 0).toFixed(2) || '0'} USD</p>
                <div className={s.search_input}>
                    <Button onClick={() => setOpenDeposit(true)} sx={{
                        height: '56px', width: '100%',
                        background: '#247ba0', color: '#fff',
                        '&:hover': {
                            background: 'rgba(36, 123, 160, 0.8)'
                        },

                    }}
                    >
                        {t("Пополнить")}
                    </Button>
                    <Button onClick={() => setOpenPayout(true)} sx={{
                        height: '56px', width: '100%',
                        background: '#247ba0', color: '#fff',
                        '&:hover': {
                            background: 'rgba(36, 123, 160, 0.8)'
                        },

                    }}
                    >
                        {t("Вывести")}
                    </Button>
                </div>

                <div className={s.date_rang}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("Тип")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label={t("Тип")}
                            onChange={(e) => {
                                // handlerSetDate(+e.target.value)
                                setType(e.target.value)
                            }}
                        >
                            <MenuItem value={''}>{t("Все типы")}</MenuItem>
                            <MenuItem value={'deposit'}>{t("Пополнение")}</MenuItem>
                            <MenuItem value={'payout'}>{t("Выплата")}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("Статус")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label={t("Статус")}
                            onChange={(e) => {
                                // handlerSetDate(+e.target.value)
                                setStatus(e.target.value)
                            }}
                        >
                            <MenuItem value={''}>{t("Все статусы")}</MenuItem>
                            <MenuItem value={'created'}>{t("Создано")}</MenuItem>
                            <MenuItem value={'completed'}>{t("Успешно")}</MenuItem>
                            <MenuItem value={'rejected'}>{t("Отклонено")}</MenuItem>
                        </Select>
                    </FormControl>

                    <div className={s.date_rang_date}>
                        <LocalizationProvider sx={{border: '1px solid red'}} localeText={{
                            'okButtonLabel': 'ОК',
                            'cancelButtonLabel': 'Отмена',
                            'clearButtonLabel': 'Отмена',
                        }} dateAdapter={AdapterMoment} adapterLocale={'de'}>
                            <DatePicker value={date?.start} onChange={(e) => {
                                setDate({end: date?.end, start: e})
                                if (diapason) {
                                    setDiapason('')
                                }
                            }}
                                        sx={{width: '100%'}} ampm={"false"}
                                        format="DD.MM.YYYY" slotProps={{
                                textField: {
                                    variant: "outlined",
                                    InputProps: {disableunderline: "true", placeholder: t('С')},
                                },
                            }}/>
                        </LocalizationProvider>
                        <p>-</p>
                        <LocalizationProvider sx={{border: '1px solid red'}} localeText={{
                            'okButtonLabel': 'ОК',
                            'cancelButtonLabel': 'Отмена',
                            'clearButtonLabel': 'Отмена',
                        }} dateAdapter={AdapterMoment} adapterLocale={'de'}>
                            <DatePicker value={date?.end} onChange={(e) => {
                                setDate({start: date?.start, end: e})
                                if (diapason) {
                                    setDiapason('')
                                }
                            }}
                                        sx={{width: '100%'}}
                                        ampm={"false"}
                                        format="DD.MM.YYYY" slotProps={{
                                textField: {
                                    variant: "outlined",
                                    InputProps: {disableunderline: "true", placeholder: t('До')},
                                },
                            }}/>
                        </LocalizationProvider>
                    </div>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{t("Диапазон дат")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={diapason}
                            label={t("Диапазон дат")}
                            onChange={(e) => {
                                handlerSetDate(+e.target.value)
                                setDiapason(+e.target.value)
                            }}
                        >
                            <MenuItem value={5}>{t("Все время")}</MenuItem>
                            <MenuItem value={1}>{t("Сегодня")}</MenuItem>
                            <MenuItem value={2}>{t("Вчера")}</MenuItem>
                            <MenuItem value={7}>{t("Текущая неделя")}</MenuItem>
                            <MenuItem value={6}>{t("Прошлая неделя")}</MenuItem>
                            <MenuItem value={3}>{t("Текущий месяц")}</MenuItem>
                            <MenuItem value={4}>{t("Прошлый месяц")}</MenuItem>
                        </Select>
                    </FormControl>

                </div>

            </div>

            <div className={s.table_wrapp}>
                <Table data={data} setSort={setSort}/>
            </div>

            <div className={s.pagination}>
                <PaginationSize value={page?.size} handleChange={(e) => {
                    setPage({...page, page: 1, size: +e.target.value})
                }}/>
                <Pagination size={matches ? 'small' : 'medium'}
                            count={data?.count ? Math.ceil(data?.count / page?.size) : 1} page={page?.page}
                            onChange={(a, b) => {
                                setPage({...page, page: b})
                            }} shape="rounded" variant="outlined"
                            color="primary"/>
            </div>
        </div>
    );
};

export default Billing;