import React, {useState} from 'react';
import s from './styles.module.css'
import Container from "../../../../component/container";
import 'swiper/css';
import Title from "../../../../common/title";
import {Swiper, SwiperSlide} from "swiper/react";
import {Avatar, useMediaQuery} from "@mui/material";
import classNames from "classnames";
import {useTranslation} from "react-i18next";

const mock = [
    {
        // img: 'https://popunder.net/assets/index/images/refill.jpg',
        title: 'За пополнение',
        description: [
            {
                title: 'Скидка для рекламодателей',
                sub_title: 'При единоразовом пополнении на сумму от $10 000 - Вы получаете бонус 5% на баланс аккаунта!'
            },
        ]
    },
    {
        // img: 'https://popunder.net/assets/index/images/loyality.jpg',
        title: 'За лояльность',
        description: [
            {
                title: 'Бонус для вебмастеров',
                sub_title: 'Вебмастера, непрерывно работающие с нами месяц, получат бонус 3% от заработка'
            },
            {
                sub_title: 'За два месяца непрерывной работы месячная премия составит 5%'
            },
            {
                sub_title: 'Три месяца и более - плюс 7% ежемесячно'
            },
        ]
    },
    {
        // img: 'https://popunder.net/assets/index/images/referals.jpg',
        title: 'За рефералов',
        description: [
            {
                title: 'Бонус для всех',
                sub_title: 'Мы платим 7% от прибыли привлеченного Вами владельца площадки и 7% от затрат привлеченного рекламодателя.'
            },
        ]
    },
    {
        // img: 'https://popunder.net/assets/index/images/quality.jpg',
        title: 'За качество',
        description: [
            {
                title: 'Бонус для вебмастеров',
                sub_title: 'Вебмастера, которые предоставляют системе трафик с высокой конвертируемостью на тестовых площадках и у различных рекламодателей с лендингами разной направленности, получат дополнительно 3% к доходу'
            },
        ]
    },
    {
        // img: 'https://popunder.net/assets/index/images/top.jpg',
        title: 'За ТОП',
        description: [
            {
                title: 'Бонус для вебмастеров',
                sub_title: '20 самых крупных вебмастеров по итогу каждого месяца получают:'
            },
            {
                sub_title: '1-е место - $50 на баланс,'
            },
            {
                sub_title: '2-20 место - столько процентов от $50, сколько процентов от трафика пользователя занявшего 1-е место было выкуплено системой за месяц'
            },
        ]
    },
    {
        // img: 'https://popunder.net/assets/index/images/geo_discount.jpg',
        title: 'Скидка по географии',
        description: [
            {
                title: 'Скидка для рекламодателей',
                sub_title: 'Получайте трафик из определённых стран со скидкой'
            },
            {
                title: 'Скидка 50%',
                sub_title: 'Албания, Алжир, Аргентина, Армения, Беларусь, Бразилия, Венесуэла, Вьетнам, Египет, Индия, Индонезия, Иордания, Ирак, Ирландия, Казахстан, Колумбия, Кыргызстан, Малайзия, Мексика, Молдова, Пакистан, Северная Корея, Тайланд, Турция, Узбекистан, Украина, Филиппины, Чили'
            },

        ]
    },
]
const Page2 = () => {
    const matches = useMediaQuery('(max-width:768px)');
    const {t} = useTranslation()

    const [swiper, setSwiper] = useState({})
    const [active, setActive] = useState(0)

    return (
        <div className={s.main} id={'discount'}>
            <Container>
                <Title color={'#247ba0'} colorLine={'#247ba0'}>{t('CКИДКИ И БОНУСЫ')}</Title>

                <div className={s.swiper_box}>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={matches ? 1 : 3.1}
                        onSlideChange={(e) => {
                            if (!matches) {
                                setActive(e?.activeIndex === 3 ? 1 : 0)
                            } else {
                                setActive(e?.activeIndex)
                            }

                        }}
                        onSwiper={setSwiper}
                    >
                        {mock?.map((el, i) => {
                            return <SwiperSlide key={i} onClick={() => {
                                if (!matches) {
                                    if (i === 3) {
                                        swiper?.slideTo(5, 500, true)
                                    }
                                    if (i === 2) {
                                        swiper?.slideTo(0, 500, true)
                                    }
                                }
                            }}>
                                <div className={classNames(s.item)}>
                                    <div className={s.img_box}>
                                        <Avatar src={el.img} sx={{
                                            width: '100%', borderRadius: '0px', height: '100%',
                                            transition: 'transform .6s ease-out',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                opacity: '.5'
                                            }
                                        }}/>
                                    </div>

                                    <div className={s.content}>
                                        <h4 className={s.content_title}>{t(el.title)}</h4>

                                        <div className={s.description_box}>
                                            {el.description?.map((desc, ind) => {
                                                return <div className={s.desc_item} key={ind}>
                                                    {desc.title && <p className={s.desc_title}>{t(desc.title)}</p>}
                                                    <p className={s.desc_subtitle}>{t(desc.sub_title)}</p>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>

                    <div className={s.navigate}>
                        {(!matches ? [1, 2] : mock)?.map((el, i) => {
                            return <div onClick={() => {
                                if (!matches) {
                                    if (i === 0) {
                                        swiper?.slideTo(0, 500, true)
                                    }
                                    if (i === 1) {
                                        swiper?.slideTo(5, 500, true)
                                    }
                                } else {
                                    swiper?.slideTo(i, 500, true)
                                }

                            }} key={i}
                                        className={classNames(s.circle, (active === i) && s.circle_active)}/>
                        })}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Page2;
