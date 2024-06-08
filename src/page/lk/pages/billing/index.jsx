import React, {useState} from 'react';
import s from './styles.module.css'
import Title from "../../../../common/title";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import Table from "./table";
import ModalDeposit from "./modalDeposit";
import {useGetTablePaymentsQuery} from "../../../../redux/global.service";
import ModalPayout from "./modalPayout";
import moment from "moment/moment";

const Billing = () => {
    const [openDeposit, setOpenDeposit] = useState(false)
    const [openPayout, setOpenPayout] = useState(false)

    const [page, setPage] = useState(1)
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
        date: ((!date?.start && !date?.end) || !date) ? '' : `${date?.start ? date?.start?.utcOffset(+180)?.valueOf() : 0},${date?.end ? date?.end?.utcOffset(+180)?.valueOf() : 0}`
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
                (type === 5 && null),
            end:
                (type === 1 && moment().set({hour: 23, minute: 59, second: 59, millisecond: 0})) ||
                (type === 2 && moment()?.subtract(1, 'days').set({hour: 23, minute: 59, second: 59, millisecond: 0})) ||
                (type === 3 && moment().endOf('month')) ||
                (type === 4 && moment()?.subtract(1, 'months').endOf('month')) ||
                (type === 5 && null)
        })
    }

    console.log(data)
    return (
        <div className={s.main}>

            {openDeposit && <ModalDeposit open={openDeposit} handleClose={() => setOpenDeposit(false)}/>}
            {openPayout && <ModalPayout open={openPayout} handleClose={() => setOpenPayout(false)}/>}

            <Title className={s.title} color={'#247ba0'} widthLine={'70px'} colorLine={'#247ba0'}>Billing</Title>

            <div className={s.navigate}>
                <div className={s.search_input}>
                    <Button onClick={() => setOpenDeposit(true)} sx={{
                        height: '56px', width: '100%',
                        background: '#247ba0', color: '#fff',
                        '&:hover': {
                            background: 'rgba(36, 123, 160, 0.8)'
                        },

                    }}
                    >
                        Deposit
                    </Button>
                    <Button onClick={() => setOpenPayout(true)} sx={{
                        height: '56px', width: '100%',
                        background: '#247ba0', color: '#fff',
                        '&:hover': {
                            background: 'rgba(36, 123, 160, 0.8)'
                        },

                    }}
                    >
                        Payout
                    </Button>
                </div>

                <div className={s.date_rang}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={(e) => {
                                // handlerSetDate(+e.target.value)
                                setStatus(e.target.value)
                            }}
                        >
                            <MenuItem value={''}>All status</MenuItem>
                            <MenuItem value={'created'}>Created</MenuItem>
                            <MenuItem value={'completed'}>Completed</MenuItem>
                            <MenuItem value={'rejected'}>Rejected</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={(e) => {
                                // handlerSetDate(+e.target.value)
                                setType(e.target.value)
                            }}
                        >
                            <MenuItem value={''}>All type</MenuItem>
                            <MenuItem value={'deposit'}>Deposit</MenuItem>
                            <MenuItem value={'payout'}>Payout</MenuItem>
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
                <Pagination
                    count={data?.count ? Math.ceil(data?.count / 20) : 1} page={page}
                    onChange={(a, b) => {
                        setPage(b)
                    }}
                    shape="rounded" variant="outlined"
                    color="primary"/>
            </div>
        </div>
    );
};

export default Billing;