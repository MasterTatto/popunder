import React, {useEffect, useRef, useState} from 'react';
import s from './styles.module.css'
import Container from "../../component/container";
import Title from "../../common/title";
import {useTranslation} from "react-i18next";
import {api} from "../../utils/api";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";

const months = [
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
];

const News = () => {
    const newsBoxRef = useRef(null);
    const [limit, setLimit] = useState(10);
    const {t} = useTranslation()
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false);

    const getNews = async () => {
        setLoading(true);
        try {
            const res = await api().get(`api/site/news?limit=${limit}&offset=${news.length}`);
            setNews((prevNews) => [...prevNews, ...(res?.data?.result || [])]);
            setLimit((prevLimit) => prevLimit + 10);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            newsBoxRef.current.scrollHeight - newsBoxRef.current.scrollTop ===
            newsBoxRef.current.clientHeight &&
            !loading
        ) {
            getNews();
        }
    };


    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className={s.main}>

            <div className={s.content}>
                <div className={s.title}>
                    <Title color={'#247ba0'} colorLine={'#247ba0'}>{t('Новости')}</Title>
                </div>

                <div className={s.news_box} ref={newsBoxRef}
                     onScroll={handleScroll}
                >
                    <Container>
                        {news?.map((el, i) => {
                            return <div className={s.item} key={el._id}>
                                <div className={s.item_top}>
                                    <div className={s.item_top_left}>
                                        <CalendarMonthIcon sx={{marginRight: '14px'}}/>
                                        <p className={s.day}>
                                            {moment(el?.created).format('DD')}
                                            &nbsp;
                                            {months[moment(el?.created).month()]}
                                        </p>
                                    </div>
                                    <div className={s.item_top_right}>
                                        {moment(el?.created).format('YYYY')}
                                    </div>
                                </div>
                                <div className={s.item_middle}>
                                    {el.title}
                                </div>
                                <div className={s.item_bottom}>
                                    {el.text}
                                </div>
                            </div>
                        })}
                    </Container>
                </div>
            </div>
            {/*</Container>*/}
        </div>
    );
};

export default News;
