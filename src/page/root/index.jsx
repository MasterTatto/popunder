import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import Container from "../../component/container";
import CodeIcon from '@mui/icons-material/Code';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import classNames from "classnames";
import {mock, mockv2} from "./mock";
import {useTranslation} from "react-i18next";
import {LangContext} from "../../App";
import {Navigate, NavLink, Outlet, useLocation} from "react-router-dom";

const Root = () => {
    const {pathname} = useLocation()
    const {t} = useTranslation()

    const [selectedLink, setSelectedLink] = useState(1);
    const [selectedWidth, setSelectedWidth] = useState(0);
    const lineRef = useRef(null);

    const getNavLinkWidth = (index) => {
        const navLink = document.querySelector(`.navigate_item${index}`);
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

        lineRef.current.style.transform = `translateX(${offset + 40 + 32}px)`;
        setSelectedWidth(getNavLinkWidth(selectedLink || 1) - 80 - 32);
    };

    useEffect(() => {
        if (pathname?.split('/')?.at(-1) === 'rules') return
        setSelectedLink(
            (pathname?.includes('publisher') && 1) ||
            (pathname?.includes('advertiser') && 2) || 1
        )
        moveLine();
    }, [selectedLink, pathname, localStorage.getItem('lang')]);

    if (pathname?.split('/')?.at(-1) === 'rules') {
        return <Navigate to={`publisher`} replace/>
    }
    return (
        <div className={s.main}>
            <Container>
                <div className={s.content}>
                    <div className={s.navigate}>
                        <div className={s.line} ref={lineRef} style={{width: selectedWidth}}/>

                        <NavLink to={'publisher'}
                                 className={classNames(s.navigate_item, selectedLink === 1 && s.navigate_item_active, 'navigate_item1')}>
                            <CodeIcon sx={{marginRight: '8px'}}/>
                            {t("Вебмастеру")}
                        </NavLink>

                        <NavLink to={'advertiser'}
                                 className={classNames(s.navigate_item, selectedLink === 2 && s.navigate_item_active, 'navigate_item2')}>
                            <ImportantDevicesIcon sx={{marginRight: '8px'}}/>
                            {t("Рекламодателю")}
                        </NavLink>

                    </div>

                    <div
                        className={classNames(s.navigate_data, selectedLink === 1 ? s.navigate_data_animated : s.navigate_data_animated_v2)}>
                        <Outlet/>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Root;
