import React, {useContext, useState} from 'react';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {api} from "../../utils/api";
import {AuthContext, LangContext} from "../../App";

const NavigateItem = ({item}) => {
    const {t} = useTranslation()
    const {setIsAuth} = useContext(AuthContext)

    const {lang} = useContext(LangContext)

    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [open, setOpen] = useState(true);

    const logout = async () => {
        try {
            const res = await api().get('api/site/logout')
            setIsAuth(false)

        } catch (e) {
            console.log(e)
        }
    }

    const handleClick = (link) => {
        if (link === 'redirect') {
            const link = document.createElement('a')
            link.href = 'https://t.me/clickunder_bot?start=support'
            link.setAttribute('target', '_blank')
            document.body.appendChild(link)
            link.click()
            link.remove()
        } else if (link === 'logout') {
            logout()
        } else {
            if (link) {
                navigate(`/${lang?.toLowerCase()}/lk${link}`)
            } else {
                setOpen(!open);
            }
        }
    };

    return (
        <List>
            <ListItemButton selected={pathname?.includes(item?.link)}
                            onClick={(e) => {
                                handleClick((item?.redirect && 'redirect') || (item.isLogout && 'logout') || item?.link)
                                if (item.sub_data) {
                                    e.stopPropagation()
                                }
                            }}>
                <ListItemIcon sx={{
                    // '@media (max-width: 780px)': {
                    //     color: '#fff'
                    // }
                }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    sx={{
                        // '@media (max-width: 780px)': {
                        //     color: '#fff'
                        // }
                    }}
                    primary={t(item.title)}/>
                {item.sub_data && <>
                    {open ? <ExpandLess sx={{
                        // '@media (max-width: 780px)': {
                        //     color: '#fff'
                        // }
                    }}/> : <ExpandMore sx={{
                        // '@media (max-width: 780px)': {
                        //     color: '#fff'
                        // }
                    }}/>}
                </>}
            </ListItemButton>
            {item.sub_data ?
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List sx={{
                        // '@media (max-width: 780px)': {
                        //     color: '#fff'
                        // }
                    }} component="div" disablePadding>
                        {item.sub_data?.map((sub, inx) => {
                            return <ListItemButton selected={pathname?.includes(sub?.link)} key={inx} sx={{pl: 4}}
                                                   onClick={() => handleClick(sub?.link)}>
                                <ListItemIcon sx={{
                                    // '@media (max-width: 780px)': {
                                    //     color: '#fff'
                                    // }
                                }}>
                                    {sub.icon}
                                </ListItemIcon>
                                <ListItemText sx={{
                                    // '@media (max-width: 780px)': {
                                    //     color: '#fff'
                                    // }
                                }} primary={t(sub?.title)}/>
                            </ListItemButton>
                        })}
                    </List>
                </Collapse>
                : null}

        </List>
    );
};

export default NavigateItem;
