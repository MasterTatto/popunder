import React, {useContext, useEffect, useState} from 'react';
import s from './styles.module.css'
import Title from "../../../../common/title";
import Container from "../../../../component/container";
import {useTranslation} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import classNames from "classnames";
import {api} from "../../../../utils/api";
import {Avatar} from "@mui/material";
import moment from "moment";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import {months} from "../../../news";
import {LangContext} from "../../../../App";

const News = () => {
    const {t} = useTranslation()
    const {lang} = useContext(LangContext)
    const [swiper, setSwiper] = useState({})
    const [active, setActive] = useState(0)
    const [news, setNews] = useState([])

    const getNews = async () => {
        try {
            const res = await api().get(`api/site/news?limit=3&offset=0&language=${lang}`)
            setNews(res?.data?.result || [])

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getNews()
    }, [lang])

    return (
        <div className={s.main} id={'news'}>
            <Container>
                <Title color={'#247ba0'} colorLine={'#247ba0'}>{t('Новости')}</Title>

                <div className={s.swiper_box}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(e) => setActive(e?.activeIndex)}
                        onSwiper={setSwiper}
                    >
                        {news?.map((el) => {
                            const year = moment().format('YYYY') === moment(el?.created).format('YYYY')

                            return <SwiperSlide key={el._id}>
                                <div className={s.item}>
                                    <div className={s.description}>
                                        <div className={s.item_top}>
                                            {el.image && <div className={s.avatar}>
                                                <Avatar sx={{width: '90px', height: 'auto', borderRadius: '0'}}
                                                        src={`http://clickinder.com${el.image}`}>
                                                    {!el.image &&
                                                        <NoPhotographyIcon sx={{height: '60px', width: '60px'}}/>}
                                                </Avatar>
                                            </div>}
                                            <div className={s.item_bottom}>
                                                <div className={s.date}>
                                                    {moment(el?.created).format('DD')}
                                                    &nbsp;
                                                    {months[lang?.toLowerCase()][moment(el?.created).month()]}
                                                    &nbsp;
                                                    {!year && moment(el?.created).format('YYYY')}
                                                </div>
                                                <h4 className={s.title}>{el.title}</h4>
                                            </div>
                                        </div>

                                        <div className={s.text} dangerouslySetInnerHTML={{__html: el.text}}/>

                                    </div>

                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>

                    <div className={s.navigate}>
                        {news?.map((el, i) => {
                            return <div onClick={() => swiper?.slideTo(i, 500, true)} key={i}
                                        className={classNames(s.circle, (active === i) && s.circle_active)}/>
                        })}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default News;
