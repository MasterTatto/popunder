import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import Container from "../../component/container";
import CodeIcon from '@mui/icons-material/Code';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import classNames from "classnames";
import {mock, mockv2} from "./mock";
import {useTranslation} from "react-i18next";
import {LangContext} from "../../App";

const Root = () => {
    const {t} = useTranslation()
    const {lang} = useContext(LangContext)
    const [selectedLink, setSelectedLink] = useState(1);
    const lineRef = useRef(null);

    const getNavLinkWidth = (index) => {
        const navLink = document.querySelector(`.navigate_item${index}`);
        console.log(navLink)
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
        const offset = getOffset(2);
        const width = selectedLink === 1 ? ((offset / 2) - 25) : (((offset / 2) - 25) + offset)
        console.log(offset)
        lineRef.current.style.transform = `translateX(${width}px)`;
    };

    useEffect(() => {
        moveLine();
    }, [selectedLink, localStorage.getItem('lang')]);

    return (
        <div className={s.main}>
            <Container>
                <div className={s.content}>
                    <div className={s.navigate}>
                        <div className={s.line} ref={lineRef}/>
                        <div
                            className={classNames(s.navigate_item, selectedLink === 1 && s.navigate_item_active, 'navigate_item1')}
                            onClick={() => setSelectedLink(1)}>
                            <CodeIcon sx={{marginRight: '8px'}}/>
                            {t('Вебмастеру')}
                        </div>
                        <div
                            className={classNames(s.navigate_item, selectedLink === 2 && s.navigate_item_active, 'navigate_item2')}
                            onClick={() => setSelectedLink(2)}>
                            <ImportantDevicesIcon sx={{marginRight: '8px'}}/>
                            {t('Рекламодателю')}
                        </div>
                    </div>

                    <div
                        className={classNames(s.navigate_data, selectedLink === 1 ? s.navigate_data_animated : s.navigate_data_animated_v2)}>
                        {(selectedLink === 1 ? mock[lang?.toLowerCase()] : mockv2[lang?.toLowerCase()])?.map((el, i) => {
                            return <div key={i} className={s.item}>
                                <h4 className={s.item_title}>{el.title}</h4>
                                <div className={s.item_desription}>
                                    {el?.sub_title?.map((sub, ind) => {
                                        return <p key={ind} className={s.item_desription_title}>{sub}</p>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Root;
