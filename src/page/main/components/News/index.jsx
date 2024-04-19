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
    const [news, setNews] = useState([
        {
            _id: "66219a3addcb7ba4c8f96982",
            copyFrom: "661eca1ddfe076f298d6dda4",
            created: 1713478202250,
            image: "/images/btc.png",
            text: "Соображения высшего порядка, а также рамки и место обучения кадров напрямую зависит от ключевых компонентов планируемого обновления. Не следует, однако, забывать о том, что консультация с профессионалами из IT способствует подготовке и реализации направлений прогрессивного развития? Равным образом постоянное информационно-техническое обеспечение нашей деятельности обеспечивает актуальность новых предложений?\n\nПрактический опыт показывает, что повышение уровня гражданского сознания обеспечивает широкому кругу специалистов участие в формировании модели развития.",
            title: "Новость от 19 апреля",
            updated: 1713478278139
        },
        {
            _id: "66219a7bddcb7ba4c8f969a2",
            copyFrom: "661ec5fedff998a0b87bf49c",
            created: 1713478267220,
            image: "",
            text: 555,
            title: 5
        },
        {
            _id: "66219a75ddcb7ba4c8f9699e",
            copyFrom: "661ec5fedff998a0b87bf49c",
            created: 1713478261361,
            image: "/images/btc.png",
            text: 444,
            title: 4
        },

        {
            _id: "661eca1ddfe076f298d6dda4",
            copyFrom: "661ec5fedff998a0b87bf49c",
            created: 1713293853502,
            image: "/images/btc.png",
            text: "Текст новости 2.\nТекст новости2 .\nТекст новости 2.",
            title: "Вторая новость от 16 апреля"
        }
    ])

    const getNews = async () => {
        try {
            const res = await api().get('api/site/news?limit=10&offset=0')
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
                <Title>{t('Новости')}</Title>

                <div className={s.swiper_box}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(e) => setActive(e?.activeIndex)}
                        onSwiper={setSwiper}
                    >
                        {news?.map((el) => {
                            return <SwiperSlide key={el._id}>
                                <div className={s.item}>
                                    <div className={s.avatar}>
                                        <Avatar sx={{width: '120px', height: '120px'}}
                                                src={`https://clickinder.com${el.image}`}>
                                            {!el.image && <NoPhotographyIcon sx={{height: '60px', width: '60px'}}/>}
                                        </Avatar>
                                    </div>
                                    <div className={s.date}>
                                        {moment(el.created)?.format('DD.MM.YYYY')}
                                    </div>

                                    <div className={s.description}>
                                        <h4 className={s.title}>{el.title}</h4>
                                        <p className={s.text}>{el?.text}</p>
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
