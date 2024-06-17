import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import Title from "../../../../common/title";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel, MenuItem,
    OutlinedInput,
    Pagination,
    Select
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from "./table";
import {useGetAReportsTableQuery} from "../../../../redux/global.service";
import _debounce from 'lodash/debounce';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {scrollToTop} from "../../../../utils/scrollToTop";

const AdvReports = () => {
    const {t} = useTranslation()

    const [filteredValue, setFilteredValue] = useState('')
    const [page, setPage] = useState(1)
    const [diapason, setDiapason] = useState('')
    const [date, setDate] = useState({
        start: null,
        end: null
    })

    const {data} = useGetAReportsTableQuery({
        domain: `/${filteredValue}/`,
        page: page,
        date: ((!date?.start && !date?.end) || !date) ? '' : `${date?.start ? (Number(moment(date?.start?.valueOf()).format('x')) + (moment(date?.start?.valueOf()).utcOffset() - 180) * 60 * 1000) : 0},${date?.end ? (Number(moment(date?.end?.valueOf()).format('x')) + (moment(date?.end?.valueOf()).utcOffset() - 180) * 60 * 1000) : 0}`
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    })

    const debouncedFilter = _debounce((value) => {
        setFilteredValue(value);
    }, 900);

    const handlerSetDate = (type) => {
        setDate({
            start:
                (type === 1 && moment().startOf('week').add(1, 'days')) ||
                (type === 2 && moment()?.subtract(1, 'days').set({hour: 0, minute: 0, second: 0, millisecond: 0})) ||
                (type === 3 && moment().startOf('month')) ||
                (type === 4 && moment()?.subtract(1, 'months').startOf('month')) ||
                (type === 6 && moment()?.subtract(1, 'weeks').startOf('week').add(1, 'days')) ||
                (type === 5 && null),
            end:
                (type === 1 && moment().endOf('week').add(1, 'days')) ||
                (type === 2 && moment()?.subtract(1, 'days').set({hour: 23, minute: 59, second: 59, millisecond: 0})) ||
                (type === 3 && moment().endOf('month')) ||
                (type === 4 && moment()?.subtract(1, 'months').endOf('month')) ||
                (type === 6 && moment()?.subtract(1, 'weeks').endOf('week').add(1, 'days')) ||
                (type === 5 && null)
        })
    }

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <div className={s.main}>
            <Title className={s.title} color={'#247ba0'} colorLine={'#247ba0'}>{t("Рекламодатель/Статистика")}</Title>

            <div className={s.navigate}>
                <div className={s.search_input}>
                    <FormControl fullWidth size={'medium'} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{t("Поиск по домену...")}</InputLabel>
                        <OutlinedInput
                            onChange={(e) => {
                                debouncedFilter(e.target.value)
                            }}
                            id="outlined-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={t("Поиск по домену...")}
                        />
                    </FormControl>
                </div>

                <div className={s.date_rang}>
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
                                    InputProps: {disableunderline: "true", placeholder: t("С")},
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
                                    InputProps: {disableunderline: "true", placeholder: t("До")},
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
                            <MenuItem value={2}>{t("Вчера")}</MenuItem>
                            <MenuItem value={1}>{t("Текущая неделя")}</MenuItem>
                            <MenuItem value={6}>{t("Прошлая неделя")}</MenuItem>
                            <MenuItem value={3}>{t("Текущий месяц")}</MenuItem>
                            <MenuItem value={4}>{t("Прошлый месяц")}</MenuItem>
                        </Select>
                    </FormControl>


                </div>
            </div>

            <div className={s.table_wrapp}>
                <Table data={data}/>
            </div>

            <div className={s.pagination}>
                <Pagination count={data?.count ? Math.ceil(data?.count / 20) : 1} page={page} onChange={(a, b) => {
                    setPage(b)
                }} shape="rounded" variant="outlined"
                            color="primary"/>
            </div>
        </div>
    );
};

export default AdvReports;
