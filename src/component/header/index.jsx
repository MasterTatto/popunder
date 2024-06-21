import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
    SwipeableDrawer, useMediaQuery
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
import {toast} from "react-toastify";
import logo from '../../assetss/logo.png'
import NavigateItem from "../../page/lk/navigate";
import {navigate, navigateItems} from "../../page/lk";
import Profile from "../../page/lk/profile";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/global.slice";

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
    const matches = useMediaQuery('(max-width:768px)');

    const {user} = useSelector(selectGlobal)

    const {lang, setLang} = useContext(LangContext)
    const {auth, setIsAuth} = useContext(AuthContext)

    const [getProfile] = useGetProfileMutation()

    const telegramWrapperRef = useRef(null);

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

    useEffect(() => {
        setSelectedLink(path[pathname?.replace(lang?.toLowerCase(), '')?.replace('/', '')])

        setTimeout(() => {
            moveLine()
        }, 0)

    }, [selectedLink, lang, pathname]);

    useEffect(() => {
        const body = (document.getElementsByTagName('body') && document.getElementsByTagName('body')[0]) ? document.getElementsByTagName('body')[0] : null;
        const iframe = body ? body.querySelector('iframe') : null;

        if (iframe) {
            iframe.style = 'display:none'
        }

        if (iframe && telegramWrapperRef?.current) {
            telegramWrapperRef.current?.appendChild(iframe)

            iframe.style = 'display:block'
            window.onTelegramAuth = function (user) {

                api()
                    .get('http://clickinder.com/api/site/auth', {
                        params: user
                    })
                    .then((res) => {
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
            }
        }
    }, [openMenu, matches])

    return (
        <div className={s.header}>
            <SwipeableDrawer
                anchor={'right'}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                onOpen={() => setOpenMenu(true)}
            >
                <Box
                    // sx={{width: 250, background: '#252525', height: '100%', overflow: 'auto', paddingBottom: '20px'}}
                    sx={{width: 250, background: '#fff', height: '100%', overflow: 'auto', paddingBottom: '20px'}}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(true)}
                >
                    {auth && <Profile user={user}/>}

                    <List>
                        <ListItem disablePadding sx={{borderBottom: '1px solid rgba(0,0,0,0.25)'}}>
                            <ListItemButton onClick={() => navigate(`/${lang?.toLowerCase()}`)}>
                                <ListItemText primary={t('Главная')} sx={{color: '#000000DE'}}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderBottom: '1px solid rgba(0,0,0,0.25)'}}>
                            <ListItemButton onClick={() => navigate(`/${lang?.toLowerCase()}/news`)}>
                                <ListItemText primary={t('Новости')} sx={{color: '#000000DE'}}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderBottom: '1px solid rgba(0,0,0,0.25)'}}>
                            <ListItemButton onClick={() => navigate(`/${lang?.toLowerCase()}/faq/publisher`)}>
                                <ListItemText primary={t('FAQ')} sx={{color: '#000000DE'}}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{borderBottom: '1px solid rgba(0,0,0,0.25)'}}>
                            <ListItemButton onClick={() => navigate(`/${lang?.toLowerCase()}/rules/publisher`)}>
                                <ListItemText primary={t('Правила')} sx={{color: '#000000DE'}}/>
                            </ListItemButton>
                        </ListItem>

                        {matches && <ListItem disablePadding sx={{
                            borderBottom: '1px solid #fff',
                            padding: 0,
                            position: !auth ? 'static' : 'absolute',
                            top: auth && '-10000px'
                        }}>
                            <ListItemButton sx={{padding: 0}}>

                                <div className={classNames(s.login, s.login_text, auth && s.auth_isAuth)}>
                                    <div ref={telegramWrapperRef}
                                         className={classNames(s.login_btn_mobile)}
                                         id={'telegramWrapperRef'}
                                    />

                                    {t('Вход')}
                                </div>
                            </ListItemButton>
                        </ListItem>}
                    </List>

                    {auth && <>{navigateItems?.map((item, index) => {
                        return <NavigateItem item={item} key={index}/>
                    })}</>}

                    <div className={s.lang_mobile}>
                        <div className={classNames(s.lang_text, lang === 'RU' && s.lang_text_active)}
                             onClick={async () => {
                                 moment.locale(lang !== 'RU' ? 'ru' : 'en');
                                 await handlerLanguage(lang !== 'RU' ? 'ru' : "en")
                                 setVisibleLang(!visibleLang)
                                 setLang(lang !== 'RU' ? 'RU' : "EN")

                                 navigate(pathname.replace(lang === 'RU' ? 'ru' : 'en', lang === 'RU' ? 'en' : 'ru'))

                             }}>RU
                        </div>
                        <div className={classNames(s.lang_text, lang === 'EN' && s.lang_text_active)}
                             onClick={async () => {
                                 moment.locale(lang !== 'RU' ? 'ru' : 'en');
                                 await handlerLanguage(lang !== 'RU' ? 'ru' : "en")
                                 setVisibleLang(!visibleLang)
                                 setLang(lang !== 'RU' ? 'RU' : "EN")

                                 navigate(pathname.replace(lang === 'RU' ? 'ru' : 'en', lang === 'RU' ? 'en' : 'ru'))

                             }}>EN
                        </div>
                    </div>
                </Box>
            </SwipeableDrawer>

            <Container>
                <div className={s.content}>
                    <div className={s.logo}>
                        <img src={logo} alt="logo" className={s.logo_png}/>
                    </div>

                    <div className={s.navigate}>
                        <div className={s.navigate_link}>
                            <div ref={lineRef} className={s.line} style={{width: lineWidth || 0}}/>
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
                                              to={`/${lang?.toLowerCase()}/lk/publisher/websites`}>{t('Личный кабинет')}</NavLink>}
                        </div>
                        <div className={s.navigate_auth}>

                            {!matches && <div className={classNames(s.login, s.login_text, auth && s.auth_isAuth)}>
                                <div ref={telegramWrapperRef}
                                     className={classNames(auth && s.auth_isAuth)}
                                     id={'telegramWrapperRef'}
                                />

                                {t('Вход')}
                            </div>}


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
