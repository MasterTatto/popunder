import React, {useContext, useState} from 'react';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {api} from "../../utils/api";
import {AuthContext} from "../../App";

const NavigateItem = ({item}) => {
    const {t} = useTranslation()
    const {setIsAuth} = useContext(AuthContext)

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
                navigate(link)
            } else {
                setOpen(!open);
            }
        }
    };

    return (
        <List>
            <ListItemButton selected={pathname?.includes(item?.link)}
                            onClick={() => handleClick((item?.redirect && 'redirect') || (item.isLogout && 'logout') || item?.link)}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={t(item.title)}/>
                {item.sub_data && <>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </>}
            </ListItemButton>
            {item.sub_data ?
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.sub_data?.map((sub, inx) => {
                            return <ListItemButton selected={pathname?.includes(sub?.link)} key={inx} sx={{pl: 4}}
                                                   onClick={() => handleClick(sub?.link)}>
                                <ListItemIcon>
                                    {sub.icon}
                                </ListItemIcon>
                                <ListItemText primary={t(sub?.title)}/>
                            </ListItemButton>
                        })}
                    </List>
                </Collapse>
                : null}

        </List>
    );
};

export default NavigateItem;
