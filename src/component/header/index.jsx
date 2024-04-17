import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import Container from "../container";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useTranslation} from "react-i18next";

const Header = () => {
    const {t, i18n} = useTranslation()

    const [selectedLink, setSelectedLink] = useState(1);
    const lineRef = useRef(null);
    const [lineWidth, setLineWidth] = useState(0);
    const [visibleLang, setVisibleLang] = useState(false)
    const [lang, setLang] = useState('RU')
    const [openMenu, setOpenMenu] = useState(false)

    const handleNavLinkClick = (index) => {
        setSelectedLink(index);
    };

    const getNavLinkWidth = (index) => {
        const navLink = document.querySelector(`.navLink${index}`);
        return navLink?.offsetWidth;
    };

    const getOffset = (index) => {
        let offset = 0;
        for (let i = 1; i < index; i++) {
            offset += getNavLinkWidth(i);
        }
        return offset;
    };

    const moveLine = () => {
        const offset = getOffset(selectedLink);
        lineRef.current.style.transform = `translateX(${offset}px)`;
        setLineWidth(getNavLinkWidth(selectedLink));
    };

    const handlerLanguage = (lang) => {
        localStorage.setItem('lang', lang)
        return i18n.changeLanguage(lang)
    }

    useEffect(() => {
        moveLine();
    }, [selectedLink, lang]);

    useEffect(() => {
        const langLoc = localStorage.getItem('lang') || 'ru'
        setLang(langLoc?.toUpperCase())
    }, [])
    return (
        <div className={s.header}>
            <SwipeableDrawer
                anchor={'right'}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                onOpen={() => setOpenMenu(true)}
            >
                <Box
                    sx={{width: 250, background: '#252525', height: '100%'}}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(true)}
                >
                    <List>
                        {['Главная', 'Новости', 'FAQ', 'Правила', 'Обратная связь', 'Вход'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{borderBottom: '1px solid #fff'}}>
                                <ListItemButton>
                                    <ListItemText primary={t(text)} sx={{color: '#fff'}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </SwipeableDrawer>

            <Container>
                <div className={s.content}>
                    <div className={s.logo}/>

                    <div className={s.navigate}>
                        <div className={s.navigate_link}>
                            <div ref={lineRef} className={s.line} style={{width: lineWidth}}/>
                            <NavLink onClick={() => handleNavLinkClick(1)}
                                     className={classNames('navLink1', selectedLink === 1 && s.active)}
                                     to="/">{t('Главная')}</NavLink>
                            <NavLink onClick={() => handleNavLinkClick(2)}
                                     className={classNames('navLink2', selectedLink === 2 && s.active)}
                                     to="/">{t('Новости')}</NavLink>
                            <NavLink onClick={() => handleNavLinkClick(3)}
                                     className={classNames('navLink3', selectedLink === 3 && s.active)}
                                     to="/">FAQ</NavLink>
                            <NavLink onClick={() => handleNavLinkClick(4)}
                                     className={classNames('navLink4', selectedLink === 4 && s.active)}
                                     to="/">{t('Правила')}</NavLink>
                            <NavLink onClick={() => handleNavLinkClick(5)}
                                     className={classNames('navLink5', selectedLink === 5 && s.active)}
                                     to="/">{t('Обратная связь')}</NavLink>
                        </div>
                        <div className={s.navigate_auth}>
                            <NavLink to={'/'}>{t('Вход')}</NavLink>
                            <div className={s.lang}>
                                <div className={s.ru} onClick={() => setVisibleLang(!visibleLang)}>
                                    {lang === 'RU' ? 'RU' : "EN"}
                                </div>
                                <div className={classNames(s.en, visibleLang && s.en_active)}
                                     onClick={async () => {
                                         await handlerLanguage(lang !== 'RU' ? 'ru' : "en")
                                         setVisibleLang(!visibleLang)
                                         setLang(lang !== 'RU' ? 'RU' : "EN")

                                     }}
                                     style={{top: visibleLang ? '60px' : 0}}
                                >
                                    {lang !== 'RU' ? 'RU' : "EN"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={s.mobile_navigate}>
                        <IconButton onClick={() => setOpenMenu(true)}>
                            <MenuIcon sx={{color: '#fff'}}/>
                        </IconButton>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;