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
import {scrollToTop} from "../../utils/scrollToTop";

export const months = {
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
    const [forceHidden, setForceHidden] = useState(false)
    const getNews = async () => {
        if (!forceHidden) {
            return
        } else {
            setLoading(true);
            try {
                console.log('wow2', forceHidden)
                const res = await api().get(`api/site/news?limit=${limit}&offset=${news.length}&language=${lang}`);
                setMaxCount(res?.data?.count)
                setNews((prevNews) => [...prevNews, ...(res?.data?.result || [])]);
                setLimit((prevLimit) => prevLimit + 10);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        scrollToTop()
    }, [])

    useEffect(() => {
        if (!forceHidden) {
            setTimeout(() => {
                setForceHidden(true)
            }, 300)
        } else {
            getNews();
        }

    }, [forceHidden]);

    useEffect(() => {

        const getNewsNew = async () => {
            if (!forceHidden) {
                return
            } else {
                setLoading(true);
                try {
                    console.log('wow')
                    const res = await api().get(`api/site/news?limit=${2}&offset=${0}&language=${lang}`);
                    setMaxCount(res?.data?.count)
                    setNews(res?.data?.result || []);
                    setLimit(10);
                } catch (e) {
                    console.log(e);
                } finally {
                    setLoading(false);
                }
            }
        };
        if (!forceHidden) {
            return
        } else {
            getNewsNew()
        }

    }, [lang])
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
                                const year = moment().format('YYYY') === moment(el?.created).format('YYYY')
                                return <div className={s.item} key={el._id}>
                                    <div className={s.item_top_main}>
                                        {el.image && <div className={s.img_box}>
                                            <Avatar sx={{borderRadius: '0', width: '100%', height: 'auto'}}
                                                    src={`http://clickinder.com${el.image}`}/>
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
                                                {!year && <div className={s.item_top_right}>
                                                    {moment(el?.created).format('YYYY')}
                                                </div>}
                                            </div>
                                            <div className={s.item_middle}>
                                                {el.title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={s.item_bottom}>
                                        <div dangerouslySetInnerHTML={{
                                            __html:
                                                `${el.text}`
                                        }}/>
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
