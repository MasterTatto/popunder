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
import {useTranslation} from "react-i18next";
import LogoutIcon from '@mui/icons-material/Logout';
import Profile from "./profile";

export const navigateItems = [
    {
        title: 'Вебмастер', icon: <PersonIcon/>, sub_data: [
            {title: 'Площадки', icon: <PublicIcon/>, link: '/publisher/websites'},
            {title: 'Статистика', icon: <QueryStatsIcon/>, link: '/publisher/reports'},
        ]
    },
    {
        title: 'Рекламодатель', icon: <PersonSearchIcon/>, sub_data: [
            {title: 'Кампании', icon: <PublicIcon/>, link: '/advertiser/campaigns'},
            {title: 'Статистика', icon: <QueryStatsIcon/>, link: '/advertiser/reports'},
            // {title: 'Traffic Inventory', icon: <TrendingUpIcon/>, link: 'advertiser/traffic'},
        ]
    },
    {
        title: 'Финансы', icon: <PaidIcon/>, link: '/billing',
    },
    {
        title: 'Обратная связь', icon: <EmailIcon/>, redirect: true
    },
    {
        title: 'Выход', icon: <LogoutIcon/>, isLogout: true
    },
]

const Lk = () => {
    const {t} = useTranslation()

    const {lang} = useContext(LangContext)
    const {auth} = useContext(AuthContext)

    const {user} = useSelector(selectGlobal)

    if (!auth) {
        return <Navigate to={`/${lang?.toLowerCase()}`} replace/>
    }
    return (
        <div className={s.wrapper}>
            <div className={s.navigate}>
                <Profile user={user}/>
                <Divider/>
                {navigateItems?.map((item, index) => {
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
