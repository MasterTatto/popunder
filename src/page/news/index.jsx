import React, {useContext, useEffect, useState} from 'react';
import s from './styles.module.css'
import Container from "../../component/container";
import Title from "../../common/title";
import {useTranslation} from "react-i18next";
import {api} from "../../utils/api";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";
import {LangContext} from "../../App";
import {Avatar} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const months = {
    'ru': [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
    ],
    'en': [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
};

const News = () => {
    const {lang} = useContext(LangContext)
    const [limit, setLimit] = useState(10);
    const {t} = useTranslation()
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false);
    const [maxCount, setMaxCount] = useState(10)

    const getNews = async () => {
        setLoading(true);
        try {
            const res = await api().get(`api/site/news?limit=${limit}&offset=${news.length}`);
            setMaxCount(res?.data?.count)
            setNews((prevNews) => [...prevNews, ...(res?.data?.result || [])]);
            setLimit((prevLimit) => prevLimit + 10);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className={s.main}>

            <div className={s.content}>
                <div className={s.title}>
                    <Title isFullWidth={true} color={'#247ba0'} colorLine={'#247ba0'}>{t('Новости')}</Title>
                </div>

                <div className={s.news_box}>
                    <Container>
                        <InfiniteScroll
                            dataLength={news.length}
                            next={getNews}
                            hasMore={maxCount !== news?.length}

                        >
                            {news?.map((el, i) => {
                                const splitText = el?.text ? JSON.stringify(el.text)?.split('\\n') : el?.text

                                return <div className={s.item} key={el._id}>
                                    <div className={s.item_top_main}>
                                        {el.image && <div className={s.img_box}>
                                            <Avatar sx={{borderRadius: '0', width: '100%', height: 'auto'}}
                                                    src={`https://clickinder.com${el.image}`}/>
                                        </div>}
                                        <div className={s.item_top_main_right}>
                                            <div className={s.item_top}>
                                                <div className={s.item_top_left}>
                                                    <CalendarMonthIcon sx={{marginRight: '14px'}}/>
                                                    <p className={s.day}>
                                                        {moment(el?.created).format('DD')}
                                                        &nbsp;
                                                        {months[lang?.toLowerCase()][moment(el?.created).month()]}
                                                    </p>
                                                </div>
                                                <div className={s.item_top_right}>
                                                    {moment(el?.created).format('YYYY')}
                                                </div>
                                            </div>
                                            <div className={s.item_middle}>
                                                {el.title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={s.item_bottom}>
                                        {splitText ? splitText?.map((line, index) => {
                                            return <React.Fragment key={index}>
                                                {line?.replaceAll('"', '')}
                                                <br/>
                                            </React.Fragment>
                                        }) : null}
                                    </div>
                                </div>
                            })}
                        </InfiniteScroll>

                    </Container>
                </div>
            </div>
        </div>
    );
};

export default News;
