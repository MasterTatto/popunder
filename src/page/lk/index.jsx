import React, {useContext} from 'react';
import s from './styles.module.css'
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext, LangContext} from "../../App";
import StarBorder from '@mui/icons-material/StarBorder';
import {Avatar, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaidIcon from '@mui/icons-material/Paid';
import EmailIcon from '@mui/icons-material/Email';
import NavigateItem from "./navigate";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/global.slice";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

const navigate = [
    {
        title: 'Publisher', icon: <PersonIcon/>, sub_data: [
            {title: 'Websites', icon: <PublicIcon/>, link: 'publisher/websites'},
            {title: 'Reports', icon: <QueryStatsIcon/>, link: 'publisher/reports'},
        ]
    },
    {
        title: 'Advertiser', icon: <PersonSearchIcon/>, sub_data: [
            {title: 'Campaigns', icon: <PublicIcon/>, link: 'advertiser/campaigns'},
            {title: 'Reports', icon: <QueryStatsIcon/>, link: 'advertiser/reports'},
            // {title: 'Traffic Inventory', icon: <TrendingUpIcon/>, link: 'advertiser/traffic'},
        ]
    },
    {
        title: 'Billing', icon: <PaidIcon/>, link: 'billing',
    },
    {
        title: 'Contract', icon: <EmailIcon/>, redirect: true
    },
]

const Lk = () => {
    const {lang} = useContext(LangContext)
    const {auth} = useContext(AuthContext)

    const {user} = useSelector(selectGlobal)
    console.log(user)
    if (!auth) {
        return <Navigate to={`/${lang?.toLowerCase()}`} replace/>
    }
    return (
        <div className={s.wrapper}>
            <div className={s.navigate}>
                <div className={s.navigate_info}>
                    <Avatar src={user?.user?.photo} sx={{height: '50px', width: '50px'}}/>
                    <div className={s.navigate_desc}>

                        <p className={s.name}>{user?.user?.name || 'Incognito'}</p>
                        <p className={s.uid}>
                            id: {user?.user?.chatId || 'none'}
                        </p>
                        <p className={s.uid}>
                            Balance: {(user?.user?.balance || 0).toFixed(2) || '0'}$
                        </p>
                    </div>
                </div>
                <Divider/>
                {navigate?.map((item, index) => {
                    return <NavigateItem item={item} key={index}/>
                })}
            </div>

            <div className={s.content}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Lk;
