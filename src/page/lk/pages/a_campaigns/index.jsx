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
    Select, useMediaQuery
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from "./table";
import {useGetCampaignsTableQuery} from "../../../../redux/global.service";
import ModalAdded from "./modal";
import {useTranslation} from "react-i18next";
import {scrollToTop} from "../../../../utils/scrollToTop";
import PaginationSize from "../../../../common/paginationSize";

const AdvCampaigns = () => {
    const {t} = useTranslation()
    const matches = useMediaQuery('(max-width:768px)');
    const [openModalAdded, setOpenModalAdded] = useState(false)
    const [filteredValue, setFilteredValue] = useState('all')
    const [page, setPage] = useState({
        page: 1,
        size: 20
    })
    const {data} = useGetCampaignsTableQuery({
        status: filteredValue,
        page: page
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <div className={s.main}>
            {openModalAdded && <ModalAdded openModalAdded={openModalAdded} setOpenModalAdded={setOpenModalAdded}/>}
            <Title className={s.title} color={'#247ba0'} colorLine={'#247ba0'}>{t("Рекламодатель/Кампании")}</Title>

            <div className={s.navigate}>
                <div className={s.search_input}>
                    <FormControl fullWidth size={'medium'} variant="outlined">
                        <InputLabel id="demo-simple-select-label">{t('Статус')}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filteredValue}
                            label={t('Статус')}
                            onChange={(e) => setFilteredValue(e.target.value)}
                        >
                            <MenuItem value={'all'}>{t('Все статусы')}</MenuItem>
                            <MenuItem value={'REJECTED'}>{t('Отклонено')}</MenuItem>
                            <MenuItem value={'PAUSED'}>{t('Остановлено')}</MenuItem>
                            <MenuItem value={'RUNNING'}>{t('Запущено')}</MenuItem>
                            <MenuItem value={'MODERATION'}>{t('На модерации')}</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className={s.button}>
                    <Button onClick={() => setOpenModalAdded(true)} sx={{
                        height: '56px', padding: '0 14px 0 0',
                        background: '#247ba0', color: '#fff',
                        '&:hover': {
                            background: 'rgba(36, 123, 160, 0.8)'
                        },

                    }}
                            startIcon={
                                <div className={s.btn}>
                                    <AddCircleIcon/>
                                </div>
                            }>
                        {t("Создать кампанию")}
                    </Button>
                </div>
            </div>

            <div className={s.table_wrapp}>
                <Table data={data} openEditModal={setOpenModalAdded}/>
            </div>

            <div className={s.pagination}>
                <PaginationSize value={page?.size} handleChange={(e) => {
                    setPage({...page, page: 1, size: +e.target.value})
                }}/>
                <Pagination size={matches ? 'small' : 'medium'} count={data?.count ? Math.ceil(data?.count / page?.size) : 1} page={page?.page}
                            onChange={(a, b) => {
                                setPage({...page, page: b})
                            }} shape="rounded" variant="outlined"
                            color="primary"/>
            </div>
        </div>
    );
};

export default AdvCampaigns;
