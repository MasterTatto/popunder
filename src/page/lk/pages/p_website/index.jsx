import React, {useEffect, useState} from 'react';
import s from './styles.module.css'
import Title from "../../../../common/title";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Pagination,
    useMediaQuery
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from "./table";
import {useGetPWebsiteTableQuery} from "../../../../redux/global.service";
import ModalAdded from "./modal";
import _debounce from 'lodash/debounce';
import {useTranslation} from "react-i18next";
import {scrollToTop} from "../../../../utils/scrollToTop";
import PaginationSize from "../../../../common/paginationSize";

const PubWebsite = () => {
    const {t} = useTranslation()
    const matches = useMediaQuery('(max-width:768px)');
    const [openModalAdded, setOpenModalAdded] = useState(false)
    const [filteredValue, setFilteredValue] = useState('')
    const [sort, setSort] = useState(null)
    const [page, setPage] = useState({
        page: 1,
        size: 20
    })

    const {data} = useGetPWebsiteTableQuery({
        domain: `/${filteredValue}/`,
        page: page,
        sort: sort
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    })

    const debouncedFilter = _debounce((value) => {
        setFilteredValue(value);
    }, 900);

    useEffect(() => {
        scrollToTop()
    }, [])
    return (
        <div className={s.main}>
            {openModalAdded && <ModalAdded openModalAdded={openModalAdded} setOpenModalAdded={setOpenModalAdded}/>}
            <Title className={s.title} color={'#247ba0'} colorLine={'#247ba0'}>{t("Вебмастер/Площадки")}</Title>

            <div className={s.navigate}>
                <div className={s.search_input}>
                    <FormControl fullWidth size={'medium'} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{t('Поиск по домену...')}</InputLabel>
                        <OutlinedInput
                            onChange={(e) => {
                                debouncedFilter(e.target.value)
                            }}
                            id="outlined-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={t('Поиск по домену')}
                        />
                    </FormControl>
                </div>

                <div className={s.button}>
                    <Button onClick={() => setOpenModalAdded(true)} sx={{
                        height: '56px', padding: '0 14px 0 0',
                        background: '#247ba0', color: '#fff',
                        '&:hover': {
                            background: 'rgba(36, 123, 160, 0.8)'
                        },
                        '&:hover .btn': {
                            background: 'rgba(36, 123, 160, 0.8) !important'
                        },

                    }}
                            startIcon={
                                <div className={s.btn}>
                                    <AddCircleIcon/>
                                </div>
                            }>
                        {t("Добавить площадку")}
                    </Button>
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

export default PubWebsite;
