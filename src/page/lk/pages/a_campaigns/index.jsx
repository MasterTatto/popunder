import React, {useState} from 'react';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from "./table";
import {useGetCampaignsTableQuery} from "../../../../redux/global.service";
import ModalAdded from "./modal";

const AdvCampaigns = () => {
    const [openModalAdded, setOpenModalAdded] = useState(false)
    const [filteredValue, setFilteredValue] = useState('all')
    const [page, setPage] = useState(1)

    const {data} = useGetCampaignsTableQuery({
        status: filteredValue,
        page: page
    }, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    })

    return (
        <div className={s.main}>
            {openModalAdded && <ModalAdded openModalAdded={openModalAdded} setOpenModalAdded={setOpenModalAdded}/>}
            <Title className={s.title} color={'#247ba0'} colorLine={'#247ba0'}>Advertiser/Campaigns</Title>

            <div className={s.navigate}>
                <div className={s.search_input}>
                    <FormControl fullWidth size={'medium'} variant="outlined">
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filteredValue}
                            label="Status"
                            onChange={(e) => setFilteredValue(e.target.value)}
                        >
                            <MenuItem value={'all'}>ALL</MenuItem>
                            <MenuItem value={'REJECTED'}>REJECTED</MenuItem>
                            <MenuItem value={'PAUSED'}>PAUSED</MenuItem>
                            <MenuItem value={'RUNNING'}>RUNNING</MenuItem>
                            <MenuItem value={'MODERATION'}>MODERATION</MenuItem>
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
                        Create Campaign
                    </Button>
                </div>
            </div>

            <div className={s.table_wrapp}>
                <Table data={data} openEditModal={setOpenModalAdded}/>
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

export default AdvCampaigns;
