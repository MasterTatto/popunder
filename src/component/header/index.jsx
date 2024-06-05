import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import Container from "../container";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
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
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import {useTranslation} from "react-i18next";
import {scrollToTop} from "../../utils/scrollToTop";
import {AuthContext, LangContext} from "../../App";
import AuthButton from "../../common/auth_button";
import moment from "moment/moment";
import TelegramLoginButton from "telegram-login-button";
import {api} from "../../utils/api";
import {useGetProfileMutation} from "../../redux/global.service";

const path = {
    '/': 1,
    '/news': 2,
    '/faq': 3,
    '/faq/publisher': 3,
    '/faq/advertiser': 3,
    '/rules': 4,
    '/rules/publisher': 4,
    '/rules/advertiser': 4,
    '/lk': 5,
    '/lk/billing': 5,
    '/lk/publisher/websites': 5,
    '/lk/publisher/reports': 5,
    '/lk/advertiser/campaigns': 5,
    '/lk/advertiser/reports': 5,
    '/lk/advertiser/traffic': 5,
}

const Header = () => {
    const {lang, setLang} = useContext(LangContext)
    const {auth, setIsAuth} = useContext(AuthContext)

    const [getProfile] = useGetProfileMutation()

    const {t, i18n} = useTranslation()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [selectedLink, setSelectedLink] = useState(1);
    const lineRef = useRef(null);
    const [lineWidth, setLineWidth] = useState(0);
    const [visibleLang, setVisibleLang] = useState(false)

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
        const offset = getOffset(selectedLink || 1);

        lineRef.current.style.transform = `translateX(${offset + 15}px)`;
        setLineWidth(getNavLinkWidth(selectedLink || 1) - 30);
    };

    const handlerLanguage = (lang) => {
        localStorage.setItem('lang', lang)
        return i18n.changeLanguage(lang)
    }

    const logout = async () => {
        try {
            const res = await api().get('api/site/logout')
            setIsAuth(false)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        setSelectedLink(path[pathname?.replace(lang?.toLowerCase(), '')?.replace('/', '')])

        setTimeout(() => {
            moveLine()
        }, 0)

    }, [selectedLink, lang, pathname]);

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
                    <div className={s.logo}>
                        <AuthButton/>
                    </div>

                    <div className={s.navigate}>
                        <div className={s.navigate_link}>
                            <div ref={lineRef} className={s.line} style={{width: lineWidth}}/>
                            <NavLink onClick={() => {
                                handleNavLinkClick(1)
                                scrollToTop()
                            }}
                                     className={classNames('navLink1', pathname === "/" && s.active)}
                                     to={`/${lang?.toLowerCase()}`}>{t('Главная')}</NavLink>
                            <NavLink onClick={() => handleNavLinkClick(2)}
                                     className={classNames('navLink2', pathname === "/news" && s.active)}
                                     to={`/${lang?.toLowerCase()}/news`}>{t('Новости')}</NavLink>
                            <NavLink onClick={() => handleNavLinkClick(3)}
                                     className={classNames('navLink3', pathname === "/faq" && s.active)}
                                     to={`/${lang?.toLowerCase()}/faq/publisher`}>FAQ</NavLink>
                            <NavLink onClick={() => handleNavLinkClick(4)}
                                     className={classNames('navLink4', pathname === "/root" && s.active)}
                                     to={`/${lang?.toLowerCase()}/rules/publisher`}>{t('Правила')}</NavLink>
                            {auth && <NavLink onClick={() => handleNavLinkClick(5)}
                                              className={classNames('navLink5', pathname === "/lk" && s.active)}
                                              to={`/${lang?.toLowerCase()}/lk/publisher/websites`}>Личный
                                кабинет</NavLink>}
                        </div>
                        <div className={s.navigate_auth}>
                            {auth ?
                                <NavLink className={s.login} onClick={logout}>Выход</NavLink>
                                :
                                <NavLink className={s.login}>
                                    <TelegramLoginButton
                                        botName="clickunder_bot"
                                        dataOnauth={(user) => {
                                            console.log(user)

                                            api()
                                                .get('http://clickinder.com/api/site/auth', {
                                                    params: user
                                                })
                                                .then((res) => {
                                                    console.log(res)

                                                    getProfile()
                                                        .unwrap()
                                                        .then((res) => {
                                                            setIsAuth(res?.ok)
                                                            navigate(`/${lang?.toLowerCase()}/lk/publisher/websites`)
                                                        })
                                                        .catch((e) => {
                                                            console.log(e)
                                                            setIsAuth(false)
                                                        })

                                                })
                                                .catch((e) => {
                                                    console.log(e)
                                                    setIsAuth(false)
                                                })
                                        }}
                                    />
                                    {t('Вход')}
                                </NavLink>}
                            <div className={s.lang}>
                                <div className={s.ru} onClick={() => setVisibleLang(!visibleLang)}>
                                    {lang === 'RU' ? 'RU' : "EN"}
                                </div>
                                <div className={classNames(s.en, visibleLang && s.en_active)}
                                     onClick={async () => {
                                         moment.locale(lang !== 'RU' ? 'ru' : 'en');
                                         await handlerLanguage(lang !== 'RU' ? 'ru' : "en")
                                         setVisibleLang(!visibleLang)
                                         setLang(lang !== 'RU' ? 'RU' : "EN")

                                         navigate(pathname.replace(lang === 'RU' ? 'ru' : 'en', lang === 'RU' ? 'en' : 'ru'))

                                     }}
                                     style={{top: visibleLang ? '60px' : 0}}
                                >
                                    {lang !== 'RU' ? 'RU' : "EN"}
                                </div>
                            </div>
                            <a href="https://t.me/clickunder_bot?start=support" target={'_blank'}>
                                <div className={classNames(s.ru, s.support)}>
                                    <HeadsetMicIcon/>
                                </div>
                            </a>
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
