import React, {useEffect, useState} from 'react';
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

const News = () => {
    const {t} = useTranslation()

    const [swiper, setSwiper] = useState({})
    const [active, setActive] = useState(0)
    const [news, setNews] = useState([])

    const getNews = async () => {
        try {
            const res = await api().get('api/site/news?limit=3&offset=0')
            setNews(res?.data?.result || [])
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getNews()
    }, [])

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
                            const splitText = el?.text ? JSON.stringify(el.text)?.split('\\n') : el?.text
                            // const splitText = []
                            console.log(splitText)
                            console.log(JSON.stringify(el.text))
                            return <SwiperSlide key={el._id}>
                                <div className={s.item}>
                                    {el.image && <div className={s.avatar}>
                                        <Avatar sx={{width: '120px', height: '120px'}}
                                                src={`https://clickinder.com${el.image}`}>
                                            {!el.image && <NoPhotographyIcon sx={{height: '60px', width: '60px'}}/>}
                                        </Avatar>
                                    </div>}
                                    <div className={s.date}>
                                        {moment(el.created)?.format('DD.MM.YYYY')}
                                    </div>

                                    <div className={s.description}>
                                        <h4 className={s.title}>{el.title}</h4>
                                        <p className={s.text}>
                                            {splitText ? splitText?.map((line, index) => {
                                                return <React.Fragment key={index}>
                                                    {line?.replaceAll('"', '')}
                                                    <br/>
                                                </React.Fragment>
                                            }) : null}
                                        </p>
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
