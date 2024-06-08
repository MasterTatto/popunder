import React, {useState} from 'react';
import s from './styles.module.css'
import Title from "../../../../common/title";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Pagination, Select
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from "./table";
import {useGetPReportsTableQuery} from "../../../../redux/global.service";
import _debounce from 'lodash/debounce';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const PubReports = () => {
    const [filteredValue, setFilteredValue] = useState('')
    const [diapason, setDiapason] = useState('')
    const [page, setPage] = useState(1)
    const [date, setDate] = useState({
        start: null,
        end: null
    })

    const {data} = useGetPReportsTableQuery({
        domain: `/${filteredValue}/`,
        page: page,
        date: ((!date?.start && !date?.end) || !date) ? '' : `${date?.start ? date?.start?.utcOffset(+180).valueOf() : 0},${date?.end ? date?.end?.utcOffset(+180).valueOf() : 0}`
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
                (type === 1 && moment().set({hour: 0, minute: 0, second: 0, millisecond: 0})) ||
                (type === 2 && moment()?.subtract(1, 'days').set({hour: 0, minute: 0, second: 0, millisecond: 0})) ||
                (type === 3 && moment().startOf('month')) ||
                (type === 4 && moment()?.subtract(1, 'months').startOf('month')) ||
                (type === 5 && null),
            end:
                (type === 1 && moment().set({hour: 23, minute: 59, second: 59, millisecond: 0})) ||
                (type === 2 && moment()?.subtract(1, 'days').set({hour: 23, minute: 59, second: 59, millisecond: 0})) ||
                (type === 3 && moment().endOf('month')) ||
                (type === 4 && moment()?.subtract(1, 'months').endOf('month')) ||
                (type === 5 && null)
        })
    }

    return (
        <div className={s.main}>
            <Title className={s.title} color={'#247ba0'} colorLine={'#247ba0'}>Publisher/Reports</Title>

            <div className={s.navigate}>
                <div className={s.search_input}>
                    <FormControl fullWidth size={'medium'} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Search by domain...</InputLabel>
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
                            label="Search by domain..."
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
                                        sx={{width: '100%'}} ampm={false}
                                        format="DD.MM.YYYY" slotProps={{
                                textField: {
                                    variant: "outlined",
                                    InputProps: {disableUnderline: true, placeholder: 'Начало'},
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
                                        ampm={false}
                                        format="DD.MM.YYYY" slotProps={{
                                textField: {
                                    variant: "outlined",
                                    InputProps: {disableUnderline: true, placeholder: 'Конец'},
                                },
                            }}/>
                        </LocalizationProvider>
                    </div>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Диапазон</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={diapason}
                            label="Диапазон"
                            onChange={(e) => {
                                handlerSetDate(+e.target.value)
                                setDiapason(+e.target.value)
                            }}
                        >
                            <MenuItem value={5}>За все время</MenuItem>
                            <MenuItem value={1}>За сегодня</MenuItem>
                            <MenuItem value={2}>За вчера</MenuItem>
                            <MenuItem value={3}>За текущий месяц</MenuItem>
                            <MenuItem value={4}>За прошлый месяц</MenuItem>
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

export default PubReports;
